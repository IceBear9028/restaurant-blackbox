import { Redis } from '@upstash/redis';
import { NextResponse } from 'next/server';
import { SALES_PENALTY_KEY } from '@/constant/redisKey';
import { url } from '@/constant/url';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

interface PostResponse {
  I0481: {
    total_count: string;
    row: SalesPenaltyItem[];
    RESULT: {
      MSG: string;
      CODE: string; //'INFO-000';
    };
  };
}

/** ### scheduling 스케줄링 업데이트
 */
export async function GET() {
  try {
    const pilotData: PostResponse = await fetch(url.openApiUrl(1, 1), { method: 'GET' }).then((res) => res.json());
    const redisDataCount = await redis.llen(SALES_PENALTY_KEY);
    const openApiCount = Number(pilotData.I0481.total_count);
    const updatedApiResult: SalesPenaltyItem[] = [];

    // 1. 새로 가져온 Open API 가 업데이트 되지 않았다면
    if (openApiCount === redisDataCount) {
      return NextResponse.json({ updateDate: 'none' }, { status: 200 });
    }

    // 2. 새로 Open API 에 값이 업데이트 되었으면
    for (let i = 0; i < Math.ceil(openApiCount / 500); i++) {
      const startIdx = i * 500 + 1;
      const endIdx = i * 500 + 500;
      const data: PostResponse = await fetch(url.openApiUrl(startIdx, endIdx), { method: 'GET' }).then((res) => res.json());
      updatedApiResult.push(...data.I0481.row);
    }

    // 2-1. 업데이트 된 값을 Redis 에 업로드
    if (updatedApiResult.length > 0) {
      await redis.del(SALES_PENALTY_KEY);
      await redis.rpush(SALES_PENALTY_KEY, ...updatedApiResult.map((item) => JSON.stringify(item)));
    }
    return NextResponse.json(
      {
        updateDate: new Date().toISOString(),
        downloadData: updatedApiResult,
        totalCount: openApiCount,
        redisDataCount,
      },
      { status: 200 },
    );
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Unknown error' }, { status: 500 });
  }
}
