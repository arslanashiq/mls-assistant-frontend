"use client";

import MainMenu from "@/components/common/MainMenu";
import SidebarPanel from "@/components/common/sidebar-panel";
import LoginSignupModal from "@/components/common/login-signup-modal";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useAppContext } from "@/custom-hooks/AppContext";
import DashbaordHeaderProfile from "@/components/common/DashbaordHeaderProfile";

const Header = () => {
  const { isLoggedIn, handleOpenLoginModal, currentDomain, isDomainAvailable, proUsername, isProUser, matchedJsonObject } = useAppContext();
  console.log(currentDomain, isDomainAvailable, proUsername, isProUser, matchedJsonObject);
  const [navbar, setNavbar] = useState(false);

  const changeBackground = () => {
    if (window.scrollY >= 10) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeBackground);
    return () => {
      window.removeEventListener("scroll", changeBackground);
    };
  }, []);
  const [showNavbar, setShowNavbar] = useState(false);
    const toggleNavbar = () => {
    setShowNavbar(!showNavbar);
  };
  return (
    <>
      <nav className='navbar navbar-expand-md navbar-dark theme bgColor lightFontColor'>
        <Link className="navbar-brand" href="/">
          {isProUser || isDomainAvailable ? (
            matchedJsonObject && matchedJsonObject.logo ? (
              <img
                src={`/${matchedJsonObject.logo}`}
                alt="MLS Assistant"
                width={'200px'}
              />
            ) : (
              <img
                src="/images/mls-assistant-white.png"
                alt="MLS Assistant"
                width={'70px'}
              />
            )
          ) : (
            <img
              src="/images/mls-assistant-white.png"
              alt="MLS Assistant"
              width={'70px'}
            />
          )}

        </Link>


        <div className={`collapse navbar-collapse ${showNavbar ? 'show' : ''}`} id='navbarCollapse'>
          <ul className='navbar-nav mr-auto'>
            <li className='nav-item active'>
              <Link href={`/`} className='nav-link'>
                  Home
              </Link>
            </li>
            <li className='nav-item active'>
              <Link href={`/properties`} className='nav-link'>
                Properties
              </Link>
            </li>
          </ul>

          <ul className='navbar-nav ml-auto'>
            <li className='nav-item'>
              {!isLoggedIn ? (
                <a href="#" className="login-info d-flex align-items-center nav-link" role="button" onClick={handleOpenLoginModal}>
                  <i className="far fa-user-circle fs-5 me-2" /> Login
                </a>
              ) : null}
            </li>
            <li className='nav-item'>
              {!isLoggedIn ? (
                <a href="#" className="sign-up nav-link" role="button" onClick={handleOpenLoginModal}>
                  Sign Up
                </a>
              ) : null}
            </li>
          </ul>
        </div>
        <div className="d-flex">
          {isLoggedIn && <DashbaordHeaderProfile />}
          <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarCollapse' aria-controls='navbarsExampleDefault' aria-expanded='false' aria-label='Toggle navigation' onClick={toggleNavbar}>
            <span className='navbar-toggle-icon'></span>
            <span className='navbar-toggle-icon'></span>
            <span className='navbar-toggle-icon'></span>
          </button>
        </div>
      </nav>
      <div className="signup-modal">
        <div
          className="modal fade"
          id="loginSignupModal"
          tabIndex={-1}
          aria-labelledby="loginSignupModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog  modal-dialog-scrollable modal-dialog-centered">
            <LoginSignupModal />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
