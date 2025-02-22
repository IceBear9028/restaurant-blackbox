interface DetailPageProps {
  params: Promise<{ license_id: string }>;
}

/** 상세행정처분 페이지 컴포넌트 */
export default async function DetailPage({ params }: DetailPageProps) {
  const pathParam = await params;
  const licenseId = pathParam.license_id;

  return (
    <div>
      <p>{licenseId}</p>
    </div>
  );
}
