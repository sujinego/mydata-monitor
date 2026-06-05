// src/data/mockData.js
// ─────────────────────────────────────────
//  목 데이터 — 실제 환경에서는 API 호출로 교체
//  예: const { data } = await api.get('/admin/batch/status')
// ─────────────────────────────────────────

export const ORG_NAME = {
  "0081": "KEB하나은행",
  "0020": "우리은행",
  "0048": "신한은행",
  "0010": "국민은행",
  "0090": "카카오뱅크",
  "0011": "농협은행",
  "0092": "토스뱅크",
  "0031": "대구은행",
};

export const MOCK_BATCH_JOBS = [
  {
    jobId: "B001",
    jobName: "자산수집_전체",
    orgCode: "ALL",
    status: "SUCCESS",
    startTime: "06:00:01",
    endTime: "06:18:23",
    processCount: 57303,
    errorMessage: null,
  },
  {
    jobId: "B002",
    jobName: "거래내역수집_하나",
    orgCode: "0081",
    status: "FAIL",
    startTime: "06:20:00",
    endTime: "06:24:13",
    processCount: 12100,
    errorMessage: "ConnectTimeoutException: 120000ms 초과",
  },
  {
    jobId: "B003",
    jobName: "거래내역수집_우리",
    orgCode: "0020",
    status: "SUCCESS",
    startTime: "06:20:01",
    endTime: "06:35:12",
    processCount: 8904,
    errorMessage: null,
  },
  {
    jobId: "B004",
    jobName: "거래내역수집_신한",
    orgCode: "0048",
    status: "SUCCESS",
    startTime: "06:20:02",
    endTime: "06:42:01",
    processCount: 11230,
    errorMessage: null,
  },
  {
    jobId: "B005",
    jobName: "거래내역수집_국민",
    orgCode: "0010",
    status: "RUNNING",
    startTime: "06:45:00",
    endTime: null,
    processCount: 6700,
    errorMessage: null,
  },
  {
    jobId: "B006",
    jobName: "동의정보동기화",
    orgCode: "ALL",
    status: "SUCCESS",
    startTime: "05:00:01",
    endTime: "05:03:12",
    processCount: 3201,
    errorMessage: null,
  },
  {
    jobId: "B007",
    jobName: "카드실적수집",
    orgCode: "0081",
    status: "FAIL",
    startTime: "06:30:00",
    endTime: "06:31:02",
    processCount: 0,
    errorMessage: "HTTP 503: 정보제공자 서버 점검중",
  },
  {
    jobId: "B008",
    jobName: "보험정보수집",
    orgCode: "ALL",
    status: "PENDING",
    startTime: null,
    endTime: null,
    processCount: 0,
    errorMessage: null,
  },
];

export const MOCK_ASSETS = [
  {
    orgCode: "0081",
    industry: "은행",
    total: 45200,
    success: 44890,
    fail: 310,
  },
  { orgCode: "0020", industry: "은행", total: 31500, success: 31500, fail: 0 },
  {
    orgCode: "0048",
    industry: "은행",
    total: 38900,
    success: 38765,
    fail: 135,
  },
  {
    orgCode: "0010",
    industry: "은행",
    total: 52300,
    success: 51980,
    fail: 320,
  },
  { orgCode: "0090", industry: "은행", total: 28100, success: 28100, fail: 0 },
];

export const MOCK_INCIDENTS = [
  {
    id: 1,
    occurTime: "2026-05-27 06:04",
    recoverTime: "2026-05-27 06:41",
    scope: "하나은행 거래내역 미수집 12,100건",
    cause: "하나은행 API 서버 새벽 점검 (06:00~06:30)",
    action: "점검 종료 후 재처리 스크립트 수동 실행",
    handler: "이수진",
  },
  {
    id: 2,
    occurTime: "2026-05-20 02:31",
    recoverTime: "2026-05-20 02:45",
    scope: "전 기관 자산수집 지연 약 14분",
    cause: "DB Connection Pool 고갈 (max 200 초과)",
    action: "Pool 크기 300으로 상향, 불필요 커넥션 정리",
    handler: "김운영",
  },
];
// src/data/mockData.js 맨 아래에 추가

export const MOCK_CUSTOMERS = [
  {
    customerId: "C001",
    name: "홍길동", // ← 원본 그대로
    accountNum: "110-1234-5678", // ← 원본 그대로
    phone: "010-1234-5678", // ← 원본 그대로
    email: "hong@test.com", // ← 원본 그대로
    connectedOrg: "0081",
    lastCollected: "2026-05-27 06:30",
    status: "SUCCESS",
  },
  {
    customerId: "C002",
    name: "김영희",
    accountNum: "220-9876-4321",
    phone: "010-9876-5432",
    email: "kim@naver.com",
    connectedOrg: "0048",
    lastCollected: "2026-05-27 06:32",
    status: "SUCCESS",
  },
  {
    customerId: "C003",
    name: "이철수",
    accountNum: "330-1111-2222",
    phone: "010-1111-2222",
    email: "lee@gmail.com",
    connectedOrg: "0020",
    lastCollected: "2026-05-27 06:28",
    status: "FAIL",
  },
  {
    customerId: "C004",
    name: "박지영",
    accountNum: "440-3333-4444",
    phone: "010-3333-4444",
    email: "park@kakao.com",
    connectedOrg: "0090",
    lastCollected: "2026-05-27 06:35",
    status: "SUCCESS",
  },
  {
    customerId: "C005",
    name: "최민준",
    accountNum: "550-5555-6666",
    phone: "010-5555-6666",
    email: "choi@daum.net",
    connectedOrg: "0081",
    lastCollected: "2026-05-27 06:20",
    status: "FAIL",
  },
];
