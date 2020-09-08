import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Checkbox } from "@material-ui/core/";

import { connect } from "react-redux";

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

  handleFilter = (type) => {
    if (this.state.share === type) {
      let newQuery;
      if (this.props.search_query.shr) {
        newQuery = window.location.search.replace(
          `&shr=${this.props.search_query.shr}`,
          `&shr=${type}`
        );
        return <Redirect to={window.location.pathname + newQuery} />;
      } else if (Object.keys(this.props.search_query).length > 0) {
        newQuery = `${window.location.search}&shr=${type}`;
        return <Redirect to={window.location.pathname + newQuery} />;
      } else {
        newQuery = `?shr=${type}`;
        return <Redirect to={window.location.pathname + newQuery} />;
      }
    } else if (this.state.share === undefined && this.props.search_query.shr) {
      let newQuery = window.location.search;
      Object.keys(this.props.search_query).length > 1
        ? (newQuery = newQuery.replace(
            `&shr=${this.props.search_query.shr}`,
            ""
          ))
        : (newQuery = newQuery.replace(
            `?shr=${this.props.search_query.shr}`,
            ""
          ));
      return <Redirect to={window.location.pathname + newQuery} />;
    }
  };

  render() {
    return (
      <React.Fragment>
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

const mapStateToProps = (state) => {
  return {
    search_query: state.search_query,
  };
};

export default connect(mapStateToProps)(SearchFilterShare);
