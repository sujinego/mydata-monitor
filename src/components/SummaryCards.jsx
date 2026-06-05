// src/components/SummaryCards.jsx
// ─────────────────────────────────────────
//  상단 요약 카드 4개
//  운영팀에서 "전체 현황 한눈에 보고 싶어요" 요청으로 자주 추가
// ─────────────────────────────────────────

const cards = [
  { key: 'total',   label: '전체 배치',  color: '#8b949e' },
  { key: 'success', label: '성공',       color: '#3fb950' },
  { key: 'fail',    label: '실패',       color: '#f85149' },
  { key: 'running', label: '실행중',     color: '#58a6ff' },
];

export default function SummaryCards({ jobs }) {
  const counts = {
    total:   jobs.length,
    success: jobs.filter((j) => j.status === 'SUCCESS').length,
    fail:    jobs.filter((j) => j.status === 'FAIL').length,
    running: jobs.filter((j) => j.status === 'RUNNING').length,
  };

  const successRate = counts.total
    ? Math.round((counts.success / counts.total) * 100)
    : 0;

  const totalCount = jobs.reduce((s, j) => s + (j.processCount || 0), 0);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 10, marginBottom: 20 }}>
      {cards.map(({ key, label, color }) => (
        <div key={key} style={cardStyle}>
          <div style={labelStyle}>{label}</div>
          <div style={{ fontSize: 28, fontWeight: 600, fontFamily: 'monospace', color }}>
            {counts[key]}
          </div>
          {key === 'success' && (
            <div style={subStyle}>성공률 {successRate}%</div>
          )}
          {key === 'fail' && counts.fail > 0 && (
            <div style={{ ...subStyle, color: '#f85149' }}>⚠ 재처리 필요</div>
          )}
        </div>
      ))}

      {/* 총 처리건수 카드 */}
      <div style={cardStyle}>
        <div style={labelStyle}>총 처리건수</div>
        <div style={{ fontSize: 20, fontWeight: 600, fontFamily: 'monospace', color: '#8b949e' }}>
          {totalCount.toLocaleString()}
        </div>
        <div style={subStyle}>건</div>
      </div>
    </div>
  );
}

const cardStyle = {
  background: '#161b22',
  border: '1px solid #30363d',
  borderRadius: 6,
  padding: '14px 16px',
};
const labelStyle = {
  fontSize: 11,
  color: '#8b949e',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
  marginBottom: 6,
};
const subStyle = {
  fontSize: 11,
  color: '#484f58',
  marginTop: 4,
};
