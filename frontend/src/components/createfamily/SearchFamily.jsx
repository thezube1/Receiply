import React, { Component } from "react";
import FamilyChoice from "./FamilyChoice";
import queryString from "query-string";
import { isEqual } from "lodash";
import NavbarMain from "../navbar/navbarmain";
import axios from "axios";
import { ToggleButtonGroup, ToggleButton, Nav } from "react-bootstrap";
import LoadingPage from "../../Loading";

class SearchFamily extends Component {
  state = {
    query: undefined,
    check: false,
    families: [
      {
        FAMILY_ID: "sdfewofj4g509290dsasdsad",
        FAMILY_NAME: "Habibuddin Family",
        FIRST_NAME: "Salone",
        LAST_NAME: "Habibuddin",
        FAMILY_IDENTIFIER: "5235",
      },
      {
        FAMILY_ID: "sdfewofsdfsdfdsfsasdsad",
        FAMILY_NAME: "Hydrie Family",
        FIRST_NAME: "Zubin",
        LAST_NAME: "Hydrie",
        FAMILY_IDENTIFIER: "3455",
      },
      {
        FAMILY_ID: "sdfewofj4g509290dsasdsad",
        FAMILY_NAME: "Habibuddin Family",
        FIRST_NAME: "Salone",
        LAST_NAME: "Habibuddin",
        FAMILY_IDENTIFIER: "5235",
      },
      {
        FAMILY_ID: "sdfewofsdfsdfdsfsasdsad",
        FAMILY_NAME: "Hydrie Family",
        FIRST_NAME: "Zubin",
        LAST_NAME: "Hydrie",
        FAMILY_IDENTIFIER: "3455",
      },
      {
        FAMILY_ID: "sdfewofj4g509290dsasdsad",
        FAMILY_NAME: "Habibuddin Family",
        FIRST_NAME: "Salone",
        LAST_NAME: "Habibuddin",
        FAMILY_IDENTIFIER: "5235",
      },
      {
        FAMILY_ID: "sdfewofsdfsdfdsfsasdsad",
        FAMILY_NAME: "Hydrie Family",
        FIRST_NAME: "Zubin",
        LAST_NAME: "Hydrie",
        FAMILY_IDENTIFIER: "3455",
      },
      {
        FAMILY_ID: "sdfewofj4g509290dsasdsad",
        FAMILY_NAME: "Habibuddin Family",
        FIRST_NAME: "Salone",
        LAST_NAME: "Habibuddin",
        FAMILY_IDENTIFIER: "5235",
      },
      {
        FAMILY_ID: "sdfewofsdfsdfdsfsasdsad",
        FAMILY_NAME: "Hydrie Family",
        FIRST_NAME: "Zubin",
        LAST_NAME: "Hydrie",
        FAMILY_IDENTIFIER: "3455",
      },
    ],
  };

  componentDidMount() {
    const parsed = queryString.parse(this.props.location.search, {
      arrayFormat: "comma",
    });
    if (this.state.check === false) {
      this.setState({ query: parsed, check: true });
    }
  }

  componentDidUpdate(previousProps, previousState) {
    const parsed = queryString.parse(this.props.location.search, {
      arrayFormat: "comma",
    });
    if (isEqual(parsed, previousState.query) === false) {
      this.setState({ query: parsed });
      /*
      axios
        .post("/api/family/search", parsed)
        .then((res) => this.setState({ families: res.data }))
        .catch((err) => console.log(err));
        */
    }
  }

  render() {
    if (this.state.families === undefined) {
      return <LoadingPage />;
    }
    return (
      <React.Fragment>
        <NavbarMain />
        <div id="searchFamilyWrapper">
          <div id="searchFamilyContent">
            <ToggleButtonGroup
              type="radio"
              name="selectFamily"
              id="searchFamilyGroup"
            >
              {this.state.families.map((item, index) => {
                return (
                  <ToggleButton
                    variant="light"
                    key={index}
                    className="searchFamilyItem"
                  >
                    <FamilyChoice
                      family={item.FAMILY_NAME}
                      identifier={`#${item.FAMILY_IDENTIFIER}`}
                      creator={item.FIRST_NAME + " " + item.LAST_NAME}
                    />
                  </ToggleButton>
                );
              })}
            </ToggleButtonGroup>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default SearchFamily;
