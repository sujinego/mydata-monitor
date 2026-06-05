// src/utils/format.js
// ─────────────────────────────────────────
//  마이데이터 SM에서 자주 쓰는 유틸 함수
// ─────────────────────────────────────────

// 숫자 → 금액 포맷  ex) 1234567 → "1,234,567원"
export const formatMoney = (amount) =>
  `${Number(amount).toLocaleString("ko-KR")}원`;

// 계좌번호 마스킹  ex) "1101234567" → "******4567"  (보안팀 요청으로 자주 추가)
export const maskAccountNum = (num) =>
  num.slice(0, -4).replace(/./g, "*") + num.slice(-4);

// 오늘 날짜 → YYYYMMDD  (마이데이터 API 파라미터 형식)
export const toYYYYMMDD = (date = new Date()) =>
  date.toISOString().slice(0, 10).replace(/-/g, "");

// n일 전 날짜 → YYYYMMDD  ex) daysAgo(90) → 90일 전
export const daysAgo = (n) => {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return toYYYYMMDD(d);
};

// 배치 상태 → 한글 레이블
export const STATUS_LABEL = {
  SUCCESS: "성공",
  FAIL: "실패",
  RUNNING: "실행중",
  PENDING: "대기",
  SKIP: "건너뜀",
};

// 배치 상태 → 색상
export const STATUS_COLOR = {
  SUCCESS: { bg: "#1a3a1a", color: "#3fb950", border: "#2d5a2d" },
  FAIL: { bg: "#3a1a1a", color: "#f85149", border: "#5a2d2d" },
  RUNNING: { bg: "#1a2a3a", color: "#58a6ff", border: "#2d3f5a" },
  PENDING: { bg: "#252525", color: "#8b949e", border: "#333" },
  SKIP: { bg: "#3a2e1a", color: "#e3b341", border: "#5a4a2d" },
};

// 문자열 "06:20:00" → 초(seconds)로 변환하는 함수 먼저 필요
export const toSeconds = (timeStr) => {
  // "06:20:00" → [06, 20, 00] 으로 쪼개기
  const [h, m, s] = timeStr.split(":").map(Number);
  return h * 3600 + m * 60 + s;
};

//소요시간
export const calcDuration = (start, end) => {
  if (!start || !end) return "-";

  const diff = toSeconds(end) - toSeconds(start); // 종료 - 시작

  if (diff < 60) return `${diff}s`;
  return `${Math.floor(diff / 60)}m ${diff % 60}s`;
};

// src/utils/format.js 맨 아래에 추가

// 고객명 마스킹  홍길동 → 홍*동
export const maskName = (name) => {
  if (!name || name.length < 2) return name;
  if (name.length === 2) return name[0] + "*";
  // 첫글자 + * + 마지막글자
  return name[0] + "*".repeat(name.length - 2) + name[name.length - 1];
};

// 계좌번호 마스킹  110-1234-5678 → 110-****-5678
export const maskAccount = (account) => {
  if (!account) return account;
  // 가운데 부분만 * 처리
  return account.replace(/(\d{3})-(\d{4})-(\d+)/, "$1-****-$3");
};

// 연락처 마스킹  010-1234-5678 → 010-****-5678
export const maskPhone = (phone) => {
  if (!phone) return phone;
  return phone.replace(/(\d{3})-(\d{4})-(\d{4})/, "$1-****-$3");
};

// 이메일 마스킹  hong@test.com → h***@test.com
export const maskEmail = (email) => {
  if (!email) return email;
  const [id, domain] = email.split("@");
  // 첫글자 + *** + @도메인
  return id[0] + "***@" + domain;
};
