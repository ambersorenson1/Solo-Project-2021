import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';

function Nav() {
  const user = useSelector((store) => store.user);

  return (
    <div className="nav"> 
      <Link to="/home">
        <h2 className="nav-title">B</h2><h2 className="nav-r">R</h2><h2 className="nav-e">E</h2><h2 className="nav-e">A</h2><h2 className="nav-e">T</h2><h2 className="nav-e">H</h2><h2>Eğ¨ğ¨</h2>
      </Link>
      <div>
        {/* If no user is logged in, show these links */}
        {!user.user_id &&
          // If there's no user, show login/registration links
          <Link className="navLink" to="/login">
            Login / Register
          </Link>
        }

        {/* If a user is logged in, show these links */}
        {user.user_id && (
          <>
            {/* <Link className="navLink" to="/user">
              Home
            </Link> */}

            {/* <Link className="navLink" to="/info">
              Info Page
            </Link> */}

            <LogOutButton className="navLink" />ğ¨
          </>
        )}

        <Link className="navLink" to="/about">
          About
        </Link>
        <Link className="navLink" to="/childspage">
          Child's Page
        </Link>
      </div>
    </div>
  );
}

export default Nav;
