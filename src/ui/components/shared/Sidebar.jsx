import React from "react";
import PropTypes from "prop-types";
import "./Sidebar.css";

const CollapsableSidebar = props => {
  return props.visible === false ? (
    <Logo onClick={props.onClick} />
  ) : (
    <Sidebar {...props} />
  );
};

const Logo = ({ onClick }) => (
  <img
    className="play-logo"
    src="/play-logo.png"
    alt="Play antropoloops"
    onClick={onClick}
  />
);

const Sidebar = ({ children, onClick, actions, header }) => (
  <div className="Sidebar">
    <header>
      <Logo onClick={onClick} />
      {header && header()}
    </header>
    <section className="main">{children}</section>
    {actions && <section className="actions">{actions()}</section>}
  </div>
);
Sidebar.propTypes = {
  className: PropTypes.string
};
export default CollapsableSidebar;
