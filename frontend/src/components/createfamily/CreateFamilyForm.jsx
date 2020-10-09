import React, { Component } from "react";
import NavbarMain from "../navbar/navbarmain";
import { ToggleButtonGroup, ToggleButton } from "react-bootstrap";
import SearchFamily from "./SearchFamily";
import { Route, Switch, Link } from "react-router-dom";
import axios from "axios";
import LoadingPage from "../../Loading";
import "./createfamily.css";

import FamilyChoice from "./FamilyChoice";

class CreateFamilyForm extends Component {
  state = {
    name: undefined,
    families: undefined,
    value: undefined,
    createName: "",
    check: false,
  };

  CancelToken = axios.CancelToken;
  source = this.CancelToken.source();
  abortController = new AbortController();

  componentDidMount() {
    document.body.style.backgroundColor = "rgb(136, 228, 138)";
    Promise.all([
      axios
        .get("/api/getname", { cancelToken: this.source.token })
        .then((response) => this.setState({ name: response.data })),
      axios
        .get("/api/family/find", { cancelToken: this.source.token })
        .then((response) => this.setState({ families: response.data })),
    ]);
  }

  handleChange = (event) => {
    this.setState({ value: event });
  };

  handleInput = (inputType) => (event) => {
    this.setState({ [inputType]: event.target.value });
  };

  handleCreate = () => {
    const data = {
      family: [this.state.createName],
    };
    if (this.state.createName.length === 0) {
      console.log("One or more fields is empty");
    } else {
      axios
        .post("/api/family/add", data)
        .then((res) => this.setState({ check: res.data }));
    }
  };

  handleJoin = () => {
    const data = {
      FAMILY_ID: this.state.families[this.state.value].FAMILY_ID,
    };
    axios.post("/api/family/request", data);
  };

  renderChoiceButton = () => {
    if (this.state.value === undefined) {
    } else {
      return (
        <span>
          <input
            className="createFamilyButton"
            type="button"
            value="Request to join"
            onClick={this.handleJoin}
          />
        </span>
      );
    }
  };

  renderChoice = () => {
    if (this.state.families.length !== 0) {
      return (
        <React.Fragment>
          <div id="createFamIntro" className="createFamThinText">
            Here are some families we found for you
          </div>
          <ToggleButtonGroup
            id="familyChoiceOrder"
            type="radio"
            name="selectFamily"
            onChange={this.handleChange}
          >
            {this.state.families.map((item, index) => (
              <ToggleButton
                variant="light"
                className="createFamilyChoiceWrapper"
                key={item.FAMILY_CREATOR}
                value={index}
              >
                <FamilyChoice
                  family={item.FAMILY_NAME}
                  identifier={`#${item.FAMILY_IDENTIFIER}`}
                  creator={`${item.FIRST_NAME} ${item.LAST_NAME}`}
                />
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
          {this.renderChoiceButton()}
          <div id="createFamilyOR" className="createFamBoldText">
            OR
          </div>
        </React.Fragment>
      );
    } else {
      return (
        <div id="createFamilyOR" className="createFamBoldText">
          Search or create a family
        </div>
      );
    }
  };

  componentWillUnmount() {
    document.body.style.backgroundColor = "white";
    this.source.cancel("Operation canceled by the user.");
  }

  render() {
    if (this.state.name === undefined || this.state.families === undefined) {
      return <LoadingPage />;
    } else {
      return (
        <Switch>
          <Route path="/family/search" component={SearchFamily} />
          <div id="createFam">
            <NavbarMain />
            <div id="createFamWrapper">
              <div>
                <div id="createFamContent">
                  {this.state.check === false ? (
                    <React.Fragment>
                      {this.renderChoice()}

                      <div id="createFamilyBottom">
                        <div>
                          <div className="createFamThinText">
                            Search for family
                          </div>
                          <input
                            className="createFamInput"
                            type="text"
                            placeholder="Search for family"
                          />
                          <div>
                            <input
                              id="createFamilyBottomButton"
                              className="createFamilyButton"
                              type="button"
                              value="Search"
                            />
                          </div>
                        </div>
                        <div id="createFamilyBottomSeperator"></div>
                        <div>
                          <div className="createFamThinText">Create family</div>
                          <input
                            className="createFamInput"
                            type="text"
                            placeholder="Enter name of family"
                            defaultValue={this.state.name.LAST_NAME}
                            onChange={this.handleInput("createName")}
                          />
                          <div>
                            <input
                              id="createFamilyBottomButton"
                              className="createFamilyButton"
                              type="button"
                              value="Create"
                              onClick={this.handleCreate}
                            />
                          </div>
                        </div>
                      </div>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <div
                        className="createFamThinText"
                        style={{ fontSize: 30 }}
                      >
                        Created family
                      </div>
                      <Link
                        to="/"
                        className="createFamilyButton"
                        style={{ color: "white", textDecoration: "none" }}
                      >
                        Return to dashboard
                      </Link>
                    </React.Fragment>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Switch>
      );
    }
  }
}

export default CreateFamilyForm;
