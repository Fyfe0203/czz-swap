import { lazy } from 'react'

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
  }
]
export default  routes
