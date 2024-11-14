import { useEffect, useState } from "react";
import Light from "../Light/Light";
import Arrow from "../Arrow/Arrow";
import styles from "./styles.module.css";
import scenarioTest from "../../scenarioTest.json";
import { directionType } from "../../types/types";
import { speech } from "../../utils/speech";

type NaviProps = {
  settings: {
    perSecond: number;
  };
};

type NaviDataType = {
  direction: string;
  message: string;
  date: number;
  spoken: boolean;
};

const Navi: React.FC<NaviProps> = ({ settings }) => {
  const [direction, setDirection] = useState<directionType>();
  // const [naviData, setNaviData] = useState<NaviDataType[]>([]);
  const [isNear, setIsNear] = useState(false);
  const [currentTime, setCurrentTime] = useState(Date.now());
  let currentNaviDataIndex = 0;
  let naviData: NaviDataType[] = [];

  const tick = () => {
    if (naviData.length === 0) return;
    const now = Date.now();
    setIsNear(naviData[currentNaviDataIndex].date - now < 10 * 1000);
    naviData.forEach((data, i) => {
      if (data.date < now && !data.spoken) {
        currentNaviDataIndex = i + 1;
        data.spoken = true;
        speak(data);
      }
    });
    window.requestAnimationFrame(tick);
  };

  const speak = ({ direction, message }: NaviDataType) => {
    setDirection(direction as directionType);
    speech(message);
  };

  const getNaviData = () => {
    const distances = scenarioTest.steps.map((step) => step.distance);
    return scenarioTest.steps.map(({ direction, message }, index) => {
      const date =
        distances
          .slice(0, index + 1)
          .reduce(
            (previousValue, currentValue) => previousValue + currentValue,
            0
          ) / settings.perSecond;

      return {
        direction,
        message,
        date: currentTime + date * 1000,
        spoken: false,
      };
    });
  };

  naviData = getNaviData();

  useEffect(() => {
    tick();
    return () => {};
  }, []);

  return (
    <div className={styles.navi}>
      <Light direction={direction} isNear={isNear} />
      <Arrow direction={direction} />
      <button className={styles.button} />
    </div>
  );
};

export default Navi;
