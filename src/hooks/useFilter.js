// src/hooks/useFilter.js
import { useState, useMemo } from 'react';

export function useFilter(jobs) {
  const [orgCode, setOrgCode] = useState('');
  const [status,  setStatus]  = useState('');

  const filtered = useMemo(() => {
    return jobs.filter((j) => {
      if (orgCode && j.orgCode !== orgCode) return false;
      if (status  && j.status  !== status)  return false;
      return true;
    });
  }, [jobs, orgCode, status]);

  const reset = () => { setOrgCode(''); setStatus(''); };

  return { orgCode, setOrgCode, status, setStatus, filtered, reset };
}
