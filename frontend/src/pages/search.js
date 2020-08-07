import React, { Component } from "react";
import axios from "axios";
import queryString from "query-string";

class SearchPage extends Component {
  state = {};

  handleQuery = () => {
    const parsed = queryString.parse(this.props.location.search);
    axios.post("/api/search", parsed);
    console.log(this.props.location.search);
  };

  render() {
    this.handleQuery();
    return <div>Search</div>;
  }
}

export default SearchPage;
