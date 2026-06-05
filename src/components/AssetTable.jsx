// src/components/AssetTable.jsx
import { ORG_NAME } from '../data/mockData';

const tdBase = { padding: '10px 14px', fontSize: 12, color: '#e6edf3', verticalAlign: 'middle' };
const tdMono = { ...tdBase, fontFamily: 'monospace', fontSize: 11, color: '#8b949e' };

export default function AssetTable({ assets }) {
  return (
    <div style={{ background: '#161b22', border: '1px solid #30363d', borderRadius: 6, overflow: 'hidden' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#1c2128', borderBottom: '1px solid #30363d' }}>
            {['기관코드','기관명','업권','수집고객수','성공','실패','수집률','마지막수집'].map((h) => (
              <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontSize: 11, fontWeight: 500, color: '#8b949e', textTransform: 'uppercase' }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {assets.map((a) => {
            const rate  = Math.round((a.success / a.total) * 100);
            const color = rate === 100 ? '#3fb950' : rate >= 95 ? '#e3b341' : '#f85149';
            return (
              <tr key={a.orgCode} style={{ borderBottom: '1px solid #30363d' }}>
                <td style={tdMono}>{a.orgCode}</td>
                <td style={tdBase}>{ORG_NAME[a.orgCode]}</td>
                <td style={tdBase}>
                  <span style={{ fontSize: 11, padding: '2px 7px', background: 'rgba(88,166,255,0.12)', color: '#58a6ff', borderRadius: 3 }}>
                    {a.industry}
                  </span>
                </td>
                <td style={{ ...tdMono, textAlign: 'right' }}>{a.total.toLocaleString()}</td>
                <td style={{ ...tdMono, color: '#3fb950' }}>{a.success.toLocaleString()}</td>
                <td style={{ ...tdMono, color: a.fail ? '#f85149' : '#484f58' }}>{a.fail.toLocaleString()}</td>
                <td style={tdBase}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 80, height: 4, background: '#1c2128', borderRadius: 2, overflow: 'hidden' }}>
                      <div style={{ width: `${rate}%`, height: '100%', background: color, borderRadius: 2 }} />
                    </div>
                    <span style={{ fontFamily: 'monospace', fontSize: 11, color }}>{rate}%</span>
                  </div>
                </td>
                <td style={tdMono}>오늘 06:30</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
