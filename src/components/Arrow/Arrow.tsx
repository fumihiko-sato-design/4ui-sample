import React from "react";
import up from "../../assets/arrows/p10001_day.svg";
import rightTop from "../../assets/arrows/p10002_day.svg";
import right from "../../assets/arrows/p10003_day.svg";
import leftTop from "../../assets/arrows/p10007_day.svg";
import left from "../../assets/arrows/p10008_day.svg";
import restaurant from "../../assets/restaurant.svg";
import styles from "./styles.module.css";
import { speech } from "../../utils/speech";
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
        speech("このまま直進です");
        return up;
      case "rightTop":
        speech("2つ目の信号をゆるやかに右にまがります");
        return rightTop;
      case "right":
        speech("400メートル先右です");
        return right;
      case "leftTop":
        speech("この先の信号をゆるやかに左にまがります");
        return leftTop;
      case "left":
        speech("この先の信号を左です");
        speech("その後すぐ左です");
        return left;
      case "restaurant":
        speech("近くにおすすめのスポットがあります");
        speech("立ち寄りますか？");
        return restaurant;
      default:
        return up;
    }
  };

  return (
    <div className={`${styles.arrow} ${direction ? styles[direction] : ''}`}>
      <img src={getArrowPath()} alt="Arrow" />
    </div>
  );
};

export default Arrow;
