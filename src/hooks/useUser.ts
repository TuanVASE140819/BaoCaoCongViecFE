import { useState, useEffect, useCallback } from 'react';
import { getStaff } from 'src/services/staff';
import { getUserInfo } from 'src/services/userService';
import { Staff } from 'src/types/staff';

export function useStaff() {
  const [staff, setStaff] = useState<Staff[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchStaff = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data: Staff[] = await getStaff();
      setStaff(data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStaff();
  }, [fetchStaff]);

  return { staff, loading, error, fetchStaff };
}

export function useUser() {
  const [user, setUser] = useState<Staff | null>(null);

  useEffect(() => {
    async function fetchUser() {
      const userInfo = await getUserInfo();
      setUser(userInfo);
    }
    fetchUser();
  }, []);

  return user;
}
