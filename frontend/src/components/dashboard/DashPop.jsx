import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Carousel } from "react-bootstrap";
import DashPopItem from "./DashPopItem";
import axios from "axios";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { public_recipes } from "../../actions/actions";

class DashPop extends Component {
  state = {};

  componentDidMount() {
    axios
      .get("/api/recipes/public")
      .then((res) => this.props.write_public_recipes(res.data));
  }

  render() {
    if (this.props.public_recipes === undefined) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="dashOutlineWrapper" id="dashPopWrapper">
          <div className="dashOutlineHeader">Popular Recipes</div>
          <Carousel indicators={false}>
            <Carousel.Item>
              <div className="dashPopItemWrapper">
                {this.props.public_recipes.length === 0 ? (
                  <div>No recipes to display</div>
                ) : (
                  this.props.public_recipes.slice(0, 2).map((item) => {
                    return (
                      <Link
                        to={`/recipe/${item.RECIPE_IDENTIFIER}`}
                        key={item.RECIPE_ID}
                        className="recipeCardLink"
                      >
                        <DashPopItem
                          key={item.RECIPE_ID}
                          title={item.RECIPE_NAME}
                          description={item.DESCRIPTION}
                          image={item.PHOTO_NAME}
                          likes={item.LIKES}
                        />
                      </Link>
                    );
                  })
                )}
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div className="dashPopItemWrapper">
                {this.props.public_recipes.length === 0 ? (
                  <div>No recipes to display</div>
                ) : (
                  this.props.public_recipes.slice(3, 5).map((item) => {
                    return (
                      <Link
                        to={`/recipe/${item.RECIPE_IDENTIFIER}`}
                        key={item.RECIPE_ID}
                        className="recipeCardLink"
                      >
                        <DashPopItem
                          key={item.RECIPE_ID}
                          title={item.RECIPE_NAME}
                          description={item.DESCRIPTION}
                          image={item.PHOTO_NAME}
                          likes={item.LIKES}
                        />
                      </Link>
                    );
                  })
                )}
              </div>
            </Carousel.Item>
          </Carousel>
          <Link to="/browse/public" className="browseMore" id="dashFamilyView">
            View more
          </Link>
        </div>
      );
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    write_public_recipes: (event) => dispatch(public_recipes(event)),
  };
};

const mapStateToProps = (state) => {
  return {
    public_recipes: state.public_recipes,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashPop);
