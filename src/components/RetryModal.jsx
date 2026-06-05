// src/components/RetryModal.jsx
import { useState } from 'react';
import { ORG_NAME } from '../data/mockData';

export default function RetryModal({ isOpen, onClose, onConfirm }) {
  const [orgCode, setOrgCode] = useState('0081');
  const [jobType, setJobType] = useState('asset-collect');
  const [mode,    setMode]    = useState('retry-only');

  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#161b22', border: '1px solid #30363d', borderRadius: 8, width: 420, padding: 24 }}>
        <h3 style={{ fontSize: 15, marginBottom: 16, color: '#e6edf3' }}>배치 재처리</h3>

        <Field label="기관코드">
          <select value={orgCode} onChange={(e) => setOrgCode(e.target.value)} style={inputStyle}>
            {Object.entries(ORG_NAME).map(([code, name]) => (
              <option key={code} value={code}>{code} - {name}</option>
            ))}
            <option value="ALL">전체 실패 기관</option>
          </select>
        </Field>

        <Field label="배치 구분">
          <select value={jobType} onChange={(e) => setJobType(e.target.value)} style={inputStyle}>
            <option value="asset-collect">자산수집</option>
            <option value="trans-collect">거래내역수집</option>
            <option value="consent-sync">동의정보동기화</option>
          </select>
        </Field>

        <Field label="처리 모드">
          <select value={mode} onChange={(e) => setMode(e.target.value)} style={inputStyle}>
            <option value="retry-only">실패건만 재처리</option>
            <option value="full">전체 재처리</option>
          </select>
        </Field>

        {mode === 'full' && (
          <div style={{ background: 'rgba(248,81,73,0.1)', border: '1px solid rgba(248,81,73,0.3)', borderRadius: 4, padding: '10px 12px', marginTop: 4 }}>
            <p style={{ fontSize: 11, color: '#f85149' }}>⚠ 전체 재처리 선택 시 기존 데이터가 덮어쓰기됩니다.</p>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 20 }}>
          <button onClick={onClose}                                style={cancelBtnStyle}>취소</button>
          <button onClick={() => onConfirm({ orgCode, jobType, mode })} style={confirmBtnStyle}>실행</button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <label style={{ fontSize: 11, color: '#8b949e', display: 'block', marginBottom: 4 }}>{label}</label>
      {children}
    </div>
  );
}

const inputStyle = {
  width: '100%', background: '#1c2128', border: '1px solid #30363d',
  color: '#e6edf3', fontFamily: 'inherit', fontSize: 12,
  padding: '7px 10px', borderRadius: 4, outline: 'none',
};
const cancelBtnStyle = {
  padding: '6px 14px', borderRadius: 4, border: '1px solid #30363d',
  background: 'transparent', color: '#8b949e', fontFamily: 'inherit', fontSize: 12, cursor: 'pointer',
};
const confirmBtnStyle = {
  padding: '6px 14px', borderRadius: 4, border: 'none',
  background: '#00a651', color: '#fff', fontFamily: 'inherit', fontSize: 12, cursor: 'pointer',
};
