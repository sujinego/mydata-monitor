import { useState } from "react";
import { maskName, maskAccount, maskPhone, maskEmail } from "../utils/format";

const tdBase = {
  padding: "10px 14px",
  fontSize: 12,
  color: "#e6edf3",
  verticalAlign: "middle",
};
const tdMono = {
  ...tdBase,
  fontFamily: "monospace",
  fontSize: 11,
  color: "#8b949e",
};

export default function OrgCards({ customers }) {
  const [isMasked, setIsMasked] = useState(true);

  const handleExcelDownload = () => {
    // 마스킹 상태에 따라 데이터 가공
    const excelData = customers.map((cus) => ({
      고객명: isMasked ? maskName(cus.name) : cus.name,
      계좌번호: isMasked ? maskAccount(cus.accountNum) : cus.accountNum,
      연락처: isMasked ? maskPhone(cus.phone) : cus.phone,
      이메일: isMasked ? maskEmail(cus.email) : cus.email,
      연결기관: cus.connectedOrg,
      마지막수집일: cus.lastCollected,
      상태: cus.status,
    }));

    // 실제 환경에서는 아래로 교체:
    // await downloadExcel('/admin/customers/excel', filter, '고객수집현황');

    console.log("===== 엑셀 다운로드 데이터 =====");
    console.table(excelData); // console.table 쓰면 표 형태로 보기 좋음
    console.log("================================");
  };

  return (
    <div>
      {/* 마스킹 토글 버튼 */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: 10,
        }}
      >
        {/* 엑셀 다운로드 버튼 */}
        <button
          onClick={() => handleExcelDownload()}
          style={{
            padding: "5px 12px",
            borderRadius: 4,
            border: "1px solid #30363d",
            background: "transparent",
            color: "#3fb950",
            fontFamily: "inherit",
            fontSize: 12,
            cursor: "pointer",
          }}
        >
          엑셀 다운로드
        </button>

        <button
          onClick={() => setIsMasked(!isMasked)}
          style={{
            padding: "5px 12px",
            borderRadius: 4,
            border: "1px solid #30363d",
            background: isMasked ? "#00a651" : "transparent",
            color: isMasked ? "#fff" : "#8b949e",
            fontFamily: "inherit",
            fontSize: 12,
            cursor: "pointer",
          }}
        >
          {isMasked ? " 마스킹 ON" : " 마스킹 OFF"}
        </button>
      </div>

      {/* 테이블 */}

      <div
        style={{
          background: "#161b22",
          border: "1px solid #30363d",
          borderRadius: 5,
          overflow: "hidden",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr
              style={{
                background: "#1c2128",
                borderBottom: "1px solid #30363d",
              }}
            >
              {["고객명", "계좌번호", "연결기관", "마지막수집일", "상태"].map(
                (h) => (
                  <th
                    key={h}
                    style={{
                      padding: "10px 14px",
                      textAlign: "left",
                      fontSize: 11,
                      fontWeight: 500,
                      color: "#8b949e",
                    }}
                  >
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {customers.map((cus) => (
              <tr
                key={cus.customerId}
                style={{ borderBottom: "1px solid #30363d" }}
              >
                <td style={tdMono}>
                  {isMasked ? maskName(cus.name) : cus.name}
                </td>
                <td style={tdMono}>
                  {isMasked ? maskAccount(cus.accountNum) : cus.accountNum}
                </td>
                <td style={{ fontSize: 11 }}>{cus.connectedOrg}</td>
                <td style={{ fontSize: 11, color: "#e3b341" }}>
                  {cus.lastCollected}
                </td>
                <td style={{ fontSize: 11 }}>{cus.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
