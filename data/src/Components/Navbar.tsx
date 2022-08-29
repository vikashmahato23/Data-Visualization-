import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
// import { MdGraphicEq } from "react-icons/md";

function NavBar() {
  /* Close the drawer when the user clicks outside of it */
  const [openDrawer, toggleDrawer] = useState(false);
  const drawerRef = useRef(null);

  useEffect(() => {
    const closeDrawer = (event) => {
      if (drawerRef.current && drawerRef.current.contains(event.target)) {
        return;
      }

      toggleDrawer(false);
    };

    document.addEventListener("mousedown", closeDrawer);
    return () => document.removeEventListener("mousedown", closeDrawer);
  }, []);

  return (
    <Navbar.Wrapper>
      <Navbar.Logo>
        <Link className="link" to="/">
          <p className="logo">
            <span style={{ fontWeight: "bold" }}>
              {/* <MdGraphicEq /> Launch */}
            </span>
            <span
              style={{
                fontStyle: "italic",
                fontFamily: "PlayFair Display, sans-serif",
                color: "#37BC96"
              }}
            >
              House
            </span>
          </p>
        </Link>
      </Navbar.Logo>

      <HamburgerButton.Wrapper onClick={() => toggleDrawer(true)}>
        <HamburgerButton.Lines />
      </HamburgerButton.Wrapper>

      <Navbar.Items ref={drawerRef} openDrawer={openDrawer}>
        <Navbar.Item>
          <Link className="link" to="/menu">
            Menu
          </Link>
        </Navbar.Item>
        <Navbar.Item>
          <Link className="link" to="/dining-rooms">
            Dining Room
          </Link>
        </Navbar.Item>
        <Navbar.Item>
          <Link className="link" to="/gifts">
            Gifts
          </Link>
        </Navbar.Item>
      </Navbar.Items>
    </Navbar.Wrapper>
  );
}

//Styled Components
const Navbar = {
  Wrapper: styled.nav`
    position: fixed;
    z-index: 2;
    flex: 1;
    align-self: flex-start;
    padding: 1rem 3rem;
    height: 5rem;
    width: 100%;
    margin: 0 auto;

    display: flex;
    justify-content: space-between;
    align-items: center;

    background-color: white;
    box-shadow: 0 0.75rem 0.5rem -0.5rem rgba(0, 0, 0, 0.2);

    //40em == 640px
    @media only screen and (max-width: 40em) {
      position: fixed;
      z-index: 2;
      width: 100vw;
      top: 0;
    }
  `,

  Logo: styled.h1`
    position: relative;
    top: 5px;
    padding: 0 1rem 0 0;
    color: black;
  `,

  Items: styled.ul`
    display: flex;
    list-style: none;

    @media only screen and (max-width: 40em) {
      position: fixed;
      right: 0;
      top: 0;

      height: 100%;

      flex-direction: column;

      background-color: #ffffff;
      padding: 1rem 2rem;

      transition: 0.2s ease-out;

      transform: ${({ openDrawer }) =>
        openDrawer ? `translateX(0)` : `translateX(100%)`};
    }
  `,

  Item: styled.li`
    position: relative;
    top: 5px;
    padding: 0 1rem;
    cursor: pointer;

    @media only screen and (max-width: 40em) {
      padding: 1rem 0;
    }
  `
};

const HamburgerButton = {
  Wrapper: styled.button`
    height: 3rem;
    width: 3rem;
    position: relative;
    font-size: 12px;

    display: none;

    @media only screen and (max-width: 40em) {
      display: block;
    }

    /* Remove default button styles */
    border: none;
    background: transparent;
    outline: none;

    cursor: pointer;

    &:after {
      content: "";
      display: block;
      position: absolute;
      height: 150%;
      width: 150%;
      top: -25%;
      left: -25px;
    }
  `,

  Lines: styled.div`
    top: 50%;
    margin-top: -0.125em;

    &,
    &:after,
    &:before {
      height: 2px;
      pointer-events: none;
      display: block;
      content: "";
      width: 100%;
      background-color: #000000;
      position: absolute;
    }

    &:after {
      /* Move bottom line below center line */
      top: -0.8rem;
    }

    &:before {
      /* Move top line on top of center line */
      top: 0.8rem;
    }
  `
};

export default NavBar;
