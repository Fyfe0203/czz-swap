import { lazy } from 'react' //react-router-com''
const routes = [
  {
    name: 'HOME',
    path: '/',
    exact:true,
    compontent: lazy(() => import('./pages/overView/index'))
  },
  {
    name: 'SWAP',
    exact:false,
    path:'/swap',
    compontent: lazy(() => import('./pages/swap/index'))
  },
  {
    name: 'connect',
    exact:false,
    path:'/connect',
    compontent: lazy(() => import('./pages/connect/index'))
  }
]
export default  routes