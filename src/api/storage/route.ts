import { Redis } from '@upstash/redis';
import { NextResponse } from 'next/server';

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

/** ### storage 스케줄링 업데이트
 */
export async function GET() {
  try {
    const openApiUrl = (startIdx: number, endIdx: number) =>
      `${process.env['OPENAPI_SALES_PENALTY_URL']}/api/${process.env['OPENAPI_SALES_PENALTY_TOKEN']}/I0481/json/${startIdx}/${endIdx}`;
    const pilotData: PostResponse = await fetch(openApiUrl(1, 1), { method: 'GET' }).then((res) => res.json());
    const redisDataCount = await redis.llen('I0481');
    const totalCount = Number(pilotData.I0481.total_count);
    const updatedApiResult: SalesPenaltyItem[] = [];

    // 1. 새로 가져온 Open API 가 업데이트 되지 않았다면
    if (totalCount === redisDataCount) {
      return NextResponse.json({ updateDate: 'none' }, { status: 200 });
    }

    // 2. 새로 Open API 에 값이 업데이트 되었으면
    for (let i = 0; i < Math.ceil(redisDataCount / 500); i++) {
      const startIdx = i * 500 + 1;
      const endIdx = i * 500 + 500;
      const data: PostResponse = await fetch(openApiUrl(startIdx, endIdx), { method: 'GET' }).then((res) => res.json());
      updatedApiResult.push(...data.I0481.row);
    }

    // 2-1. 업데이트 된 값을 Redis 에 업로드
    await redis.set('I0481', updatedApiResult);
    return NextResponse.json({ updateDate: new Date().toISOString() }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
