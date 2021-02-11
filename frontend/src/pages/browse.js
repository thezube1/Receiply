import React, { Component } from "react";
import { connect } from "react-redux";
import { search_query } from "../actions/actions";
import { Switch, Route, Link } from "react-router-dom";
import queryString from "query-string";
import { isEqual } from "lodash";

import { initGA, PageView } from "../components/tracking/index";
import BrowseFilters from "../components/browse/BrowseFilters";
import NavbarSwitch from "../components/navbar/navbarswitch";
import FamilyContentPage from "../components/browse/FamilyContentPage";
import PublicContentPage from "../components/browse/PublicContentPage";
import FamilyContent from "../components/browse/FamilyContent";
import PublicContent from "../components/browse/PublicContent";
import "../components/browse/browse.css";

class BrowsePage extends Component {
  state = {};

  componentDidMount() {
    initGA();
    PageView();
    const parsed = queryString.parse(this.props.location.search, {
      arrayFormat: "comma",
    });

    this.props.write_query(parsed);
  }

  componentDidUpdate(previousProps, previousState) {
    const parsed = queryString.parse(this.props.location.search, {
      arrayFormat: "comma",
    });
    if (isEqual(parsed, previousProps.search_query) === false) {
      this.props.write_query(parsed);
    }
  }

  render() {
    return (
      <Switch>
        <Route path="/browse/family" component={FamilyContentPage} />
        <Route path="/browse/public" component={PublicContentPage} />
        <React.Fragment>
          <NavbarSwitch />
          <div id="browseWrapper">
            <div id="browseFilters">
              <BrowseFilters />
            </div>
            <div>
              <FamilyContent splice1={0} splice2={5} />

              <div>
                <PublicContent splice1={0} splice2={5} />
                <div className="browserMoreWrapper">
                  <Link to="/browse/public" className="browseMore">
                    View more
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      </Switch>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    write_query: (data) => dispatch(search_query(data)),
  };
};

const mapStateToProps = (state) => {
  return {
    search_query: state.search_query,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BrowsePage);
