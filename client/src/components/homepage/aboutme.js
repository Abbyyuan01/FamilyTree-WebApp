import React, { Component } from "react";
import HomeNav from './navbar/homeNav';

class About extends Component {
  render() {
    return (
      <div>
      <HomeNav />
      <br/> 
      <div class="team-section">
        <h1>Our Team</h1>
        <span class="border"></span>
        <div class="ps">
          <a href="#p1">
            <img src="p1.png" alt="" />
          </a>
          <a href="#p2">
            <img src="p2.png" alt="" />
          </a>
          <a href="#p3">
            <img src="p3.png" alt="" />
          </a>
        </div>
        <div class="section" id="p1">
          <span class="name">Yuan Yuan</span>
          <span class="border"></span>
          <p>
            Yuan Yuan is a certified marketing individual with 79 years of
            experience in financial and social marketing. Her beyond amazing
            people skills are what makes her right for any job. She is fierce,
            determined and loyal.
          </p>
        </div>
        <div class="section" id="p2">
          <span class="name">Iris Tang</span>
          <span class="border"></span>
          <p>
            Iris Tang is a martial arts teacher with 17 million years of family
            knowledge pased down to her. She will not only be able to kick your
            butt but also kick your neighbour's butt by just thinking about it.
            Hire Iris now as a personal instructor or bodyguard.
          </p>
        </div>
        <div class="section" id="p3">
          <span class="name">Nisha SV Lingam</span>
          <span class="border"></span>
          <p>Nisha is aite.</p>
        </div>
      </div>
      </div>
    );
  }
}

export default About;
