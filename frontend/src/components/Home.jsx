import React,{useState, useEffect} from 'react'
import '../Home.css';
import MonsterBtn from './MonsterBtn';
import homeImage from '../assets/images/homeWallpaper.jpg';



function Home() {
  const [showPage, setShowPage] = useState(false);


  useEffect(() => {
    setTimeout(() => {
      setShowPage(true);
    }, 1000);
    setShowPage(false);
    return () => {
      clearInterval();
    }
  }, []);


  return (
    <>
    {showPage ? <section className="section-one" style={{backgroundImage:`url(${homeImage})`}}>
    <div class="container" style={{position:'relative',left:'-13.5rem'}}>
      <h1>Welcome to FutureStory</h1>
      <p>FutureStory is a fan-made MapleStory private server that aims to bring back the nostalgia of the old MapleStory days. We are currently in the process of developing the server and will be releasing it soon. Please donate and stay tuned for more updates!</p>
      <a href="https://gtop100.com/topsites/MapleStory" target="_blank" class="home-button">Donate</a>
    </div>  
  </section> : <div class="big ui active centered inline loader" style={{ marginTop: '25rem' }}></div>}
  <div style={{position:'relative',top:'-26.2rem',height:'100px'}}>    
  <MonsterBtn/>
  </div>
    </>
  )
}

export default Home
