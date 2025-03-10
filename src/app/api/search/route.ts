import { Redis } from '@upstash/redis';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { SALES_PENALTY_KEY } from '@/constant/redisKey';

export interface SearchResponse {
  result: SalesPenaltyItem[];
}

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

/** ### route GET(req : queryParma)
 * - `URL` : https://${DOMAIN}/api/search?search_text={검색어}
 * - 추후에 URL 에 하나씩 검색조건을 추가할 예정
 */
export async function GET(req: NextRequest) {
  try {
    const { nextUrl } = req;
    const searchText = nextUrl.searchParams.get('search_text');

    if (searchText) {
      const allSalesPenaltyData: SalesPenaltyItem[] = await redis.lrange(SALES_PENALTY_KEY, 0, -1);
      const filterData = allSalesPenaltyData.filter((item) => item.PRCSCITYPOINT_BSSHNM.includes(searchText));
      return NextResponse.json<SearchResponse>({ result: filterData }, { status: 200 });
    }
    return NextResponse.json<SearchResponse>({ result: [] }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Unknown error' }, { status: 200 });
  }
}
