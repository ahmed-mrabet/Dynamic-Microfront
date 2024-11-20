import {INavData} from '@coreui/angular';

export const navItems: INavData[] = [
 
  {
    name: 'New Connection',
    url: '/new-connection',
    iconComponent: {name: 'cilLibraryAdd'}
  },
  {
    name: 'Datasource',
    url: '/datasource',
    iconComponent: {name: 'cilStorage'}
  },
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: {name: 'cilScreenDesktop'},

  },
 
  {
    name: 'Alerts',
    url: '/alert',
    iconComponent: {name: 'cilBellExclamation'}
  },
  {
    name: 'Notifications',
    url: '/notification',
    iconComponent: {name: 'cilBell'}
  },
  {
    name: 'Log-Out',
    url: '/log-out',
    iconComponent: {name: 'cilAccountLogout'}
  }
];
