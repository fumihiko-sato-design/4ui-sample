import React from "react";
import up from "../../assets/arrows/p10001_day.svg";
import rightTop from "../../assets/arrows/p10002_day.svg";
import right from "../../assets/arrows/p10003_day.svg";
import leftTop from "../../assets/arrows/p10007_day.svg";
import left from "../../assets/arrows/p10008_day.svg";
import arrow from "../../assets/arrows/arrow.svg";
import restaurant from "../../assets/restaurant.svg";
import goal from "../../assets/goal.png";
import styles from "./styles.module.css";
import { directionType } from "../../types/types";

interface ArrowProps {
  direction?: directionType;
  //   size?: number;
  //   color?: string;
}

const Arrow: React.FC<ArrowProps> = ({ direction }) => {
  const getArrowPath = () => {
    switch (direction) {
      case "up":
        return up;
      case "rightTop":
        return rightTop;
      case "right":
        return right;
      case "leftTop":
        return leftTop;
      case "left":
        return left;
      case "restaurant":
        return restaurant;
      case "goal":
        return goal;
      case "simpleArrow":
        return arrow;
      default:
        return up;
    }
  };

  return (
    <div className={`${styles.arrow} ${direction ? styles[direction] : ""}`}>
      {direction !== "loading" ? (
        <img src={getArrowPath()} alt="Arrow" />
      ) : (
        <div className="spinnerWrapper">
          <div className="spinner"></div>
        </div>
      )}
    </div>
  );
};

export default Arrow;
