import React from 'react'

import styled from 'styled-components'
const Links = styled.a`
  position:relative;
  b{
    display:none;
    font-size:12px;
    text-align:center;
    font-weight:normal;
    align-items:center;
    justify-content:center;
    flex-direction:column;
    color:#fff;
    position:absolute;
    left:-100%;
    right:-100%;
    bottom:120%;
     &::after{
      content:'';
      border: 5px solid transparent;
      border-top-color:rgba(0,0,0,.6);
    }
  }
  sup{
    padding:8px 10px;
    border-radius:5px;
    background-color:rgba(0,0,0,.6);
  }
  &:hover{
    opacity:.5s;
    b{
      display:flex;
    }
  }
`
export default function Footer() {

  const links = [
    // {name: 'White Paper', link: 'http://docs.classzz.com/czz-whitepaper-v1.3.pdf',ico:'book-open'},
    {name: 'White Paper', link: 'https://docs.classzz.com/czz.whitepaper.v4.pdf',ico:'book-open'},
    {name: 'Github', link: 'https://github.com/classzz',ico:'github'},
    {name: 'Telegram', link: 'https://t.me/classzzoffical',ico:'send'},
    {name: 'Twitter', link: 'https://www.twitter.com/class_zz',ico:'twitter'},
    // { name: 'CZZ Audit', link: 'https://docs.classzz.com/CZZ_audit.pdf',ico:'shield' },
    // { name: 'CZZ Audit 2.0', link: 'https://docs.classzz.com/CZZ_audit 2.0.pdf',ico:'archive' },
    { name: 'CzzClub', link: 'http://czz.club', ico: 'message-square' },
    { name: 'CZZ Explorer', link: 'http://explorer.classzz.com', ico: 'globe' },
  ]
  return (
    <div className="footer">
    <div className="navs f-c">
        {links.map((item, index) => <Links alt={item.name} target="_bank" key={index} href={item.link}><i className={`ico-${item.ico}`} /><b> <sup>{ item.name }</sup></b></Links>)}
      </div>
      <div> © 2021 classzz.com. All rights reserved</div>
    </div>
  )
}