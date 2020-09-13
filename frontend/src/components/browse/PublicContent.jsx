import React, { Component } from "react";
import { connect } from "react-redux";

import SearchItem from "../search/SearchItem";

class PublicContent extends Component {
  state = {};
  render() {
    console.log(this.props);
    return (
      <React.Fragment>
        <div className="browseHeader">Public recipes</div>
        <div id="publicContent" className="contentOutline">
          {this.props.public_recipes.map((item) => {
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
    public_recipes: state.public_recipes,
  };
};

export default connect(mapStateToProps)(PublicContent);
