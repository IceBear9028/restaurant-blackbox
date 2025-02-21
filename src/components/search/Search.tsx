'use client';
import { useState } from 'react';
import styled from '@emotion/styled';

interface SearchProps {
  value: string;
}

export const Search = ({ value = '' }: SearchProps) => {
  const [text, setText] = useState<string>(value);
  return (
    <Container>
      <Input type="text" placeholder="Search..." onChange={(e) => setText(e.target.value)} value={text} />
      <SearchButton></SearchButton>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 41px;
  background: #ffffff;
  border: 1px solid #b3b3b3;
`;

const Input = styled.input``;

const SearchButton = styled.button``;
