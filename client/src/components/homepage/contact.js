//contact.js is a page that displays all the contact information of the Family Tree creaters so clients may get in touch
//to solve any problems or create new accounts

import React, { Component } from "react";
import { Grid, Cell, List, ListItem, ListItemContent } from "react-mdl";
import HomeNav from './navbar/homeNav';

class Contact extends Component {
  render() {
    return (
      <div>
      <HomeNav />
      <br/>
      <div className="contact-body">
        <Grid className="contact-grid">
          <Cell col={6}>
            <h2>Family Tree</h2>
            <img
              src="https://image.flaticon.com/icons/svg/1504/1504315.svg"
              alt="avatar"
              style={{ height: "250px" }}
            />
            <p style={{ width: "75%", margin: "auto", paddingTop: "1em" }}>
              At Family Tree, we aim to guide each family through from
              generation to generation. And we will always be at your service.
              Contact us if you need any help or guidance and our service team
              will be more than happy to help. We look forward to always being
              there for your family.
            </p>
          </Cell>
          <Cell col={6}>
            <h2>Contact Us</h2>
            <hr />

            <div className="contact-list">
              <List>
                <ListItem>
                  <ListItemContent
                    style={{ fontSize: "30px", fontFamily: "Anton" }}
                  >
                    <i className="fa fa-phone-square" aria-hidden="true" />
                    (123) 456-7890
                  </ListItemContent>
                </ListItem>

                <ListItem>
                  <ListItemContent
                    style={{ fontSize: "30px", fontFamily: "Anton" }}
                  >
                    <i className="fa fa-fax" aria-hidden="true" />
                    (123) 456-7890
                  </ListItemContent>
                </ListItem>

                <ListItem>
                  <ListItemContent
                    style={{ fontSize: "30px", fontFamily: "Anton" }}
                  >
                    <i className="fa fa-envelope" aria-hidden="true" />
                    someone@example.com
                  </ListItemContent>
                </ListItem>

                <ListItem>
                  <ListItemContent
                    style={{ fontSize: "30px", fontFamily: "Anton" }}
                  >
                    <i className="fa fa-skype" aria-hidden="true" />
                    MySkypeID
                  </ListItemContent>
                </ListItem>
              </List>
            </div>
          </Cell>
        </Grid>
      </div>
      </div>
    );
  }
}

export default Contact;
