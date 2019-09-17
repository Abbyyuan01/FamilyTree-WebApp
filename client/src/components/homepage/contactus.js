import React, { Component } from "react";
import HomeNav from './navbar/homeNav';

class ContactUs extends Component {
  render() {
    return (
      <div>
       <HomeNav />
       <br/>
      <div class="contact-form">
        <h1>Contact Us</h1>
        <div class="txtb">
          <label>Full Name :</label>
          <input
            type="text"
            name=""
            value=""
            placeholder="Enter Your Full Name"
          ></input>
        </div>
        <div class="txtb">
          <label>Email :</label>
          <input
            type="email"
            name=""
            value=""
            placeholder="Enter Your Email"
          ></input>
        </div>
        <div class="txtb">
          <label>Phone Number :</label>
          <input
            type="text"
            name=""
            value=""
            placeholder="Enter Your Phone Number"
          ></input>
        </div>
        <div class="txtb">
          <label>Message :</label>
          <textarea></textarea>
        </div>
        <a class="btn">Send</a>
      </div>
      </div>
    );
  }
}

export default ContactUs;
