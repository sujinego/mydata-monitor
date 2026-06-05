// src/App.jsx
import { useState } from "react";
import SummaryCards from "./components/SummaryCards";
import FilterBar from "./components/FilterBar";
import BatchTable from "./components/BatchTable";
import LogPanel from "./components/LogPanel";
import AssetTable from "./components/AssetTable";
import IncidentTable from "./components/IncidentTable";
import ToastContainer from "./components/Toast";
import RetryModal from "./components/RetryModal";
import OrgCards from "./components/OrgCards";
import { useBatchData } from "./hooks/useBatchData";
import { useFilter } from "./hooks/useFilter";
import { useAutoRefresh } from "./hooks/useAutoRefresh";
import { useToast } from "./hooks/useToast";
import { MOCK_ASSETS, MOCK_INCIDENTS, MOCK_CUSTOMERS } from "./data/mockData";

export default function App() {
  const [activeTab, setActiveTab] = useState("batch");
  const [modalOpen, setModalOpen] = useState(false);

  const { jobs, isLoading, refresh, retryJob } = useBatchData();
  const { orgCode, setOrgCode, status, setStatus, filtered, reset } =
    useFilter(jobs);
  const { toasts, showToast } = useToast();
  const { enabled, setEnabled, countdown } = useAutoRefresh(refresh, 60000);

  const handleRetry = async (jobId, jobName) => {
    showToast(`${jobName} 재처리를 시작합니다.`, "info");
    await retryJob(jobId);
    showToast(`${jobName} 재처리 완료!`, "success");
  };

  const handleRefresh = async () => {
    await refresh();
    showToast("새로고침 완료", "info");
  };

  const handleModalConfirm = ({ orgCode, jobType, mode }) => {
    setModalOpen(false);
    showToast(`재처리 실행: ${jobType} / ${orgCode} / ${mode}`, "success");
  };

  const tabs = [
    { key: "batch", label: "배치 현황" },
    { key: "asset", label: "자산 수집 현황" },
    { key: "incident", label: "장애 이력" },
    { key: "org", label: "고객 수집 현황" },
  ];

  return (
    <div
      style={{
        fontFamily: "'IBM Plex Sans KR', 'Malgun Gothic', sans-serif",
        background: "#0d1117",
        minHeight: "100vh",
        color: "#e6edf3",
      }}
    >
      {/* 헤더 */}
      <header
        style={{
          background: "#161b22",
          borderBottom: "1px solid #30363d",
          padding: "0 24px",
          height: 52,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span
            style={{
              background: "#00a651",
              color: "#fff",
              fontWeight: 600,
              fontSize: 12,
              padding: "4px 10px",
              borderRadius: 4,
            }}
          >
            HANA
          </span>
          <span style={{ fontSize: 14, fontWeight: 500 }}>
            마이데이터 운영 모니터링
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              cursor: "pointer",
              fontSize: 12,
              color: "#8b949e",
            }}
          >
            <input
              type="checkbox"
              checked={enabled}
              onChange={(e) => setEnabled(e.target.checked)}
            />
            자동새로고침{" "}
            <span style={{ color: "#58a6ff", fontFamily: "monospace" }}>
              {enabled ? `${countdown}s` : "꺼짐"}
            </span>
          </label>
          <span
            style={{
              fontSize: 11,
              padding: "2px 8px",
              borderRadius: 3,
              fontWeight: 500,
              background: "rgba(248,81,73,0.12)",
              color: "#f85149",
              border: "1px solid rgba(248,81,73,0.3)",
            }}
          >
            PROD
          </span>
        </div>
      </header>

      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "20px 24px" }}>
        {/* 탭 */}
        <div
          style={{
            display: "flex",
            borderBottom: "1px solid #30363d",
            marginBottom: 16,
          }}
        >
          {tabs.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              style={{
                padding: "10px 16px",
                fontSize: 13,
                color: activeTab === key ? "#e6edf3" : "#8b949e",
                background: "transparent",
                border: "none",
                borderBottom:
                  activeTab === key
                    ? "2px solid #00a651"
                    : "2px solid transparent",
                marginBottom: -1,
                cursor: "pointer",
                fontFamily: "inherit",
                fontWeight: activeTab === key ? 500 : 400,
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* 탭1: 배치 현황 */}
        {activeTab === "batch" && (
          <>
            <SummaryCards jobs={filtered} />
            <FilterBar
              orgCode={orgCode}
              setOrgCode={setOrgCode}
              status={status}
              setStatus={setStatus}
              onReset={reset}
              onRefresh={handleRefresh}
              onRetryAll={() => setModalOpen(true)}
            />
            <BatchTable
              jobs={filtered}
              onRetry={handleRetry}
              isLoading={isLoading}
            />
            <LogPanel />
          </>
        )}

        {/* 탭2: 자산 수집 현황 */}
        {activeTab === "asset" && <AssetTable assets={MOCK_ASSETS} />}

        {/* 탭3: 장애 이력 */}
        {activeTab === "incident" && (
          <IncidentTable incidents={MOCK_INCIDENTS} />
        )}

        {/* 탭4: 고객별 수집 현황 조회 */}
        {activeTab === "org" && <OrgCards customers={MOCK_CUSTOMERS} />}
      </div>

      <RetryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleModalConfirm}
      />
      <ToastContainer toasts={toasts} />
    </div>
  );
}
