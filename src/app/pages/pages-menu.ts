import {NbMenuItem} from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'home-outline',
    link: '/pages/dashboard',
    home: true
  },
  {
    title: 'Product',
    link: '/pages/product',
    icon: 'car-outline'
  },
  {
    title: 'Category',
    link: '/pages/category',
    icon: 'keypad-outline'
  },
  {
    title: 'Account',
    icon: 'people-outline',
    link: '/pages/account'
  },
  {
    title: 'Cashier',
    icon: 'printer-outline',
    link: '/pages/cashier'
  },
  {
    title: 'Order',
    icon: 'shopping-cart-outline',
    link: '/pages/order'
  },
  {
    title: 'Model generator',
    icon: 'cube-outline',
    link: '/pages/recap'
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
