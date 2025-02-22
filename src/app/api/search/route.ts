import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { url } from '@/constant/url';

export interface SearchResponse {
  result: SalesLicenseItem[];
}

interface PostResponse {
  I2500: {
    total_count: string;
    row: SalesLicenseItem[];
    RESULT: {
      MSG: string;
      CODE: string; //'INFO-000';
    };
  };
}

/** ### route GET(req : queryParma)
 * - `URL` : https://${DOMAIN}/api/search?search_text={검색어}
 * - 추후에 URL 에 하나씩 검색조건을 추가할 예정
 */
export async function GET(req: NextRequest) {
  try {
    const { nextUrl } = req;
    const searchText = nextUrl.searchParams.get('search_text');

    if (searchText) {
      const data: PostResponse = await fetch(url.searchApiUrl(searchText, 1, 50)).then((res) => res.json());
      return NextResponse.json<SearchResponse>({ result: data.I2500.row }, { status: 200 });
    }
    return NextResponse.json<SearchResponse>({ result: [] }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Unknown error' }, { status: 200 });
  }
}
