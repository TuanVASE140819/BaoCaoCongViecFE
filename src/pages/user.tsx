import { Helmet } from 'react-helmet-async';
import { UserList } from 'src/components/user-list';

import { CONFIG } from 'src/config-global';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Users - ${CONFIG.appName}`}</title>
      </Helmet>

      <UserList />
    </>
  );
}
