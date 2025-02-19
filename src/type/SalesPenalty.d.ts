interface SalesPenaltyItem {
  // `대표자명`
  PRSDNT_NM: string;

  // `최종수정일` '2025-02-14 12:41:46.71'
  LAST_UPDT_DTM: string;

  // `인허가 번호` - 11자 숫자로 이루어진 문자열
  LCNS_NO: string;

  // `처분유형` '경상북도 포항시 북구'
  DSPS_INSTTCD_NM: string;

  // `위반법령` '식품위생법 제44조(영업자 등의 준수사항) 1항'
  LAWORD_CD_NM: string;

  // `행정처분전산키` - 7자 숫자로 이루어진 문자열
  DSPSDTLS_SEQ: string;

  // `위반일자 및 위반내용`
  VILTCN: string;

  // `사업지 주소`
  ADDR: string;

  // `공개 기한` '2025-03-01 00:00:00.0'
  PUBLIC_DT: string;

  // `위반법령` '기타식품판매업'
  INDUTY_CD_NM: string;

  // `처분확정일자` '20250212'
  DSPS_DCSNDT: string;

  // `업소명`
  PRCSCITYPOINT_BSSHNM: string;

  // `처분유형` '영업정지'
  DSPS_TYPECD_NM: string;

  // `처분시작일(영업정지의경우)` '20250217'
  DSPS_BGNDT: string;

  // `처분종료일(영업정지의경우)` '20250223'
  DSPS_ENDDT: string;

  // `전화번호`
  TELNO: string;

  // `처분내용` '영업정지7일(20250217~20250223)'
  DSPSCN: string;
}
