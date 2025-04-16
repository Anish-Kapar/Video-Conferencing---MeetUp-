import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';
import './LoginPage.jsx';


function HomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    const toggleSidebar = () => {
      document.querySelector('.part1').classList.toggle('active');
    };

    document.querySelector('.hamburger-menu')?.addEventListener('click', toggleSidebar);

    const updateTimeAndDate = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12;
      const formattedTime = `${hours}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`;

      const options = { day: '2-digit', month: 'long', year: 'numeric' };
      const formattedDate = now.toLocaleDateString('en-US', options);

      const timeEl = document.getElementById('currentTime');
      const dateEl = document.getElementById('currentDate');

      if (timeEl) timeEl.innerText = formattedTime;
      if (dateEl) dateEl.innerText = formattedDate;
    };

    const interval = setInterval(updateTimeAndDate, 1000);
    updateTimeAndDate();

    return () => {
      clearInterval(interval);
      document.querySelector('.hamburger-menu')?.removeEventListener('click', toggleSidebar);
    };
  }, []);

  const handleNavigate = () => {
    navigate('/lobby');
  };

  const handleRedirect = () => {
    navigate('/login'); // or whatever route you want
  };
  

  return (
    <>
      <section className="part1">
        <div className="sidebar">
          <div className="sidebar-logo">
            <img src="/img/Icon.svg" alt="" />
            <span>MeetUp</span>
          </div>
          <div className="sidebar-options">
            <a href="#"><img src="/img/Home.svg" alt="" /><span>Home</span></a>
            <a href="#"><img src="/img/fi_6825718.svg" alt="" /><span>Upcoming</span></a>
            <a href="#"><img src="/img/Video.svg" alt="" /><span>Recordings</span></a>
            <a href="#"><img src="/img/ic_round-plus.svg" alt="" /><span>Personal Room</span></a>
          </div>
        </div>
      </section>

      <section className="part2">
        <div className="nav">
          <div className="logo">
            <div className="hamburger-menu">
              ☰
              <img src="/img/Icon.svg" alt="" style={{ height: '45px' }} />
              <span>MeetUp</span>
            </div>
          </div>
          <div className="loginside">
            <button className="loginbtn" id="loginBtn" onClick={handleRedirect}>
              <i className="fa-regular fa-user"></i> Log-in
            </button>
          </div>
        </div>

        <div className="main-content">
          <div className="banner">
            <div className="time" id="currentTime"></div>
            <div className="date" id="currentDate"></div>
          </div>

          <div className="meetings">
            <div className="new-meeting" onClick={handleNavigate} style={{ cursor: 'pointer' }}>
              <div className="card-icon"><img src="/img/ic_round-plus.svg" alt="" /></div>
              <div className="card-detail">
                <p className="card-head">New Meeting</p>
                <p className="card-info">Start an instant meeting</p>
              </div>
            </div>

            <div className="join-meeting" onClick={handleNavigate} style={{ cursor: 'pointer' }}>
              <div className="card-icon"><img src="/img/ant-design_user-add-outlined.svg" alt="" /></div>
              <div className="card-detail">
                <p className="card-head">Join Meeting</p>
                <p className="card-info">via invitation link</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default HomePage;
