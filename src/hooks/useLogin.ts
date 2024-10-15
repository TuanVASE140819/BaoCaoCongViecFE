import { useState } from 'react';
import { login } from 'src/services/auth';
import { useRouter } from 'src/routes/hooks';

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleLogin = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await login(email, password);
      if (data.token) {
        localStorage.setItem('token', data.token);
        router.push('/');
      } else {
        throw new Error('Đăng nhập thất bại!');
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin, loading, error };
}
