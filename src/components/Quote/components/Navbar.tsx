/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";
import { mediaUrl } from "../global/helpers";

const extractLogo = (data: any): string => {
  if (data.agency && data.agency.logo) {
    return mediaUrl(data.agency.logo);
  }

  return "https://www.takeoffgo.com/images/logo.png";
};

const Navbar = ({ data }: any) => {
  const [showMenu, setShowMenu] = React.useState(false);

  const toggleMenu = () => setShowMenu(!showMenu);

  return <>
    <section className="section is-only-print">
      <img src={extractLogo(data)} style={{ height: 40 }} alt="" />
    </section>
    <nav className="navbar is-dark is-hidden-print">
      <div className="container">
        <div className="navbar-brand">
          <Link href="/" className="navbar-item">

            <img src={extractLogo(data)} height="20" alt="" />

          </Link>
          <button
            role="button"
            className={[
              "navbar-burger button is-dark",
              showMenu ? "is-active" : "",
            ].join(" ")}
            onClick={toggleMenu}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </div>
        <div
          className={["navbar-menu", showMenu ? "is-active" : ""].join(" ")}
        >
          <div className="navbar-start">
            <a
              className="navbar-item is-hidden-mobile"
              href="#summarised-itinerary"
            >
              Summarised itinerary
            </a>
            <a className="navbar-item" href="#detailed-itinerary">
              Detailed itinerary
            </a>
            <a className="navbar-item" href="#accommodation">
              Accommodation
            </a>
            {data.consultant && (
              <a className="navbar-item" href="#contact">
                Contact
              </a>
            )}
            {data.type === "quote" && (
              <>
                <a className="navbar-item" href="#finance">
                  Finances
                </a>
                <a className="navbar-item" href="#terms">
                  Terms and conditions
                </a>
              </>
            )}
          </div>
          <div className="navbar-end" />
        </div>
      </div>
    </nav>
  </>;
};

export default Navbar;
