import React,{useEffect} from 'react';

function NotFound({setOnShow}) {

    useEffect(() => {
        setOnShow(true);
        document.body.style.backgroundImage = "url('https://media3.giphy.com/media/dh1VbCznj5qkQmVleO/giphy.gif?cid=ecf05e47pl4f7nl032slw1iv0j4jagftm5o1c7j6rltpq8vq&rid=giphy.gif&ct=g')";
        document.body.style.backgroundSize = "calc(50vw + 1px) calc(80vh + 1px)";
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundAttachment = "fixed";
        document.body.style.backgroundPosition = "calc(25vw + 1px) calc(20vh + 1px)";
    }, [])

    
  return (
    <div>
      <div style={{position:'absolute',top:'5%',left:'50%',transform:'translate(-50%,-50%)',textAlign:'center'}}>
        <h1>404</h1>
        <h2>It seems like you're lost</h2>
        <h3>Try going back to the</h3>
        <a href="/" className='Link404'>Homepage</a>
        </div>
      
    </div>
  )
};

export default NotFound
