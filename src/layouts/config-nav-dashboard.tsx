import { Label } from 'src/components/label';
import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor width="100%" height="100%" src={`/assets/icons/navbar/${name}.svg`} />
);

export const navData = [
  {
    title: 'Dashboard',
    path: '/',
    icon: icon('ic-analytics1'),
  },
  {
    title: 'Chức vụ',
    path: '/roles',
    icon: icon('ic-position1'),
  },
  {
    title: 'Nhân viên',
    path: '/user',
    icon: icon('ic-user1'),
  },
  {
    title: 'Báo cáo công việc',
    path: '/report',
    icon: icon('ic-report'),
  },
  {
    title: 'Quản lý báo cáo',
    path: '/manage-reports',
    icon: icon('ic-report'),
  },
  // {
  //   title: 'Product',
  //   path: '/products',
  //   icon: icon('ic-cart'),
  //   info: (
  //     <Label color="error" variant="inverted">
  //       +3
  //     </Label>
  //   ),
  // },
  // {
  //   title: 'Blog',
  //   path: '/blog',
  //   icon: icon('ic-blog'),
  // },
  // {
  //   title: 'Sign in',
  //   path: '/sign-in',
  //   icon: icon('ic-lock'),
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic-disabled'),
  // },
];
