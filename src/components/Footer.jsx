import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDiscord,
  faSteam,
  faYoutube,
  faInstagram,
  faSquarespace,
} from "@fortawesome/free-brands-svg-icons";
import {
  faMapLocationDot,
  faCartShopping,
  faFireFlameCurved,
  faAt,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import "../css/footer.css";

function Footer({ className }) {
  return (
    <footer
      className={`page-footer ${className} d-flex justify-content-center`}
    >
      <div className="container">
        <div className="foot">
          <div className="orderP">
            <NavLink className="orderFoot" to="/siparis">
              Order
            </NavLink>
          </div>
          <div className="social mb-4">
            <a
              href="https://discord.gg/9fssmsxKaR"
              className="social-links"
              target="_blank"
            >
              <FontAwesomeIcon className="social-logo" icon={faDiscord} />
            </a>
            <a
              href="https://steamcommunity.com/id/beautycan/"
              className="social-links"
              target="_blank"
            >
              <FontAwesomeIcon className="social-logo" icon={faSteam} />
            </a>
            <a
              href="https://www.youtube.com/channel/UCr046vhiHjoj_m1D2pPd_PQ"
              target="_blank"
              className="social-links"
            >
              <FontAwesomeIcon className="social-logo" icon={faYoutube} />
            </a>
            <a
              href="https://www.youtube.com/channel/UCr046vhiHjoj_m1D2pPd_PQ"
              target="_blank"
              className="social-links"
            >
              <FontAwesomeIcon className="social-logo" icon={faInstagram} />
            </a>
          </div>
          <div className="links-section">
            <NavLink
              className="links"
              to="/urunler"
              state={{ mapFocus: true }}
            >
              Maps
            </NavLink>
            <p className="linksDot">•</p>
            <NavLink className="links" to="/siparis">
              Contact
            </NavLink>
            <p className="linksDot">•</p>
            <NavLink className="links" to="/" state={{ modalOpen: "x" }}>
              Videos
            </NavLink>
            <p className="linksDot">•</p>
            <NavLink
              className="links"
              to="https://github.com/Requiet2K"
              target="_blank"
              state={{ modalOpen: "x" }}
            >
              Requiet
            </NavLink>
          </div>
          <div className="terms text-center">
            Copyright © 2023 Mapflick | Tüm hakları saklıdır.
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
