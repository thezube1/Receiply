import React, { Component } from "react";

class RecipePhoto extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div className="recipeBorderBox" id="recipePhotoContent">
          <img src={`/${this.props.image}`} alt="food" id="recipePhoto" />
        </div>
        <div id="recipeFactsWrapper">
          <div>
            <div className="recipeFactsHeader">Nutritional facts</div>
            <div className="recipeFactsText">Not available</div>
          </div>
          <div>
            <div className="recipeFactsHeader">Time to make</div>
            <div className="recipeFactsText">{this.props.TTM}</div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default RecipePhoto;
