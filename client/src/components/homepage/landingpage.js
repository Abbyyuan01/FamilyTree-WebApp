//landingpage.js showcases the home page that viewers will see before they login to view artifacts. The landing page is still a work in
//progress but it is most likely to showcase the highlights of Family Tree either in word form or in video form, for ease of the user.

import React, { Component } from "react";
import { Grid, Cell } from "react-mdl";
import HomeNav from './navbar/homeNav';

class Landing extends Component {
  render() {
    return (
      <div>
         <HomeNav />
         <br/>
      <div style={{ width: "100%", margin: "auto" }}>
        <Grid className="landing-grid">
          <Cell col={12}>
            <img
              src="https://image.flaticon.com/icons/svg/122/122892.svg"
              alt="avatar"
              className="avatar-img"
            />

            <div className="banner-text">
              <h1>Family Tree</h1>

              <hr />

              <p>Take care of your family's future today</p>

              <div className="social-links">
                {/* LinkedIn */}
                <a
                  href="http://google.com"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <i className="fa fa-linkedin-square" aria-hidden="true" />
                </a>

                {/* Github */}
                <a
                  href="http://google.com"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <i className="fa fa-github-square" aria-hidden="true" />
                </a>

                {/* Freecodecamp */}
                <a
                  href="http://google.com"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <i className="fa fa-free-code-camp" aria-hidden="true" />
                </a>

                {/* Youtube */}
                <a
                  href="http://google.com"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <i className="fa fa-youtube-square" aria-hidden="true" />
                </a>
              </div>
            </div>
          </Cell>
        </Grid>
      </div>
      </div>
    );
  }
}

export default Landing;
