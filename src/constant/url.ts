import { SALES_PENALTY_KEY, SEARCH_LICENSE_KEY } from '@/constant/redisKey';

export const url = {
  openApiUrl: (startIdx: number, endIdx: number) =>
    `${process.env.OPENAPI_SALES_PENALTY_URL}/api/${process.env.OPENAPI_SALES_PENALTY_TOKEN}/${SALES_PENALTY_KEY}/json/${startIdx}/${endIdx}`,
  searchApiUrl: (storeTitle: string, startIdx: number, endIdx: number) =>
    `${process.env.OPENAPI_SALES_PENALTY_URL}/api/${process.env.OPENAPI_SALES_PENALTY_TOKEN}/${SEARCH_LICENSE_KEY}/json/${startIdx}/${endIdx}/BSSH_NM=${storeTitle}`,
  getSearchResult: (searchText: string) => `${process.env.DOMAIN_URL}/api/search/?search_text=${searchText}`,
  getDetailPenalty: (licenseId: string) => `${process.env.DOMAIN_URL}/api/penaltyResult/${licenseId}`,
};
