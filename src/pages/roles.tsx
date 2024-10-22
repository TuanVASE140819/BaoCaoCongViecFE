// src/pages/roles.tsx
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { RolesList } from 'src/components/roles-list';
import AccessDenied from 'src/components/AccessDenied';
import { getUserInfo } from 'src/services/userService';

function RolesPage() {
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
        <title>Roles</title>
      </Helmet>
      <div>
        <RolesList />
      </div>
    </>
  );
}

export default RolesPage;
