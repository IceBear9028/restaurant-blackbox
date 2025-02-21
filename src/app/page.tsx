import { Search } from '@/components/search';
import { TestModal } from '@/components/modal/Modal';

export default function Home() {
  return (
    <section>
      <header className="flex flex-col">
        <h1>이 음식점, 믿고 가도 될까요?</h1>
        <h2>음식점의 행정처분 내역을 검색해보세요.</h2>
      </header>
      <main>
        <Search value={'안녕하세요'} />
        <TestModal />
      </main>
    </section>
  );
}
