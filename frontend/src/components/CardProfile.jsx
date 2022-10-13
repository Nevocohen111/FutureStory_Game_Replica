import React from 'react';
import "../CardProfile.css";
import MonsterBtn from './MonsterBtn';
import AuthContext from '../context/AuthProvider';
import profilePic from '../assets/images/profilePic.jpg';
import "../Register.css";

const ImgUpload =({
  onChange,
  src
})=>
  <label htmlFor="photo-upload" className="custom-file-upload fas">
    <div className="img-wrap img-upload" >
      <img HtmlFor="photo-upload" src={src} alt="profile"/>
    </div>
    <input id="photo-upload" type="file" onChange={onChange}/> 
  </label>


const Name =({
  onChange,
  value,
})=>
  <div className="field">
    <label htmlFor="name">
      name:
    </label>
    <input 
      id="name" 
      type="text" 
      onChange={onChange} 
      maxLength="25" 
      value={value}
      placeholder="Name"
      required/>
  </div>

  
const Status =({
  onChange,
  status
})=>
  <div className="field">
    <label htmlFor="status">
      status:
    </label>
    <input 
      id="status" 
      type="text" 
      onChange={onChange} 
      maxLength="35" 
      value={status}
      placeholder= "Status"
      required/>
  </div>


const Profile =({
  onSubmit,
  src,
  name,
  status
})=>
  <div className="card">
    <form onSubmit={onSubmit} className="formEdit">
      <label className="custom-file-upload fas">
        <div className="img-wrap" >
          <img Htmlfor="photo-upload" src={src} alt="profile"/>
        </div>
      </label>
      <div className="name">{name}</div>
      <div className="status">{status}</div>
      <button type="submit" className="edit">Edit Profile </button>
    </form>
  </div>
     
      
const Edit =({
  onSubmit,
  children,
})=>
  <div className="card">
    <form onSubmit={onSubmit} className="formSave">
        {children}
      <button type="submit" className="save">Save</button>
    </form>
  </div>

class CardProfile extends React.Component {
  state = {
    file: '',
    imagePreviewUrl: profilePic,
    name:'',
    status:'',
    active: 'edit',
    showLoader : false
  }
  static contextType = AuthContext;
  
          
  componentDidMount = () => {
      this.setState({showLoader : true});
      document.getElementById('bucket').style.display = 'none';
    setTimeout(() => {
      document.getElementById('bucket').style.display = 'block';
      this.setState({showLoader : false});
    }, 1500);
    fetch(`http://localhost:8080/profile/getPicture?authName=${this.context.auth.name}`,{
      method: 'GET',
      headers: { 'Content-Type': 'application/json'},
      mode : 'cors'
    })
    .then(res => res.json())
    .then(data => {
      window.localStorage.setItem(this.context.auth.name , data.url);
      window.localStorage.setItem(this.context.auth.name + '_name' , data.name);
      window.localStorage.setItem(this.context.auth.name + '_status' , data.status);

      this.setState({imagePreviewUrl : data.url, name : data.name, status : data.status});
    })
    .catch(err => console.log(err));

    return () => {
      clearTimeout()};
  }

  
  


  photoUpload = e =>{
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result,
      });
    }
    reader.readAsDataURL(file);  
  }


  editName = e =>{
    const name = e.target.value;
    this.setState({
      name,
    })
    window.localStorage.setItem(this.context.auth.name + '_name' , name);
  }
  
  editStatus = e => {
    const status = e.target.value;
    this.setState({
      status,
    });
    window.localStorage.setItem(this.context.auth.name + '_status' , status);
  }
  
  handleSubmit = async (e) =>{
    e.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      mode : 'cors',
      body: JSON.stringify({
        "name": `${this.state.name}`,
        "status": `${this.state.status}`,
        "url" : `${this.state.imagePreviewUrl}`,
        "authName" : `${this.context.auth.name}`
      })
    };
    const response = await fetch('http://localhost:8080/profile/add', requestOptions);
        if(response.status === 405)
          alert("Whoops! either the picture is to big or you didn't upload a picture");


    fetch(`http://localhost:8080/profile/getPicture?authName=${this.context.auth.name}`,{
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      mode : 'cors'
    })
    .then(res => res.json())
    .then(data => {
      window.localStorage.setItem(this.context.auth.name  , data.url);
      window.localStorage.setItem(this.context.auth.name + '_name' , data.name);
      window.localStorage.setItem(this.context.auth.name + '_status' , data.status);
      this.setState({
        imagePreviewUrl: data.url,
        name: data.name,
        status: data.status,
      });

    })
    let activeP = this.state.active === 'edit' ? 'profile' : 'edit';
    this.setState({
      active: activeP,
    })
  }
  
  render() {
 
    const {imagePreviewUrl, 
           name, 
           status, 
           active} = this.state;







      
          
    return (
      <>
      <div id='bucket'>
        {(active === 'edit')?(
          <Edit onSubmit={this.handleSubmit}>
            <ImgUpload onChange={this.photoUpload} src={window.localStorage.getItem(this.context.auth.name) ? window.localStorage.getItem(this.context.auth.name) : imagePreviewUrl}/>
            <Name onChange={this.editName} value={window.localStorage.getItem(this.context.auth.name + '_name') !== '' ? window.localStorage.getItem(this.context.auth.name + '_name') : name}/>
            <Status onChange={this.editStatus} status={window.localStorage.getItem(this.context.auth.name + '_status' ) !== '' ? window.localStorage.getItem(this.context.auth.name + '_status') : status}/>
          </Edit>
        ):(
          <Profile 
            onSubmit={this.handleSubmit} 
            src={window.localStorage.getItem(this.context.auth.name) !== '' ? window.localStorage.getItem(this.context.auth.name) : imagePreviewUrl}
            name={window.localStorage.getItem(this.context.auth.name + '_name') != '' ? window.localStorage.getItem(this.context.auth.name + '_name') :name} 
            status={window.localStorage.getItem(this.context.auth.name + '_status') !== '' ? window.localStorage.getItem(this.context.auth.name + '_status') : status}/>)}
      </div>
      {this.state.showLoader && <div class="big ui active centered inline loader" style={{position:'relative',top:'20rem'}}></div>}
      <MonsterBtn/>    
      </>
    )
  }
}
export default CardProfile;
