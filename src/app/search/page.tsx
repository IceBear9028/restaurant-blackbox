import { SearchResponse } from '@/app/api/search/route';
import { url } from '@/constant/url';
import { Search } from '@/components/search';

async function fetchGetSearchResult(searchText?: string) {
  if (!searchText) {
    return;
  }
  const response = await fetch(url.getSearchResult(searchText), { method: 'GET' });
  if (response.ok) {
    return (await response.json()) as SearchResponse;
  }
}

export default async function SearchPage({ searchParams }: { searchParams?: Promise<{ search_text?: string }> }) {
  const param = await searchParams;
  const data = await fetchGetSearchResult(param?.search_text);

  return (
    <>
      <Search value={param?.search_text} />
      {!data || (data.result.length === 0 && <p>데이터가 없습니다.</p>)}
      {data?.result.map((item) => {
        return (
          <>
            <p>{item.PRCSCITYPOINT_BSSHNM}</p>
            <p>{item.ADDR}</p>
            <p>{item.DSPS_BGNDT}</p>
            <hr />
          </>
        );
      })}
    </>
  );
}
