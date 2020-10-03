import React, { Component } from "react";
import "../components/upload/upload.css";
import { Switch, Route, Link } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import UploadPhoto from "../components/upload/uploadPhoto/UploadPhoto";
import NavbarMain from "../components/navbar/navbarmain";
import UploadManual from "../components/upload/uploadManual/uploadManual";

class UploadPage extends Component {
  state = {
    verified: undefined,
  };

  componentDidMount() {
    axios
      .get("/api/verify/user")
      .then((res) =>
        res.data === true ? this.props.verify() : this.props.unverify()
      );
  }
  render() {
    if (this.props.verified === false) {
      return (
        <React.Fragment>
          <NavbarMain />
          <div className="verifyWrapper">
            <div style={{ textAlign: "center" }}>
              <div className="verifyHeader" style={{ marginBottom: 10 }}>
                You must verify your account before uploading a recipe
              </div>
              <Link className="verifyButton" to="/">
                Return to dashboard
              </Link>
            </div>
          </div>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <Switch>
            <Route path="/upload/photo" component={UploadPhoto} />
            <Route path="/upload/manual" component={UploadManual} />
            <React.Fragment>
              <NavbarMain />
              <div id="uploadHubWrapper">
                <div>
                  <span className="uploadHubHeader">
                    Choose your upload method
                  </span>
                </div>
                <div id="uploadHubLinkWrapper">
                  <Link to="/upload/photo" style={{ textDecoration: "none" }}>
                    <div className="uploadHubLink">From photo</div>
                  </Link>
                  <Link to="/upload/manual" style={{ textDecoration: "none" }}>
                    <div className="uploadHubLink">Manual entry</div>
                  </Link>
                </div>
              </div>
            </React.Fragment>
          </Switch>
        </React.Fragment>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    verified: state.verify_reducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    verify: () => dispatch({ type: "VERIFIED" }),
    unverify: () => dispatch({ type: "UNVERIFIED" }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadPage);
