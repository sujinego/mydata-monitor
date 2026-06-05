// src/components/BatchTable.jsx
// ─────────────────────────────────────────
//  배치 현황 테이블
//
//  SM 프론트 작업 예시가 주석으로 표시돼 있음:
//  [SM 작업] 태그 찾아서 읽으면 실무 감각 익힐 수 있음
// ─────────────────────────────────────────

import StatusBadge from "./StatusBadge";
import { ORG_NAME } from "../data/mockData";
import { calcDuration } from "../utils/format";

export default function BatchTable({ jobs, onRetry, isLoading }) {
  if (isLoading) {
    return (
      <div
        style={{
          ...wrapStyle,
          padding: 40,
          textAlign: "center",
          color: "#8b949e",
        }}
      >
        데이터 불러오는 중...
      </div>
    );
  }

  if (!jobs.length) {
    return (
      <div
        style={{
          ...wrapStyle,
          padding: 40,
          textAlign: "center",
          color: "#484f58",
        }}
      >
        조회된 배치가 없습니다.
      </div>
    );
  }

  return (
    <div style={wrapStyle}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr
            style={{ background: "#1c2128", borderBottom: "1px solid #30363d" }}
          >
            {/* [SM 작업] 컬럼 추가 요청: 여기에 <th> 하나 추가하면 됨 */}
            <Th>배치명</Th>
            <Th>기관</Th>
            <Th>상태</Th>
            <Th>시작시각</Th>
            <Th>종료시각</Th>
            <Th>소소요시간</Th>
            <Th align="right">처리건수</Th>{" "}
            {/* [SM 작업] "처리건수 컬럼 추가해주세요" */}
            <Th>오류내용</Th>
            <Th>액션</Th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <BatchRow key={job.jobId} job={job} onRetry={onRetry} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── 행 컴포넌트 (행 단위로 분리해두면 수정이 쉬움) ──
function BatchRow({ job, onRetry }) {
  // [SM 작업] "실패 행은 빨간 배경 넣어주세요"
  const rowBg =
    job.status === "FAIL"
      ? "rgba(248,81,73,0.05)"
      : job.status === "RUNNING"
      ? "rgba(88,166,255,0.04)"
      : "transparent";

  return (
    <tr style={{ borderBottom: "1px solid #30363d", background: rowBg }}>
      {/* 배치명 */}
      <Td>
        <span style={{ fontWeight: 500 }}>{job.jobName}</span>
      </Td>

      {/* 기관 — [SM 작업] "기관코드 옆에 기관명도 보여주세요" */}
      <Td>
        <span
          style={{ fontFamily: "monospace", fontSize: 11, color: "#8b949e" }}
        >
          {job.orgCode === "ALL"
            ? "-"
            : `${job.orgCode} ${ORG_NAME[job.orgCode] ?? ""}`}
        </span>
      </Td>

      {/* 상태 배지 */}
      <Td>
        <StatusBadge status={job.status} />
      </Td>

      {/* 시작/종료 시각 */}
      <Td mono>{job.startTime ?? "-"}</Td>
      <Td mono>{job.endTime ?? "-"}</Td>
      {/* 소요시간 */}
      <Td mono>
        {job.status === "RUNNING"
          ? "진행중"
          : calcDuration(job.startTime, job.endTime)}
      </Td>
      {/* 처리건수 — [SM 작업] 컬럼 추가 예시 */}
      <Td mono align="right">
        {job.status === "FAIL" && job.processCount === 0 ? (
          <span style={{ color: "#f85149" }}>0건</span> // ← span으로 감싸서 색상 적용
        ) : job.processCount ? (
          job.processCount.toLocaleString()
        ) : (
          "-"
        )}
      </Td>

      {/* 오류내용 — [SM 작업] "오류메시지 빨간색으로 표시해주세요" */}
      <Td>
        <span
          style={{
            fontSize: 11,
            color: job.errorMessage ? "#f85149" : "#484f58",
            maxWidth: 240,
            display: "block",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {job.errorMessage ?? "-"}
        </span>
      </Td>

      {/* 액션 버튼 */}
      <Td>
        {job.status === "FAIL" && (
          // [SM 작업] "실패 시 재처리 버튼 보여주세요"
          <button
            onClick={() => onRetry(job.jobId, job.jobName)}
            style={retryBtnStyle}
          >
            재처리
          </button>
        )}
        {job.status === "RUNNING" && (
          <span style={{ fontSize: 11, color: "#58a6ff" }}>진행중...</span>
        )}
      </Td>
    </tr>
  );
}

// ── 스타일 헬퍼 컴포넌트 ──
function Th({ children, align }) {
  return (
    <th
      style={{
        padding: "10px 14px",
        textAlign: align ?? "left",
        fontSize: 11,
        fontWeight: 500,
        color: "#8b949e",
        textTransform: "uppercase",
        letterSpacing: "0.4px",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </th>
  );
}

function Td({ children, mono, align }) {
  return (
    <td
      style={{
        padding: "10px 14px",
        fontSize: mono ? 11 : 12,
        fontFamily: mono ? "monospace" : "inherit",
        color: mono ? "#8b949e" : "#e6edf3",
        verticalAlign: "middle",
        textAlign: align ?? "left",
      }}
    >
      {children}
    </td>
  );
}

const wrapStyle = {
  background: "#161b22",
  border: "1px solid #30363d",
  borderRadius: 6,
  overflow: "hidden",
  marginBottom: 20,
};

const retryBtnStyle = {
  padding: "3px 10px",
  borderRadius: 4,
  border: "1px solid rgba(248,81,73,0.4)",
  background: "transparent",
  color: "#f85149",
  fontFamily: "inherit",
  fontSize: 11,
  cursor: "pointer",
};
