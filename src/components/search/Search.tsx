import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SearchProps {
  value?: string;
}

export const Search = ({ value = '' }: SearchProps) => {
  return (
    <form action="/search" method="GET" className="flex w-full items-center space-x-2">
      <Input type="text" name="search_text" placeholder="Search..." defaultValue={value} />
      <Button type="submit" size="lg">
        검색
      </Button>
    </form>
  );
};
