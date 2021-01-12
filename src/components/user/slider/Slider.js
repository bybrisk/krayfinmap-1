import React, { useRef } from "react";
import Logo from '../../../Assets/logo.png';
import Login from '../../../views/user/login';
import Signup from '../../../views/user/register';
import "./Slider.css";


const Slider = () => {
  const signupcontainer = useRef(null);
  const handleSignupClick = () => {
    signupcontainer.current.classList.remove("right-panel-active");

    // signupcontainer.current.className.add('right-panel-active');
  };
  const handleLoginClick = () => {
    signupcontainer.current.classList.add("right-panel-active");
    // signupcontainer.current.className.remove('right-panel-active');
    // console.log()
  };
  return (
    <div class="sliderContainer">
    <div class="logincontainer" id="container" ref={signupcontainer}>
      <div class="form-container sign-up-container">
        <Signup clickHandler={handleSignupClick} />
      </div>
      <div class="form-container sign-in-container">
        <Login clickHandler={handleLoginClick} />
      </div>

      <div class="overlay-container">
        <div class="overlay">
          <div class="overlay-panel overlay-left">
            <h1>Welcome</h1>
            <div style={{background:'#ffffff',height:'max-content',width:'max-content',padding:20,borderRadius:'50%',display:'flex',justifyContent:'center',alignItems:'center'}}>
            <img src={Logo} style={{maxWidth:140}} alt={"Krayfin Map"}/>
</div>
          </div>
          <div class="overlay-panel overlay-right">
          <h1>Welcome</h1>
<div style={{background:'#ffffff',height:'max-content',width:'max-content',borderRadius:'50%',padding:20,display:'flex',justifyContent:'center',alignItems:'center'}}>
          <img src={Logo} style={{maxWidth:140}} alt={"Krayfin Map"}/>
</div>
            </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Slider;
