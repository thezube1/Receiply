import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Carousel } from "react-bootstrap";

import DashPopItem from "./DashPopItem";

class DashPop extends Component {
  state = {};
  render() {
    return (
      <div className="dashOutlineWrapper">
        <div className="dashOutlineHeader">Popular recipes</div>
        <Carousel indicators={false}>
          <Carousel.Item>
            <div className="dashPopItemWrapper">
              <DashPopItem
                title="Delicious Lamb Korma"
                description="The most popular recipe on our site"
              />
              <DashPopItem
                title="Penne pasta with meat sauce"
                description="Another recipe right here"
              />
              <DashPopItem
                title="Aloo Gobi"
                description="Created by Aamer Hydrie"
              />
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

export default DashPop;
