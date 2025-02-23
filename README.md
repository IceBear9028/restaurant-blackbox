# 🧑🏻‍🍳 음식점 행정처분 조회 서비스

## 소개

이 프로젝트는 음식점의 행정처분 내역을 검색할 수 있는 웹 서비스입니다.
Next.js를 기반으로 개발되었으며, Redis를 활용하여 데이터를 관리합니다.

## 주소
[https://restaurant-blackbox.vercel.app](https://restaurant-blackbox.vercel.app/)

## 주요 기능
- 음식점 이름으로 행정처분 내역 검색
- 상세 행정처분 정보 조회
  - 기본 정보 (대표자, 주소, 인허가번호, 전화번호)
  - 처분 내역 (위반법령, 처분내용, 처분확정일자)
  - 공개기간 정보

## 기술 스택

- **Frontend**: Next.js, TypeScript, TailwindCSS
- **Backend**: Next.js API Routes
- **Database**: Upstash Redis
- **Deployment**: Vercel

## 인프라 구조
![아키텍처이미지.png](https://raw.githubusercontent.com/icebear9028/image-storage/main/restaurant-blackbox-architecture.png)

## 프로젝트 구조

```shell
src/
├── app/ # Next.js 13 App Router
│ ├── api/ # API 라우트
│ ├── detail/ # 상세 페이지
│ └── search/ # 검색 페이지
├── components/ # 재사용 가능한 컴포넌트
├── constant/ # 상수 정의
├── lib/ # 유틸리티 함수
└── type/ # TypeScript 타입 정의
```

## 데이터 업데이트 스케줄링

Vercel Cron Jobs를 사용하여 매일 KRW 03:00에 행정처분 데이터를 호출
