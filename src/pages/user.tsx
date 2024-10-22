import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import AccessDenied from 'src/components/AccessDenied';
import { UserList } from 'src/components/user-list';

import { CONFIG } from 'src/config-global';
import { getUserInfo } from 'src/services/userService';

// ----------------------------------------------------------------------

export default function Page() {
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      const userInfo = await getUserInfo();
      setUserRole(userInfo.IDRole.tenVaiTro);
    };
    fetchUserRole();
  }, []);

  if (userRole === 'Nhân viên') {
    return <AccessDenied />;
  }
  return (
    <>
      <Helmet>
        <title> {`Users - ${CONFIG.appName}`}</title>
      </Helmet>

      <UserList />
    </>
  );
}
