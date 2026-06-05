// src/components/StatusBadge.jsx
// ─────────────────────────────────────────
//  배치 상태 배지 컴포넌트
//  SM에서 가장 많이 쓰는 공통 컴포넌트
// ─────────────────────────────────────────

import { STATUS_LABEL, STATUS_COLOR } from '../utils/format';

export default function StatusBadge({ status }) {
  const style = STATUS_COLOR[status] ?? STATUS_COLOR.PENDING;

  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5,
      padding: '3px 8px',
      borderRadius: 3,
      fontSize: 11,
      fontWeight: 500,
      fontFamily: 'monospace',
      background: style.bg,
      color: style.color,
      border: `1px solid ${style.border}`,
    }}>
      {/* 상태 점 */}
      <span style={{
        width: 5, height: 5,
        borderRadius: '50%',
        background: style.color,
        // RUNNING일 때 깜빡임
        animation: status === 'RUNNING' ? 'pulse 1.2s infinite' : 'none',
      }} />
      {STATUS_LABEL[status] ?? status}
    </span>
  );
}
