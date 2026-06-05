// src/hooks/useBatchData.js
import { useState, useCallback } from 'react';
import { MOCK_BATCH_JOBS } from '../data/mockData';

export function useBatchData() {
  const [jobs, setJobs]         = useState(MOCK_BATCH_JOBS);
  const [isLoading, setIsLoading] = useState(false);

  // 새로고침 — 실제 환경에서는 아래로 교체:
  // const { data } = await api.get('/admin/batch/status');
  // setJobs(data);
  const refresh = useCallback(async () => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setJobs([...MOCK_BATCH_JOBS]);
    setIsLoading(false);
  }, []);

  // 단건 재처리 시뮬레이션
  const retryJob = useCallback(async (jobId) => {
    setJobs((prev) =>
      prev.map((j) =>
        j.jobId === jobId ? { ...j, status: 'RUNNING', endTime: null } : j
      )
    );
    await new Promise((r) => setTimeout(r, 2500));
    setJobs((prev) =>
      prev.map((j) =>
        j.jobId === jobId
          ? { ...j, status: 'SUCCESS', endTime: '재처리완료', errorMessage: null }
          : j
      )
    );
  }, []);

  return { jobs, isLoading, refresh, retryJob };
}
