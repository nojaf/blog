import React from 'react';
import logo from "../../content/assets/nojaf_white_web.png";

export default () => {
  return <nav className="animated fadeIn navigation">
    <div className="container">
      <a href="http://blog.nojaf.com" className="text-right sidebar brand">

      </a>
      <a href="http://blog.nojaf.com" className="text-right sidebar brand">
        <img src={logo} alt="nojaf.com" />
      </a>

      <a className="teal content" href="/about-nojaf-com">About</a>
      <a className="teal content" href="/contact-nojaf-com">Contact</a>
    </div>
  </nav>
}