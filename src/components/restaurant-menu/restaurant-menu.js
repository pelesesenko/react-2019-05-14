import React, { useEffect } from "react";
import Dish from "../dish";
import { Row, Col, Spin } from "antd";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  createDishesSelector,
  dishesLoadedSelector,
  dishesLoadingSelector
} from "../../selectors";
import { loadDishes } from "../../ac";
import "./restaurant-menu.css";

function RestaurantMenu(props) {
  useEffect(() => {
    if (!props.isDishesLoading && !props.isDishesLoaded) {
      props.loadDishes();
    }
  });
  return (
    <div data-automation-id="menu" className="restaurant-menu">
      <Row gutter={16}>
        {props.isDishesLoaded ? (
          props.menu.map(dishId => (
            <Col key={dishId} span={8}>
              <Dish id={dishId} />
            </Col>
          ))
        ) : (
          <div style={{ textAlign: "center", padding: "24px" }}>
            <Spin />
          </div>
        )}
      </Row>
    </div>
  );
}

RestaurantMenu.propTypes = {
  menu: PropTypes.arrayOf(PropTypes.string).isRequired
};

const initMapStateToProps = () => {
  const dishSelector = createDishesSelector();
  return (state, ownProps) => {
    return {
      menu: dishSelector(state, ownProps).map(dish => dish.id),
      isDishesLoading: dishesLoadingSelector(state),
      isDishesLoaded: dishesLoadedSelector(state)
    };
  };
};

export default connect(
  initMapStateToProps,
  {
    loadDishes
  }
)(RestaurantMenu);
