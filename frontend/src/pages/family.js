import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import CreateFamilyPage from "./createfamily";
import FamilyNav from "../components/family/FamilyNav";
import FamilyMain from "../components/family/familyMain";
import { Link } from "react-router-dom";
import NavbarMain from "../components/navbar/navbarmain";
import LoadingPage from "../Loading";
import "../components/family/family.css";
import { initGA, PageView } from "../components/tracking/index";

class FamilyPage extends Component {
  state = {
    family: undefined,
  };
  CancelToken = axios.CancelToken;
  source = this.CancelToken.source();
  abortController = new AbortController();
  componentDidMount() {
    initGA();
    PageView();
    Promise.all([
      axios
        .get("/api/getfamily", { cancelToken: this.source.token })
        .then((result) => this.setState({ family: result.data }))
        .catch((error) => {
          console.log(error);
        }),
      axios
        .get("/api/verify/user")
        .then((res) =>
          res.data === true ? this.props.verify() : this.props.unverify()
        ),
    ]);
  }

  componentWillUnmount() {
    this.source.cancel("Operation canceled by the user.");
  }

  render() {
    if (this.props.verified === false) {
      return (
        <React.Fragment>
          <NavbarMain />
          <div className="verifyWrapper">
            <div style={{ textAlign: "center" }}>
              <div className="verifyHeader" style={{ marginBottom: 10 }}>
                You must verify your account before joining a family
              </div>
              <Link className="verifyButton" to="/">
                Return to dashboard
              </Link>
            </div>
          </div>
        </React.Fragment>
      );
    } else if (this.state.family === undefined) {
      return <LoadingPage />;
    } else if (this.state.family === false) {
      return <CreateFamilyPage />;
    } else {
      return (
        <React.Fragment>
          <div style={{ height: "maxContent" }}>
            <NavbarMain anchor />
          </div>
          <div id="familyWrapper">
            <div>
              <FamilyNav />
            </div>
            <div>
              <FamilyMain />
            </div>
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(FamilyPage);
