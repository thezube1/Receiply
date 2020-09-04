import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Checkbox } from "@material-ui/core/";

class SearchFilterShare extends Component {
  state = {
    share: undefined,
  };

  handleChange = (type) => (event) => {
    if (this.state.share === event.target.value) {
      this.setState({
        [type]: undefined,
      });
    } else {
      this.setState({
        [type]: event.target.value,
      });
    }
  };

  handleUndefined = () => {
    if (this.state.share === undefined) {
      if (window.location.href.includes("shr") === true) {
        let newQuery = window.location.search;
        newQuery = newQuery.replace(`?shr=${this.props.query.shr}`, "");
        newQuery = newQuery.replace(`&shr=${this.props.query.shr}`, "");
        const urlLength = window.location.pathname.length + newQuery;
        if (urlLength > 1) {
          if (window.location.search.includes("?") === false) {
            newQuery = `?${newQuery}`;
          }
        }
        return <Redirect to={window.location.pathname + newQuery} />;
      }
    }
  };

  handleFilter = (type) => {
    if (this.state.share === type) {
      if (window.location.href.includes(`shr=${type}`) === false) {
        if (window.location.href.includes("shr") === true) {
          let newQuery = window.location.search.replace(
            `&shr=${this.props.query.shr}`,
            `&shr=${type}`
          );
          if (window.location.href.includes(`?`) === false) {
            newQuery = `?${newQuery}`;
          }
          return <Redirect to={window.location.pathname + newQuery} />;
        } else {
          if (window.location.href.includes(`?`) === false) {
            return (
              <Redirect
                to={
                  window.location.pathname +
                  "?" +
                  window.location.search +
                  `shr=${type}`
                }
              />
            );
          } else {
            return (
              <Redirect
                to={
                  window.location.pathname +
                  window.location.search +
                  `&shr=${type}`
                }
              />
            );
          }
        }
      }
    }
  };

  render() {
    return (
      <React.Fragment>
        {this.handleUndefined()}
        {this.handleFilter("prv")}
        {this.handleFilter("fam")}
        {this.handleFilter("pub")}
        <div className="searchFilterHeader">Share type:</div>
        <div className="searchFilterCheckWrapper">
          <Checkbox
            type="checkbox"
            value="prv"
            checked={this.state.share === "prv"}
            onChange={this.handleChange("share")}
            name="prv"
            className="searchFilterCheckbox"
          />
          <span className="searchFilterLabel">Private</span>
        </div>
        <div className="searchFilterCheckWrapper">
          <Checkbox
            type="checkbox"
            value="fam"
            checked={this.state.share === "fam"}
            onChange={this.handleChange("share")}
            name="fam"
            className="searchFilterCheckbox"
          />
          <span className="searchFilterLabel">Family</span>
        </div>
        <div className="searchFilterCheckWrapper">
          <Checkbox
            type="checkbox"
            value="pub"
            checked={this.state.share === "pub"}
            onChange={this.handleChange("share")}
            name="pub"
            className="searchFilterCheckbox"
          />
          <span className="searchFilterLabel">Public</span>
        </div>
      </React.Fragment>
    );
  }
}

export default SearchFilterShare;
