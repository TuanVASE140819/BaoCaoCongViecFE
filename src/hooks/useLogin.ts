import { useState } from 'react';
import { useRouter } from 'src/routes/hooks';
import { login, getUserInfo } from 'src/services/auth';
import { setMyAccount } from 'src/_mock/_data';

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
        const userInfo = await getUserInfo(data.token);
        console.log('User Info:', userInfo);
        // lưu thông tin người dùng vào localStorage
        localStorage.setItem('userInfo', JSON.stringify(userInfo));

        if (userInfo.IDRole.tenVaiTro === 'Nhân viên') {
          router.push('/report');
        } else {
          router.push('/');
        }
      } else {
        throw new Error('Đăng nhập thất bại!');
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo'); // Xóa thông tin người dùng khỏi localStorage
    router.push('/sign-in');
  };

  return { handleLogin, handleLogout, loading, error };
}
