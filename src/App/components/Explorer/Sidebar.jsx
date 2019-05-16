import React from "react";
import PropTypes from "prop-types";

const Logo = ({ onClick }) => (
  <img
    className="play-logo"
    src="/play-logo.png"
    alt="Play antropoloops"
    onClick={onClick}
  />
);

const Sidebar = ({ children, onClick }) => (
  <div className="Sidebar">
    <header>
      <Logo onClick={onClick} />
    </header>
    <section className="main">{children}</section>
  </div>
);
Sidebar.propTypes = {
  className: PropTypes.string
};
export default props => (props.closed ? Logo(props) : Sidebar(props));
