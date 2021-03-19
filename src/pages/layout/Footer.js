import React from 'react'

export default function Footer() {
  const links = [
    {name: 'Home', link: 'http://classzz.com'},
    {name: 'Github', link: 'https://github.com/classzz'},
    // {name:'kakaotalk',link:''},
    {name: 'Telegram', link: 'https://t.me/classzzoffical'},
    {name: 'Twitter', link: 'https://www.twitter.com/class_zz'},
    {name: 'CzzClub', link: 'http://czz.club'},
  ]
  return (
    <div className="footer">
    <div className="navs f-c">
        {links.map((item, index) => <a key={index} href={ item.link}>{item.name}</a>)}
      </div>
      <div> © 2020 - 2021 classzzswap.Finance. All rights reserved</div>
    </div>
  )
}