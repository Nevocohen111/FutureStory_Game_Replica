import React,{useEffect} from 'react';

function NotFound({setOnShow}) {

    useEffect(() => {
        setOnShow(true);
        document.title = "404 - Not Found";
        document.body.style.backgroundImage = "url('https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif')";
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundAttachment = "fixed";
        document.body.style.backgroundPosition = "calc(30% - -20px) calc(50% - -150px)";
    
    }, [])

    
  return (
      <div>
          <h1>404</h1>
          <h2>It seems like you're lost</h2>
          <h3>Try going back to the</h3>
          <a href="/" className='Link404'>Homepage</a>
      </div>
  )
};

export default NotFound
