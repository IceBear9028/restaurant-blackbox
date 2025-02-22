import { Search } from '@/components/search';

export default function Home() {
  return (
    <>
      <header className="flex flex-col">
        <h1>이 음식점, 믿고 가도 될까요?</h1>
        <h2>음식점의 행정처분 내역을 검색해보세요.</h2>
      </header>
      <main className="flex flex-col w-[1000px] px-8 pt-12 pb-36">
        <Search />
      </main>
    </>
  );
}
