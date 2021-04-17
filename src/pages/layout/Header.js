import React, { Fragment, useState, useEffect } from 'react'
import { NavLink,useLocation } from 'react-router-dom'
import routes from '../../routes'
import Connect from '../connect/index'
import useGlobal from '../../hooks/useGlobal'
import './layout.scss'

export default React.memo(function Header() {
  const { theme, toggleTheme, links } = useGlobal()
  const locations = useLocation()
  const [menuStatus, setMenuStatus] = useState(false)
  const helpLink = <a href="https://app.gitbook.com/@classzz/s/guide-on-class-zz-cross-chain-transaction/~/drafts/-MY3KNQjpI0sQmiQWXnt/" target="_blank"><i className="ico-bookmark" /><span>HELP</span></a>
  const nav = routes.map((item, index) => index < 2 && <NavLink exact={item.exact} activeClassName="selected" className="nav-link" to={item.path} key={index} ><i className={ `ico-${item.ico}`} /><span>{item.name}</span></NavLink>)
  useEffect(() => {
    setMenuStatus(false)
  }, [locations.pathname])
  
  return (
    <Fragment>
      <div className="c-header">
        <div className="f-c">
          <h1 className="logo"><NavLink to="/" className="img" style={{backgroundImage:`url(${require('../../asset/svg/logo.svg').default })`}}>ClassZZSwap</NavLink></h1>
          <div className="c-nav">
            { nav }
            {/* { helpLink } */}
          </div>
        </div>
        <div className="f-c c-tool">
          {locations.pathname === '/swap' && <Connect />}
          {/* <div className="theme-button" onClick={ toggleTheme }>
            <i className={theme ? 'ico-moon' : 'ico-sun'} />
          </div> */}
        </div>
        <div className={`menu ico-${menuStatus ? 'x' : 'menu'}`} onClick={()=> setMenuStatus(!menuStatus)} />
      </div>
      {
        menuStatus && <div className="c-menu">
          <div className="c-menu-inner">
            { nav }
            {/* {helpLink} */}
            {links.map((item, index) => <a href={item.link} target="_blank" key={index}> <i className={ `ico-${item.ico}`} /><span>{ item.name }</span> </a>)}
        </div>
        </div>
      }
    </Fragment>
  )
})

