import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { family_recipes } from "../../actions/actions";
import axios from "axios";
import SearchItem from "../search/SearchItem";

class FamilyContent extends Component {
  state = {};

  componentDidMount() {
    axios
      .get("/api/recipes/family")
      .then((data) => this.props.write_family_recipes(data.data));
  }

  render() {
    return (
      <React.Fragment>
        <div className="browseHeader">Family recipes</div>
        <div id="familyContent" className="contentOutline">
          {this.props.family_recipes
            .splice(this.props.splice1, this.props.splice2)
            .map((item) => {
              return (
                <Link
                  to={`/recipe/${item.RECIPE_IDENTIFIER}`}
                  key={item.RECIPE_ID}
                  className="recipeCardLink"
                >
                  <SearchItem
                    title={item.RECIPE_NAME}
                    image={item.PHOTO_NAME}
                    description={item.DESCRIPTION}
                    likes={item.LIKES}
                  />
                </Link>
              );
            })}
        </div>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    write_family_recipes: (data) => dispatch(family_recipes(data)),
  };
};

const mapStateToProps = (state) => {
  return {
    family_recipes: state.family_recipes,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FamilyContent);
