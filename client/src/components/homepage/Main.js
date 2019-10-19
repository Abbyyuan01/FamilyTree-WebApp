import React, { Component } from "react";
import Intro from "./sections/Intro";
import Tour from "./sections/Tour";
import Pricing from "./sections/Pricing";
import Contact from "./sections/Contact";
import About from "./sections/About";

class Main extends Component {
  render() {
    return (
      <main>
        <Intro />
        <Tour />
        <Pricing />
        <About />
        <Contact />
      </main>
    );
  }
}

export default Main;
