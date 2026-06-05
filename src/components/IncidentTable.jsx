// src/components/IncidentTable.jsx
const tdBase = { padding: '10px 14px', fontSize: 12, color: '#e6edf3', verticalAlign: 'middle' };
const tdMono = { ...tdBase, fontFamily: 'monospace', fontSize: 11, color: '#8b949e' };

export default function IncidentTable({ incidents }) {
  return (
    <div style={{ background: '#161b22', border: '1px solid #30363d', borderRadius: 6, overflow: 'hidden' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#1c2128', borderBottom: '1px solid #30363d' }}>
            {['발생시각','복구시각','영향범위','원인','조치내용','처리자'].map((h) => (
              <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontSize: 11, fontWeight: 500, color: '#8b949e' }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {incidents.map((inc) => (
            <tr key={inc.id} style={{ borderBottom: '1px solid #30363d' }}>
              <td style={tdMono}>{inc.occurTime}</td>
              <td style={tdMono}>{inc.recoverTime}</td>
              <td style={{ ...tdBase, fontSize: 11 }}>{inc.scope}</td>
              <td style={{ ...tdBase, fontSize: 11, color: '#e3b341' }}>{inc.cause}</td>
              <td style={{ ...tdBase, fontSize: 11 }}>{inc.action}</td>
              <td style={{ ...tdBase, fontSize: 11, color: '#58a6ff' }}>{inc.handler}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
