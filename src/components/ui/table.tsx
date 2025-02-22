import * as React from 'react';

interface TrProps extends React.ComponentProps<'tr'> {}

interface TdProps extends React.ComponentProps<'td'> {}

interface ThProps extends React.ComponentProps<'th'> {}

interface Header {
  text: string;
  children?: React.ReactNode;
}

function Th({ children, ...props }: ThProps) {
  return (
    <th className="w-[164px] h-[65px] pl-2 py-[22px] justify-start items-center gap-2.5 inline-flex" {...props}>
      <p className="text-center text-[#666666] text-lg font-medium font-['Roboto']">{children}</p>
    </th>
  );
}

function Td({ children, ...props }: TdProps) {
  return (
    <td className="h-[65px] px-2 py-[22px] justify-start items-center gap-2.5 inline-flex" {...props}>
      <p className="text-center text-[#181718] text-lg font-medium font-['Roboto']">{children}</p>
    </td>
  );
}

function Tr({ children, ...props }: TrProps) {
  return (
    <tr className="justify-start items-center inline-flex border-b border-[#f2f2f2]" {...props}>
      {children}
    </tr>
  );
}

function Header({ text, children }: Header) {
  return (
    <div className="flex mt-3 items-center justify-between gap-x-2 py-3 max-lg:px-2 lg:mt-9">
      <h2 className="text-center text-black text-xl font-bold">{text}</h2>
      {children}
    </div>
  );
}

const Table = { Th, Td, Tr, Header };

export { Table };
