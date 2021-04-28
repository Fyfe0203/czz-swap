import { lazy } from 'react' //react-router-com''
import intl from 'react-intl-universal'

const routes = [
  {
    name: 'home',
    path: '/',
    exact:true,
    ico:'home',
    compontent: lazy(() => import('./pages/overView/index'))
  },
  {
    name: 'swap',
    exact:false,
    path: '/swap',
    ico:'repeat',
    compontent: lazy(() => import('./pages/swap/index'))
  },
  {
    name: 'insurance',
    path: '/insurance',
    icon: 'insurance',
    exact: true,
    compontent: lazy(() => import('./pages/insurance/index'))
  }
]
export default  routes