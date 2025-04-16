import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css'; // External CSS file for styles

function LoginPage() {
    const navigate = useNavigate();
    const login = () => {
    
    // You can implement login logic here
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    console.log('Login attempt with:', username, password);
  };

  const handleRedirectagain = () => {
    navigate('/signup'); // or whatever route you want
  };

  return (
    <div className="login-body">

    
    <div className="container">
      <div className="sideimg">

        <img
          src="https://static.vecteezy.com/system/resources/previews/018/998/164/non_2x/video-call-conference-working-from-home-social-distancing-business-discussion-free-vector.jpg"
          alt="Side Image"
        />
      </div>

      <div className="form-container">
        <h2>LOGIN</h2>
        <form
          className="login-form"
          onSubmit={(e) => {
            e.preventDefault();
            login();
          }}
        >
          <input type="text" id="loginUsername" placeholder="Username" />
          <input type="password" id="loginPassword" placeholder="Password" />
          <button type="submit" className="loginbtn">Login</button>
        </form>

        <div className="signup-link">
          <p>
            Don't have an account? <a href="/signup" onClick={handleRedirectagain}>Sign Up</a>
          </p>
        </div>
      </div>
    </div>
    </div>
  );
}

export default LoginPage;
