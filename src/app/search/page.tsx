import { SearchResponse } from '@/app/api/search/route';
import { url } from '@/constant/url';
import { Search } from '@/components/search';
import { SearchCard } from '@/components/searchCard';

/** API 요청 함수: 검색어가 없으면 요청하지 않음 */
async function fetchGetSearchResult(searchText?: string): Promise<SearchResponse | null> {
  if (!searchText) return null;
  try {
    const response = await fetch(url.getSearchResult(searchText), { method: 'GET' });
    if (!response.ok) {
      throw new Error('검색 결과를 불러오는 데 실패했습니다.');
    }
    return (await response.json()) as SearchResponse;
  } catch (error) {
    console.error(error);
    return null;
  }
}

interface SearchPageProps {
  searchParams: Promise<{ search_text: string }>;
}

/** 검색 페이지 컴포넌트 */
export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const data = await fetchGetSearchResult(params.search_text);
  return (
    <main>
      <article className="w-[1000px] px-8 pt-12 pb-36">
        <Search value={params.search_text} />
        {data && data.result.length > 0 ? (
          <section>
            {data.result.map((item) => (
              <SearchCard
                key={`${item.LCNS_NO}`}
                href={`/detail/${item.LCNS_NO}`}
                storeTitle={item.BSSH_NM}
                licenseId={item.LCNS_NO}
                address={item.LOCP_ADDR}
              />
            ))}
          </section>
        ) : (
          <p>검색결과가 없습니다.</p>
        )}
      </article>
    </main>
  );
}
