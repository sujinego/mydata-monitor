// src/components/FilterBar.jsx
// ─────────────────────────────────────────
//  조회 조건 필터 바
//  SM 요청 1순위: "이 조건으로도 조회되게 해주세요"
//  새 조건 추가할 때 select/input 하나씩 여기에 추가하면 됨
// ─────────────────────────────────────────

import { ORG_NAME } from "../data/mockData";

export default function FilterBar({
  orgCode,
  setOrgCode,
  status,
  setStatus,
  onReset,
  onRefresh,
  onRetryAll,
}) {
  return (
    <div style={barStyle}>
      {/* 기관 필터 */}
      <label style={labelStyle}>기관</label>
      <select
        value={orgCode}
        onChange={(e) => setOrgCode(e.target.value)}
        style={selectStyle}
      >
        <option value="">전체</option>
        {Object.entries(ORG_NAME).map(([code, name]) => (
          <option key={code} value={code}>
            {code} {name}
          </option>
        ))}
      </select>

      <div style={dividerStyle} />

      {/* 상태 필터 */}
      <label style={labelStyle}>상태</label>
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        style={selectStyle}
      >
        <option value="">전체</option>
        <option value="SUCCESS">성공</option>
        <option value="FAIL">실패</option>
        <option value="ALLFAIL">전체 실패</option>
        <option value="RUNNING">실행중</option>
        <option value="PENDING">대기</option>
      </select>

      {/* 빠른 필터 버튼 — "실패건만 보고 싶어요" 요청으로 추가 */}
      <button
        onClick={() => {
          setOrgCode("");
          setStatus("FAIL");
        }}
        style={{
          ...btnStyle,
          color: "#f85149",
          borderColor: "rgba(248,81,73,0.4)",
        }}
      >
        실패만 보기
      </button>

      {/* 우측 버튼 그룹 */}
      <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
        <button onClick={onReset} style={btnStyle}>
          초기화
        </button>
        <button onClick={onRefresh} style={btnStyle}>
          ↻ 새로고침
        </button>
        <button
          onClick={onRetryAll}
          style={{
            ...btnStyle,
            background: "#00a651",
            color: "#fff",
            border: "none",
          }}
        >
          실패 재처리
        </button>
      </div>
    </div>
  );
}

const barStyle = {
  display: "flex",
  alignItems: "center",
  gap: 8,
  background: "#161b22",
  border: "1px solid #30363d",
  borderRadius: 6,
  padding: "12px 14px",
  marginBottom: 12,
  flexWrap: "wrap",
};
const labelStyle = { fontSize: 11, color: "#8b949e" };
const selectStyle = {
  background: "#1c2128",
  border: "1px solid #30363d",
  color: "#e6edf3",
  fontFamily: "inherit",
  fontSize: 12,
  padding: "5px 10px",
  borderRadius: 4,
  outline: "none",
  cursor: "pointer",
};
const btnStyle = {
  padding: "5px 12px",
  borderRadius: 4,
  border: "1px solid #30363d",
  background: "transparent",
  color: "#8b949e",
  fontFamily: "inherit",
  fontSize: 12,
  cursor: "pointer",
};
const dividerStyle = {
  width: 1,
  height: 20,
  background: "#30363d",
  margin: "0 4px",
};
