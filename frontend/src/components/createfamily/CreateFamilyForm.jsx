import React, { Component } from "react";
import NavbarMain from "../navbar/navbarmain";
import { ToggleButtonGroup, ToggleButton } from "react-bootstrap";

import "./createfamily.css";
import axios from "axios";

import FamilyChoice from "./FamilyChoice";

class CreateFamilyForm extends Component {
  state = {
    families: [
      { family: "Marwaha Family", creator: "Damini Marwaha", value: 1 },
      { family: "Marwaha Family", creator: "Vivan Marwaha", value: 2 },
      { family: "Marwaha Family", creator: "Vishal Marwaha", value: 3 },
    ],
    value: undefined,
  };

  handleChange = (event) => {
    this.setState({ value: event });
  };

  handleCreate = () => {
    const data = {
      family: [this.state.name, this.state.desc],
    };
    if (this.state.name.length === 0 || this.state.desc.length === 0) {
      console.log("One or more fields is empty");
    } else {
      axios.post("/api/addfamily", data);
    }
  };

  render() {
    console.log(this.state.value);
    return (
      <div id="createFam">
        <NavbarMain />
        <div id="createFamWrapper">
          <div id="createFamContent">
            <div id="createFamIntro" className="createFamThinText">
              Here are some families we found for you
            </div>
            <ToggleButtonGroup
              id="familyChoiceOrder"
              type="radio"
              name="selectFamily"
              onChange={this.handleChange}
            >
              {this.state.families.map((item) => (
                <ToggleButton
                  variant="light"
                  className="createFamilyChoiceWrapper"
                  key={item.value}
                  value={item.value}
                >
                  <FamilyChoice family={item.family} creator={item.creator} />
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
            <span>
              <input
                id="createFamilyJoin"
                type="button"
                value="Request to join"
              />
            </span>
            <div id="createFamilyOR" className="createFamBoldText">
              OR
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateFamilyForm;
