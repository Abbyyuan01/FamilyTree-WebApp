import React, { Component } from "react";
import "../../../css/App.css";
import { Layout, Header, Navigation, Drawer, Content } from "react-mdl";
import { BrowserRouter, Link } from "react-router-dom";

class HomeNav extends Component {
  render() {
    return (
      <div className="demo-big-content">
          <Layout>
            <Header
              className="header-color"
              title={
                <Link style={{ textDecoration: "none", color: "white" }} to="/">
                  Family Tree
                </Link>
              }
              scroll
            >
              <Navigation>
                <Link to="/aboutme">About Me</Link>
                <Link to="/projects">Projects</Link>
                <Link to="/contact">Contact</Link>
                <Link to="/contactus">Contact Us</Link>
              </Navigation>
            </Header>
            {/* <Drawer
              title={
                <Link style={{ textDecoration: "none", color: "black" }} to="/">
                  Family Tree
                </Link>
              }
            >
              <Navigation>
                <Link to="/aboutme">About Me</Link>
                <Link to="/projects">Projects</Link>
                <Link to="/contact">Contact</Link>
                <Link to="/contactus">Contact Us</Link>
              </Navigation>
            </Drawer> */}
          </Layout>
      </div>
    );
  }
}

export default HomeNav;
