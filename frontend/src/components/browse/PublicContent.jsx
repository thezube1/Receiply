import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import SearchItem from "../search/SearchItem";
import { public_recipes } from "../../actions/actions";
import axios from "axios";

class PublicContent extends Component {
  state = {};
  componentDidMount() {
    axios
      .get("/api/recipes/public")
      .then((data) => this.props.write_public_recipes(data.data));
  }

  render() {
    return (
      <React.Fragment>
        <div className="browseHeader">Public recipes</div>
        <div id="publicContent" className="contentOutline">
          {this.props.public_recipes
            .splice(this.props.splice1, this.props.splice2)
            .map((item) => {
              return (
                <Link
                  key={item.RECIPE_ID}
                  to={`/recipe/${item.RECIPE_IDENTIFIER}`}
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
    write_public_recipes: (data) => dispatch(public_recipes(data)),
  };
};

const mapStateToProps = (state) => {
  return {
    public_recipes: state.public_recipes,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PublicContent);
