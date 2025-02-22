import { NextRequest, NextResponse } from 'next/server';
import { SALES_PENALTY_KEY } from '@/constant/redisKey';
import { Redis } from '@upstash/redis';

export interface PenaltyResponse {
  result: SalesPenaltyItem | null;
}

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

/** ### route GET(req : pathParam('license_id'))
 * - `URL` : https://${DOMAIN}/api/penaltyResult/{license_id}
 * #### 역할
 * - `license_id` 를 검색조건으로, 행정처분결과 redis 에 검색한 업체가 있는지 확인
 * - 결과가 없으면 `null` 로 반환
 */
export async function GET(req: NextRequest) {
  try {
    const pathname = req.nextUrl.pathname;
    const licenseId = pathname.split('/').pop();

    if (licenseId) {
      const allSalesPenaltyData: SalesPenaltyItem[] = await redis.lrange(SALES_PENALTY_KEY, 0, -1);
      const filterData = allSalesPenaltyData.find((item) => item.LCNS_NO === licenseId);
      return NextResponse.json<PenaltyResponse>({ result: filterData ? filterData : null }, { status: 200 });
    }
    return NextResponse.json<PenaltyResponse>({ result: null }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Unknown error' }, { status: 200 });
  }
}
