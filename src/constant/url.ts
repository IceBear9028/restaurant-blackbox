import { SALES_PENALTY_KEY } from '@/constant/redisKey';

export const url = {
  openApiUrl: (startIdx: number, endIdx: number) =>
    `${process.env.OPENAPI_SALES_PENALTY_URL}/api/${process.env.OPENAPI_SALES_PENALTY_TOKEN}/${SALES_PENALTY_KEY}/json/${startIdx}/${endIdx}`,
  getSearchResult: (searchText: string) => `${process.env.DOMAIN_URL}/api/search/?search_text=${searchText}`,
  getDetailPenalty: (licenseId: string) => `${process.env.DOMAIN_URL}/api/penaltyResult/${licenseId}`,
};
