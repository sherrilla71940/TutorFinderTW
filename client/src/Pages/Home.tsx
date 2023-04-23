import React from 'react';
// import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Home () {
  const navigate = useNavigate();
  return (
    // <nav>
    //   <ul>
    //     <li>
    //       Tutor Finder
    //     </li>
    //     <li>
    //       Login
    //     </li>
    //     <li>
    //     <NavLink to="/register">register</NavLink>
    //     </li>
    //   </ul>
    // </nav>
    <>
      <div>
        <button onClick={() => navigate('register')}>Register</button>
      </div>
    </>
  );
}

export default Home;