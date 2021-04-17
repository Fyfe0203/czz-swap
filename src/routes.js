import { lazy } from 'react' //react-router-com''
const routes = [
  {
    name: 'HOME',
    path: '/',
    exact:true,
    ico:'home',
    compontent: lazy(() => import('./pages/overView/index'))
  },
  {
    name: 'SWAP',
    exact:false,
    path: '/swap',
    ico:'repeat',
    compontent: lazy(() => import('./pages/swap/index'))
  }
]
export default  routes