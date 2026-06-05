# 마이데이터 SM 배치 모니터링

은행 마이데이터 운영 환경을 로컬에서 체험할 수 있는 React 프로젝트입니다.

---

## 실행 방법

```bash
# 1. 패키지 설치
npm install

# 2. 개발 서버 실행
npm start

# 브라우저에서 http://localhost:3000 열기
```

---

## 파일 구조

```
src/
├── App.jsx                 ← 메인 컴포넌트 (전체 조립)
│
├── data/
│   └── mockData.js         ← 목 데이터 (실제 환경에서는 API 호출로 교체)
│
├── hooks/
│   └── index.js            ← 커스텀 훅 4개
│       ├── useBatchData    → 배치 데이터 조회 & 재처리
│       ├── useFilter       → 조회 조건 필터
│       ├── useAutoRefresh  → 60초 자동 새로고침
│       └── useToast        → 알림 토스트
│
├── utils/
│   └── format.js           ← 유틸 함수 (날짜, 금액, 마스킹 등)
│
└── components/
    ├── App.jsx             ← 메인
    ├── SummaryCards.jsx    ← 상단 요약 카드
    ├── FilterBar.jsx       ← 조회 조건 필터
    ├── BatchTable.jsx      ← 배치 현황 테이블 ★ SM 작업 주석 있음
    ├── StatusBadge.jsx     ← 상태 배지 (SUCCESS/FAIL/RUNNING...)
    └── index.js            ← LogPanel, AssetTable, IncidentTable,
                               Toast, RetryModal
```

---

## SM 실습 포인트

### 1. 컬럼 추가 (BatchTable.jsx)
```jsx
// [SM 작업] 주석 찾아서 새 <th> / <td> 추가해보기
<Th>새 컬럼</Th>
<Td>{job.newField}</Td>
```

### 2. 필터 추가 (FilterBar.jsx)
```jsx
// select 하나 추가하고 setOrgCode처럼 연결해보기
```

### 3. 목 데이터 → 실제 API 연동
```js
// mockData.js 의 MOCK_BATCH_JOBS 대신
// useBatchData.js 에서 아래로 교체:
const { data } = await api.get('/admin/batch/status');
setJobs(data);
```

### 4. 실패 행 색상 변경 (BatchTable.jsx)
```jsx
// BatchRow 컴포넌트의 rowBg 조건 수정해보기
const rowBg = job.status === 'FAIL' ? '원하는 색상' : ...
```

---

## 실제 API 연동 시 변경할 파일

| 파일 | 변경 내용 |
|------|----------|
| `hooks/index.js` > `useBatchData` | MOCK 대신 axios api 호출 |
| `data/mockData.js` | 실제 기관코드/명칭으로 업데이트 |
| `public/index.html` | 구글 폰트 제거 (폐쇄망) |
