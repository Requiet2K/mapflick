import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarespace } from "@fortawesome/free-brands-svg-icons";
import { NavLink, Link } from "react-router-dom";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import "../css/navbar.css";

function Navbar({className, setY}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const showMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > setY) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [setY]);

  return (
    <>
      <nav className={`navbar p-3 ${className} ${isScrolled ? "scroll-active" : ""}`}>
        <div className="container">
          <div className="nav-left-item d-flex align-items-center">
            <div className="navbar-brand fs-2">
              <NavLink to="/" className="d-flex align-items-center text-decoration-none">
                <FontAwesomeIcon
                  icon={faSquarespace}
                  className="logo"
                  beatFade
                />
                <div className="navbar-brand-item ms-3">
                  <p>Mapflick.com</p>
                </div>
              </NavLink>
            </div>
          </div>
          <button onClick={showMenu} className="menu btn btn-outline-warning">
            <FontAwesomeIcon className="menu-icon" icon={faBars} />
          </button>
          <div
            className={`nav-right-item gap-4 ${
              isOpen ? "nav-right-column" : "display-none"
            }`}
          >
            <NavLink className="nav-links" to="/urunler" state={{ mapFocus: false }}>
              Haritalar
            </NavLink>
            <NavLink
              className={`nav-links order ${isScrolled ? "order-2" : ""}`}
              to="/siparis"

            >
              Sipariş Ver
            </NavLink>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
