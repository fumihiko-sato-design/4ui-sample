import { useEffect, useState } from "react";
import Light from "../Light/Light";
import Arrow from "../Arrow/Arrow";
import styles from "./styles.module.css";
import scenarioTest from "../../scenarioTest.json";
import { directionType } from "../../types/types";

type NaviProps = {
  settings: {
    direction?: directionType;
    interval: number;
  };
};

const Navi: React.FC<NaviProps> = (settings) => {
  const [direction, setDirection] = useState<directionType>();
  console.log(settings.settings);
  useEffect(() => {
    scenarioTest.steps.forEach(({ direction }, index) => {
      setTimeout(() => {
        setDirection(direction as directionType);
      }, (index + 1) * 5 * 1000);
    });

    return () => {};
  }, []);

  return (
    <div className={styles.navi}>
      <Light direction={direction} />
      <Arrow direction={direction} />
    </div>
  );
};

export default Navi;
