import { SearchResponse } from '@/app/api/search/route';
import { url } from '@/constant/url';
import { Search } from '@/components/search';
import { Table } from '@/components/ui/table';

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

/** 검색 페이지 컴포넌트 */
export default async function SearchPage({ searchParams }: { searchParams?: { search_text?: string } }) {
  const searchText = searchParams?.search_text || '';
  const data = await fetchGetSearchResult(searchText);

  return (
    <>
      <Search value={searchText} />
      <article>
        {data && data.result.length > 0 ? (
          <section>
            <Table.Header text="기본정보" />
            {data.result.map((item) => (
              <table className="w-full" key={item.ADDR}>
                <tbody className="flex flex-col">
                  <Table.Tr>
                    <Table.Th>업소명</Table.Th>
                    <Table.Td>{item.PRCSCITYPOINT_BSSHNM}</Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Th>주소</Table.Th>
                    <Table.Td>{item.ADDR}</Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Th>행정처분</Table.Th>
                    <Table.Td>{item.DSPSCN}</Table.Td>
                  </Table.Tr>
                </tbody>
              </table>
            ))}
          </section>
        ) : (
          <p>검색결과가 없습니다.</p>
        )}
      </article>
    </>
  );
}
