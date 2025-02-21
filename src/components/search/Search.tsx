'use client';
import { useState } from 'react';

interface SearchProps {
  value: string;
}

export const Search = ({ value = '' }: SearchProps) => {
  const [text, setText] = useState<string>(value);
  return (
    <div>
      <input type="text" placeholder="Search..." onChange={(e) => setText(e.target.value)} value={text} />
      <button></button>
    </div>
  );
};
