import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'home-outline',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'Product',
    icon: 'car-outline',
    children: [
      {
        title: 'Category',
        link: '/pages/category',
      },
      {
        title: 'Product',
        link: '/pages/product',
      },
    ],
  },
  {
    title: 'Account',
    icon: 'people-outline',
    children: [
      {
        title: 'User',
        link: '/pages/user',
      },
      {
        title: 'Admin',
        link: '/pages/admin',
      },
    ],
  },
  {
    title: 'Order',
    icon: 'shopping-cart-outline',
    link: '/pages/user',
  },
  {
    title: 'Model generator',
    icon: 'cube-outline',
    link: '/pages/recap',
  },
  // {
  //   title: 'Auth',
  //   icon: 'lock-outline',
  //   children: [
  //     {
  //       title: 'Login',
  //       link: '/auth/login',
  //     },
  //     {
  //       title: 'Register',
  //       link: '/auth/register',
  //     },
  //     {
  //       title: 'Request Password',
  //       link: '/auth/request-password',
  //     },
  //     {
  //       title: 'Reset Password',
  //       link: '/auth/reset-password',
  //     },
  //   ],
  // },
];
