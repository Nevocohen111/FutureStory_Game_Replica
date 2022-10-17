import React from 'react'
import '../Home.css';
import MonsterBtn from './MonsterBtn';
import homeWallpaper from '../assets/images/homeWallpaper.jpg';



function Home() {


  return (
    <>
     <section className="section-one">
    <div class="container" style={{position:'relative',left:'-13.5rem'}}>
      <h1>Welcome to FutureStory</h1>
      <p>FutureStory is a fan-made MapleStory private server that aims to bring back the nostalgia of the old MapleStory days. We are currently in the process of developing the server and will be releasing it soon. Please donate and stay tuned for more updates!</p>
      <a href="https://gtop100.com/topsites/MapleStory" target="_blank" class="home-button">Donate</a>
    </div>  
  </section>
  <div style={{position:'relative',top:'-26.2rem',height:'100px'}}>    
  <MonsterBtn/>
  </div>
    </>
  )
}

export default Home
