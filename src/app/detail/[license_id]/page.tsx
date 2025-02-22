import { url } from '@/constant/url';
import { Table } from '@/components/ui/table';

async function fetchGetDetailPenalty(licenseId?: string): Promise<SalesPenaltyItem | null> {
  if (!licenseId) return null;
  try {
    const response = await fetch(url.getDetailPenalty(licenseId));
    if (!response.ok) {
      throw new Error('검색 결과를 불러오는 데 실패했습니다.');
    }
    return await response.json().then((res) => res.result);
  } catch (error) {
    console.log(error);
    return null;
  }
}

interface DetailPageProps {
  params: Promise<{ license_id: string }>;
}

/** 상세행정처분 페이지 컴포넌트 */
export default async function DetailPage({ params }: DetailPageProps) {
  const licenseId = await params.then((param) => param.license_id);
  const detailPenalty = await fetchGetDetailPenalty(licenseId);

  if (!detailPenalty) {
    return (
      <div>
        <p>해당 내용은 존재하지 않습니다.</p>
      </div>
    );
  }

  return (
    <>
      {detailPenalty ? (
        <article className="w-[1000px] px-8 pt-36 pb-36">
          <h1 className="font-bold text-3xl">{detailPenalty.PRCSCITYPOINT_BSSHNM}</h1>
          <section>
            <Table.Header text={'기본정보'} />
            <table className="w-full">
              <tbody className="flex flex-col">
                <Table.Tr>
                  <Table.Th>대표자</Table.Th>
                  <Table.Td>{detailPenalty.PRSDNT_NM}</Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Th>사업지 주소</Table.Th>
                  <Table.Td>{detailPenalty.ADDR}</Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Th>인허가번호</Table.Th>
                  <Table.Td>{detailPenalty.LCNS_NO}</Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Th>전화번호</Table.Th>
                  <Table.Td>{detailPenalty.TELNO}</Table.Td>
                </Table.Tr>
              </tbody>
            </table>
            <Table.Header text={'처분내역'} />
            <table className="w-full">
              <tbody className="flex flex-col">
                <Table.Tr>
                  <Table.Th>위반법령</Table.Th>
                  <Table.Td>{detailPenalty.LAWORD_CD_NM}</Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Th>처분내용</Table.Th>
                  <Table.Td>{detailPenalty.DSPSCN}</Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Th>행정처분전산키</Table.Th>
                  <Table.Td>{detailPenalty.DSPSDTLS_SEQ}</Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Th>처분확정일자</Table.Th>
                  <Table.Td>{detailPenalty.DSPS_DCSNDT}</Table.Td>
                </Table.Tr>
              </tbody>
            </table>
            <Table.Header text={'기타'} />
            <table className="w-full">
              <tbody className="flex flex-col">
                <Table.Tr>
                  <Table.Th>공개기간</Table.Th>
                  <Table.Td>{detailPenalty.PUBLIC_DT}</Table.Td>
                </Table.Tr>
              </tbody>
            </table>
          </section>
        </article>
      ) : (
        <></>
      )}
    </>
  );
}
