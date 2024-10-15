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
        setMyAccount({
          displayName: userInfo.tenNhanVien,
          email: userInfo.email,
          photoURL: '/assets/images/avatar/avatar-25.webp', // Bạn có thể cập nhật URL ảnh đại diện nếu có
          role: userInfo.IDRole.tenVaiTro,
        });
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

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/sign-in');
  };

  return { handleLogin, handleLogout, loading, error };
}
