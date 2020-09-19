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
    return (
      <div className="dashOutlineWrapper">
        <div className="dashOutlineHeader">Popular Recipes</div>
        <Carousel indicators={false}>
          <Carousel.Item>
            <div className="dashPopItemWrapper">
              {this.props.public_recipes.slice(0, 2).map((item) => {
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
              })}
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="dashPopItemWrapper">
              <DashPopItem
                title="4"
                description="The most popular recipe on our site"
              />
              <DashPopItem title="5" description="Another recipe right here" />
              <DashPopItem title="6" description="Created by Aamer Hydrie" />
            </div>
          </Carousel.Item>
        </Carousel>
      </div>
    );
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
