import React, { Component } from "react";
import FamilyChoice from "./FamilyChoice";
import queryString from "query-string";
import { isEqual } from "lodash";
import NavbarMain from "../navbar/navbarmain";
import axios from "axios";
import { IoIosSearch } from "react-icons/io";
import { ButtonGroup, ToggleButton, Nav } from "react-bootstrap";
import LoadingPage from "../../Loading";
import { search } from "../../actions/actions";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class SearchFamily extends Component {
  state = {
    query: undefined,
    check: false,
    redirect: undefined,
    default: undefined,
    families: undefined,
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
    if (this.state.redirect !== undefined) {
      this.setState({ redirect: undefined });
    }
    const query = queryString.parse(window.location.search, {
      arrayFormat: "comma",
    });
    if (this.state.default !== query.s) {
      this.setState({ default: query.s });
    }
    const parsed = queryString.parse(this.props.location.search, {
      arrayFormat: "comma",
    });
    if (isEqual(parsed, previousState.query) === false) {
      this.setState({ query: parsed });

      axios
        .post("/api/family/search", parsed)
        .then((res) => this.setState({ families: res.data }))
        .catch((err) => console.log(err));
    }
  }

  handleSubmit = () => {
    const params = this.props.search.split(" ").join("-");
    this.setState({ redirect: `s=${params}` });
  };

  render() {
    if (this.state.families === undefined) {
      return <LoadingPage />;
    } else if (this.state.redirect !== undefined) {
      if (this.props.search === "") {
        return <Redirect to={"/family/search?s="} />;
      } else {
        return <Redirect to={`/family/search?${this.state.redirect}`} />;
      }
    } else {
      return (
        <React.Fragment>
          <NavbarMain />
          <div id="searchFamilyWrapper">
            <div id="searchFamilyContent">
              <div>
                <div id="searchBarWrapper">
                  <div id="searchBarHeaderWrapper">
                    <button
                      id="searchBarSubmit"
                      onClick={() => this.handleSubmit()}
                    >
                      <div id="searchBarHeader">Search</div>
                      <IoIosSearch id="searchBarIcon" />
                    </button>
                    <div id="searchBarInputWrapper">
                      <input
                        type="text"
                        id="searchBarInput"
                        onChange={(event) =>
                          this.props.write_search(event.target.value)
                        }
                        defaultValue={this.props.search}
                      />
                      <div id="searchBarBottom"></div>
                    </div>
                  </div>
                </div>
              </div>

              {this.state.families.length === 0 ? (
                <div id="searchFamilyNullWrapper">
                  <div id="searchFamilyNull">No families found</div>
                </div>
              ) : this.state.query.s === "" || this.state.families === false ? (
                <div id="searchFamilyNullWrapper">
                  <div id="searchFamilyNull">No search parameters provided</div>
                </div>
              ) : (
                <ButtonGroup toggle id="searchFamilyGroup">
                  {this.state.families.map((item, index) => {
                    return (
                      <ToggleButton
                        name="radio"
                        type="radio"
                        variant="light"
                        key={index}
                        className="searchFamilyItem"
                        value={index}
                        onChange={(event) =>
                          this.setState({ value: event.currentTarget.value })
                        }
                      >
                        <FamilyChoice
                          family={item.FAMILY_NAME}
                          identifier={`#${item.FAMILY_IDENTIFIER}`}
                          creator={item.FIRST_NAME + " " + item.LAST_NAME}
                        />
                      </ToggleButton>
                    );
                  })}
                </ButtonGroup>
              )}
            </div>
          </div>
        </React.Fragment>
      );
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    write_search: (event) => dispatch(search(event)),
  };
};

const mapStateToProps = (state) => {
  return {
    search: state.search,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchFamily);
