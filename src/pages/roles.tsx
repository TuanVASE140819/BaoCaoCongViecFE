import { Helmet } from 'react-helmet-async';
import { RolesList } from 'src/components/roles-list';

function RolesPage() {
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
