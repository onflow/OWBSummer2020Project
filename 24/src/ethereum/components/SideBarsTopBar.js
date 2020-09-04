import React from 'react'
import '../../App.css'
import menu from '../../assets/menu.svg'
import notify from '../../assets/notify.svg'
import dp from '../../assets/dp.svg'
import home from '../../assets/home.svg'
import star from '../../assets/star.svg'
import collec from '../../assets/collec.svg'
import marketplace from '../../assets/marketplace.svg'
import about from '../../assets/about.svg'
import profilestar from '../../assets/profilestar.svg'
import closepanel from '../../assets/closepanel.svg'


export default function SideBarsTopBar(){

  return(
    <div>
     <div className="side-bar">
       <span className="home"><img src={home} className="" alt="logo" /></span>
       <div className="home-text"></div>
       <span className="collec"><img src={collec} className="" alt="logo" /></span>
       <div className="collec-text"></div>
       <span className="marketplace"><img src={marketplace} className="" alt="logo" /></span>
       <div className="marketplace-text"></div>
       <span className="star"><img src={star} className="" alt="logo" /></span>
       <div className="star-text"></div>
       <span className="about"><img src={about} className="" alt="logo" /></span>
     </div>

     <div className="top-bar">
       <span className="menu"><img src={menu} className="" alt="logo" /></span>
       <div className="logo"></div>
       <div className="name"></div>
       <span className="notify"><img src={notify} className="" alt="logo" /></span>
       <div className="profile-frame">
       <div className="user-name"></div>
         <span className="dp"><img src={dp} className="" alt="logo" /></span>
         <span className="profile-star"><img src={profilestar} className="" alt="logo" /></span>
      </div>
     </div>

     <div className="comm-panel">
       <div className="circle"></div>
       <div className="circle"></div>
       <div className="circle"></div>
       <div className="circle"></div>
       <div className="circle"></div>
       <div className="circle"></div>
       <span className="closepanel"><img src={closepanel} className="" alt="logo" /></span>
       <div className="rec1"></div>
       <div className="rec2"></div>
       <div className="rec3"></div>
       <div className="rec4"></div>
       <div className="rec5"></div>
       <div className="rec6"></div>
       <div className="rec7"></div>
       <div className="pic1"></div>
       <div className="pic2"></div>
       <div className="pic3"></div>
     </div>

   </div>
  )
}
