import { useState, useEffect } from 'react';
import { getRoles } from 'src/services/roles';
import { Role } from 'src/types/role';

export function useRoles() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchRoles = async () => {
      setLoading(true);
      setError(null);
      try {
        const data: Role[] = await getRoles();
        setRoles(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoles();
  }, []);

  return { roles, loading, error };
}
