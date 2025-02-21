import * as React from 'react';

interface TrProps extends React.ComponentProps<'tr'> {}

interface TdProps extends React.ComponentProps<'td'> {}

interface ThProps extends React.ComponentProps<'th'> {}

function Th({ children, ...props }: ThProps) {
  return (
    <th className="w-[164px] h-[65px] pl-2 py-[22px] justify-start items-center gap-2.5 inline-flex" {...props}>
      <p className="text-center text-[#666666] text-lg font-medium font-['Roboto']">{children}</p>
    </th>
  );
}

function Td({ children, ...props }: TdProps) {
  return (
    <td className="w-[366px] h-[65px] px-2 py-[22px] justify-start items-center gap-2.5 inline-flex" {...props}>
      <p className="text-center text-[#181718] text-lg font-medium font-['Roboto']">{children}</p>
    </td>
  );
}

function Tr({ children, ...props }: TrProps) {
  return (
    <tr className="w-[164px] h-[65px] pl-2 py-[22px] justify-start items-center gap-2.5 inline-flex" {...props}>
      {children}
    </tr>
  );
}

const Table = { Th, Td, Tr };

export { Table };
