import { Suspense } from 'react'
import { AppProvider } from './context/AppGlobalState'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import Header from './pages/layout/Header'
import Footer from './pages/layout/Footer'
import routes from './routes'
import PageLoading from './compontent/PageLoading'
import { ThemeProvider } from 'styled-components'
import theme from './theme'
import './asset/common.scss'
import intl from 'react-intl-universal'
import IntlPolyfill from "intl"

global.Intl = IntlPolyfill;
require('intl/locale-data/jsonp/en.js');
require('intl/locale-data/jsonp/zh.js');
const SUPPOER_LOCALES = [
  {
    name: "English",
    value: "en-US"
  },
  {
    name: "简体中文",
    value: "zh-CN"
  },

];
export default function App() {
    const pages = routes.map((item, index) => {
      const {compontent:Page,...rest } = item
      return <Route {...rest} key={index} render={routerProps => <Page {...rest} {...routerProps} />} />
    })
    const currentLocale = SUPPOER_LOCALES[1].value; // Determine user's locale here
    intl.init({
      currentLocale,
      locales: {
        [currentLocale]: require(`./locales/${currentLocale}`)
      },
    });

  return (
    <Suspense fallback={<PageLoading />}>
      <ThemeProvider theme={ theme }>
        <AppProvider>
          <BrowserRouter>
            <Header />
              <Switch>
                <Suspense fallback={<PageLoading />}>
                  {pages}
                </Suspense>
              </Switch>
            <Footer />
          </BrowserRouter>
        </AppProvider>
      </ThemeProvider>
    </Suspense>
  )
}
