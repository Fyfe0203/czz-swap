import { useEffect,useState } from 'react'
import intl from 'react-intl-universal'
import locales from '../locales/index'

export default function useIntl() {
  const [lang, setLang] = useState('en-US')
  const localesList = [
    {
      name: "English",
      value: "en-US",
      type: "EN"
    },
    {
      name: "简体中文",
      value: "zh-CN",
      type: "CN"
    },
  ]

  const changeLocales = async (currentLocale = 'en-US') => {
    await intl.init({
      currentLocale,
      locales
    })
    setLang(currentLocale)
    window.localStorage.setItem('lang',currentLocale)
  }

  useEffect(() => {
    let langs = window.localStorage.getItem('lang')
    changeLocales(langs)
  }, [])

  const onChange = val => {
    changeLocales(val)
    window.location.reload()
  }
  return {localesList,changeLocales,lang,setLang,onChange}
}
