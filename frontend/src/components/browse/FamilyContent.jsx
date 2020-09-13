import React, { Component } from "react";
import { connect } from "react-redux";

import SearchItem from "../search/SearchItem";

class FamilyContent extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div className="browseHeader">Family recipes</div>
        <div id="familyContent" className="contentOutline">
          {this.props.family_recipes.map((item) => {
            return (
              <div key={item.RECIPE_ID}>
                <SearchItem
                  title={item.RECIPE_NAME}
                  image={item.PHOTO_NAME}
                  description={item.DESCRIPTION}
                />
              </div>
            );
          })}
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    family_recipes: state.family_recipes,
  };
};

export default connect(mapStateToProps)(FamilyContent);
