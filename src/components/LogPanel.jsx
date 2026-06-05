// src/components/LogPanel.jsx
const INIT_LOGS = [
  { time: '06:00:01', level: 'INFO',  msg: '배치 스케줄러 시작 — 오늘 등록된 배치: 8건' },
  { time: '06:18:23', level: 'INFO',  msg: '자산수집_전체 완료 — 57,303건 처리' },
  { time: '06:24:13', level: 'ERROR', msg: 'ConnectTimeoutException: KEB하나은행 API 응답 없음 (120000ms)' },
  { time: '06:24:13', level: 'ERROR', msg: '거래내역수집_하나 FAIL — 재시도 3회 초과' },
  { time: '06:30:00', level: 'WARN',  msg: '카드실적수집: HTTP 503 — 정보제공자 점검중' },
  { time: '06:45:00', level: 'INFO',  msg: '거래내역수집_국민 RUNNING — 진행중 (6,700/19,200건)' },
];

const LEVEL_COLOR = {
  INFO:  '#58a6ff',
  WARN:  '#e3b341',
  ERROR: '#f85149',
};

export default function LogPanel() {
  return (
    <div style={{ background: '#161b22', border: '1px solid #30363d', borderRadius: 6, overflow: 'hidden', marginBottom: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', background: '#1c2128', borderBottom: '1px solid #30363d' }}>
        <span style={{ fontSize: 12, fontWeight: 500, color: '#8b949e' }}>실시간 로그</span>
      </div>
      <div style={{ padding: '12px 14px', fontFamily: 'monospace', fontSize: 11, lineHeight: 1.8, maxHeight: 180, overflowY: 'auto' }}>
        {INIT_LOGS.map((log, i) => (
          <div key={i} style={{ display: 'flex', gap: 12 }}>
            <span style={{ color: '#484f58', minWidth: 60 }}>{log.time}</span>
            <span style={{ color: LEVEL_COLOR[log.level] ?? '#8b949e', minWidth: 40 }}>{log.level}</span>
            <span style={{ color: log.level === 'ERROR' ? '#f85149' : '#8b949e' }}>{log.msg}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
