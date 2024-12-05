import styles from "./styles.module.css";
import road01 from "../../assets/roads/road01.png";
import road02 from "../../assets/roads/road02.png";
import road03 from "../../assets/roads/road03.png";
import road04 from "../../assets/roads/road04.png";
import road05 from "../../assets/roads/road05.png";
import road06 from "../../assets/roads/road06.png";
import road07 from "../../assets/roads/road07.png";
import roadUp from "../../assets/roads/roadUp.png";
import restaurant from "../../assets/restaurant.svg";
import goal from "../../assets/goal.png";

interface ArrowWithLoadProps {
  type?: string;
  //   size?: number;
  //   color?: string;
}

const ArrowWithRoad: React.FC<ArrowWithLoadProps> = ({ type }) => {
  console.log(type);
  const getArrowPath = () => {
    switch (type) {
      case "road01":
        return road01;
      case "road02":
        return road02;
      case "road03":
        return road03;
      case "road04":
        return road04;
      case "road05":
        return road05;
      case "road06":
        return road06;
      case "road07":
        return road07;
      case "roadUp":
        return roadUp;
      case "restaurant":
        return restaurant;
      case "goal":
        return goal;
      default:
        return road01; // デフォルトの画像
    }
  };

  return (
    <div className={`${styles.arrow} ${styles[type!]}`}>
      {type !== "loading" ? (
        <img src={getArrowPath()} alt="Arrow" />
      ) : (
        <div className="spinnerWrapper">
          <div className="spinner"></div>
        </div>
      )}
    </div>
  );
};

export default ArrowWithRoad;
