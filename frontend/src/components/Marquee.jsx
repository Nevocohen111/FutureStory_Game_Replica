import React from 'react'
import '../Marquee.css'

function Marquee() {
    return (
        <div>
            <div className="marquee" style={{backgroundColor:JSON.parse(window.localStorage.getItem('wallpaper')) === "/static/media/homeWallpaper.75928c8d3cb5b26a093b.jpg" ? '#f1dc70' : 'white'}}>
                <marquee>Welcome to FutureStory, a MapleStory private server!</marquee>
                </div>
        </div>
    )
}

export default Marquee
