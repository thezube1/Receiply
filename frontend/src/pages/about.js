import React, { Component } from "react";
import NavbarSwitch from "../components/navbar/navbarswitch";
import IndexBar from "../components/indexbar/IndexBar";
import "../components/about/about.css";

class AboutPage extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <NavbarSwitch />
        <div id="aboutWrapper">
          <div id="aboutContent">
            <div className="aboutHeader">About us</div>
            <div className="aboutText">
              Receiply is a free recipe sharing website, with a twist. Say your
              family has recipes passed down between generations, but you have
              no place to securely keep them. Receiply is your solution. We make
              it easy for families to keep their recipes safe, and easily
              accessible. All you must do is sign up and start adding recipes.
              Our process for uploading recipes is streamlined so that you do
              not have to spend extra time trying to figure out how to get
              started. We are focused on keeping your recipes safe and secure
              from prying eyes. No account or recipe information will ever be
              intentionally leaked or sold. Say goodbye to your stacks of recipe
              books and lengthy group chats! All your family cooking needs can
              be taken care of here, with Receiply.
              <br />
              <br />
              Receiply was created by Zubin Hydrie, an avid programmer and high
              school student.
            </div>
          </div>
        </div>
        <IndexBar bottom />
      </React.Fragment>
    );
  }
}

export default AboutPage;
