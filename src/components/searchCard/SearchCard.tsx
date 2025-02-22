import * as React from 'react';

interface SearchCardProps extends React.ComponentProps<'a'> {
  licenseId: string;
  address: string;
  storeTitle: string;
}

export const SearchCard = ({ licenseId, address, storeTitle, ...props }: SearchCardProps) => {
  return (
    <a className="mx-6 flex items-center justify-between border-b border-gray-100 py-10 lg:mx-8" {...props}>
      <div>
        <p className="text-lg font-bold lg:text-xl">{storeTitle}</p>
        <p className="mt-3 text-black-light lg:text-lg">{`인허가번호 : ${licenseId}`}</p>
        <p className="mt-2 text-sm text-gray-500 lg:text-base">{address}</p>
      </div>
    </a>
  );
};
