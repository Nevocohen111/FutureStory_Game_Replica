import React from 'react'
import '../MonsterBtn.css';

function MonsterBtn() {

  function changeLith() {
    document.body.style.backgroundImage = "url('https://res.cloudinary.com/dn2ie5quy/image/upload/v1593371168/Maplestory%20Monster%20buttons/lithharbor_btb146.jpg')";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundRepeat = "no-repeat";
  }

  function changeSleepy() {
    document.body.style.backgroundImage = "url('https://res.cloudinary.com/dn2ie5quy/image/upload/v1593371849/Maplestory%20Monster%20buttons/sleepywood_h9k0bk.jpg')";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundRepeat = "no-repeat";
  }

  function changeMush() {
    document.body.style.backgroundImage = "url('https://res.cloudinary.com/dn2ie5quy/image/upload/v1593545902/Maplestory%20Monster%20buttons/mushroomcastle_uc01s4.jpg')";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundRepeat = "no-repeat";
  }

  function changeKer() {
    document.body.style.backgroundImage = "url('https://res.cloudinary.com/dn2ie5quy/image/upload/v1593372320/Maplestory%20Monster%20buttons/kerning_hczvby.jpg')";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundRepeat = "no-repeat";
  }

  function changeAmo() {
    document.body.style.backgroundImage = "url('https://res.cloudinary.com/dn2ie5quy/image/upload/v1593372745/Maplestory%20Monster%20buttons/amoria_fmdrvv.jpg')";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundRepeat = "no-repeat";
  }

  function changeAqua() {
    document.body.style.backgroundImage = "url('https://res.cloudinary.com/dn2ie5quy/image/upload/v1593373426/Maplestory%20Monster%20buttons/aquaroad_my0edm.jpg')";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundRepeat = "no-repeat";
  }
  return (
    <>
      <div className='wrap' style={{ width: '10vw', height: '17vh',position:'relative',top:'1rem',left:'35rem',zIndex:'9999' }}>
        <div onClick={() => changeLith()} style={{ position: 'absolute', right: '25rem', top: '45.2rem' }} className='snail' >
          <img alt='redSnail' className="redsnail" src="https://res.cloudinary.com/dn2ie5quy/image/upload/v1593360268/Maplestory%20Monster%20buttons/redsnail1_rrtxxw.png" />
          <p className='p'> Red Snail</p>
        </div>

        <div className='circle' onClick={() => changeSleepy()} style={{ position: 'absolute', left: '15rem', top: '61.5rem' }} >
          <img alt='boogie' className="boogie" src="https://res.cloudinary.com/dn2ie5quy/image/upload/v1593360267/Maplestory%20Monster%20buttons/boogie1_gupmer.png" />
          <p className='p'>Jr.Boogie</p>
        </div>

        <div className='circle' onClick={() => changeMush()} style={{ position: 'absolute', right: '16rem', top: '80rem' }}>
          <img alt='spore' className="spore" src="https://res.cloudinary.com/dn2ie5quy/image/upload/v1593360267/Maplestory%20Monster%20buttons/spore1_wiywc6.png"  />
          <p className='p'>Renegade Spore</p>
        </div>

        <div className='circle' onClick={() => changeKer()} style={{ position: 'absolute', right: '1rem', top: '32.7rem' }}>
          <img alt="necki" className="necki" src="https://res.cloudinary.com/dn2ie5quy/image/upload/v1593372205/Maplestory%20Monster%20buttons/necki_guaeee.png" />
          <p className='p'>Jr.Necki</p>
        </div>

        <div className='circle' onClick={() => changeAmo()} style={{ position: 'absolute', right: '-30rem', top: '38rem' }}>
          <img alt='cellion' className="cellion" src="https://res.cloudinary.com/dn2ie5quy/image/upload/v1593372695/Maplestory%20Monster%20buttons/cellion_zqorca.png" />
          <p className='p'>Sakura Cellion</p>
        </div>

        <div className='circle' onClick={() => changeAqua()} style={{ position: 'absolute', top: '87rem', left: '62rem' }}>
          <img alt="pepe" className="pepe" src="https://res.cloudinary.com/dn2ie5quy/image/upload/v1593360267/Maplestory%20Monster%20buttons/pepe1_pua48l.png" />
          <p className='p'>Scuba Pepe</p>
        </div>
      </div>
      <footer className="footer" style={{ position: 'relative', top: '20rem' }}>
        <div id="container">
          <img src="https://i.gyazo.com/01797ac9b2c3c4853f4048b750f875ae.jpg" id="background" height={'900vh'} width={'200vw'} alt="mapleStory background" />
        </div>
      </footer>
    </>
  )
}

export default MonsterBtn
