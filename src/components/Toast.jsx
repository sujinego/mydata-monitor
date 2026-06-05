// src/components/Toast.jsx
const TOAST_COLOR = {
  success: '#3fb950',
  error:   '#f85149',
  info:    '#58a6ff',
};

export default function ToastContainer({ toasts }) {
  return (
    <div style={{ position: 'fixed', bottom: 24, right: 24, display: 'flex', flexDirection: 'column', gap: 8, zIndex: 300 }}>
      {toasts.map((t) => (
        <div key={t.id} style={{
          background: '#161b22',
          border: `1px solid #30363d`,
          borderLeft: `3px solid ${TOAST_COLOR[t.type] ?? '#58a6ff'}`,
          borderRadius: 6,
          padding: '12px 16px',
          fontSize: 12,
          color: '#e6edf3',
          minWidth: 260,
        }}>
          {t.message}
        </div>
      ))}
    </div>
  );
}
