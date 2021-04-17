import React from 'react'
import useGlobal from '../../hooks/useGlobal'
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
  const {  links } = useGlobal()
  return (
    <div className="footer">
    <div className="navs f-c">
        {links.map((item, index) => <Links alt={item.name} target="_bank" key={index} href={item.link}><i className={`ico-${item.ico}`} /><b> <sup>{ item.name }</sup></b></Links>)}
      </div>
      <div> © 2021 classzz.com. All rights reserved</div>
    </div>
  )
}