import { useEffect, useState } from "react";
import Light from "../Light/Light";
import Arrow from "../Arrow/Arrow";
import styles from "./styles.module.css";
import { directionType } from "../../types/types";
import { speech } from "../../utils/speech";
import pushSound from "../../assets/sounds/push.mp3";

type NaviDataType = {
  direction: string;
  message: string;
  date: number;
  spoken: boolean;
  delayTime?: number;
  distance: number;
};

type ScenarioTestType = {
  [key: string]: {
    distance: number;
    direction: string;
    message: string;
    scenario: string;
    delayTime?: number;
  }[];
};

type NaviProps = {
  settings: {
    perSecond: number;
  };
  scenarioTest: ScenarioTestType;
};

const Navi: React.FC<NaviProps> = ({ settings, scenarioTest }) => {
  const [directionData, setDirectionData] = useState<directionType>();
  const [isNear, setIsNear] = useState(false);
  const [currentTime, setCurrentTime] = useState(Date.now());
  const [currentScenarioKey, setCurrentScenarioKey] = useState("scenario01");
  const [naviData, setNaviData] = useState<NaviDataType[]>([]);
  const [scenarioDataStepIndex, setScenarioDataStepIndex] = useState(0);
  const scenarioData: ScenarioTestType = scenarioTest;
  let requestAnimationFrameId: number | null = null;

  let currentNaviDataIndex = 0;
  let isNearSpoken = false;

  const tick = async() =>  {
    if (naviData.length === 0) return;
    const now = Date.now();
    const nextData = naviData[currentNaviDataIndex];
    if (nextData.date - now < 10 * 1000) {
      setIsNear(true);

      if (
        !nextData.spoken &&
        nextData.direction !== "restaurant" &&
        nextData.direction !== "goal" &&
        nextData.direction !== "loading" &&
        nextData.direction !== "up" &&
        isNearSpoken === false &&
        nextData.distance > 30
      ) {
        const data = JSON.parse(JSON.stringify(nextData));
        data.message = "まもなく" + data.message;
        isNearSpoken = true;
        speak(data);
      }
    }

    naviData.forEach((data, i) => {
      if (data.date < now && !data.spoken) {
        currentNaviDataIndex = i + 1;
        data.spoken = true;
        speak(data);
        setScenarioDataStepIndex(i);
        setIsNear(false);
        isNearSpoken = false;
      }
    });

    if (requestAnimationFrameId) {
      window.cancelAnimationFrame(requestAnimationFrameId);
    }

    requestAnimationFrameId = window.requestAnimationFrame(tick);
  };

  const speak = ({ direction, message, delayTime }: NaviDataType) => {
    setDirectionData(direction as directionType);
    if (direction === "restaurant") {
      playSound();
    }

    return speech(message, delayTime);
  };

  const playSound = () => {
    const audio = new Audio(pushSound);
    audio.volume = 0.2;
    audio.play();
  };

  const changeScenario = () => {
    const key =
      scenarioData[currentScenarioKey][scenarioDataStepIndex].scenario;

    if (key) {
      setCurrentTime(Date.now());
      setCurrentScenarioKey(key);
      currentNaviDataIndex = 0;
    }
  };

  const getNaviData = () => {
    const distances = scenarioData[currentScenarioKey].map(
      (step) => step.distance
    );
    return scenarioData[currentScenarioKey].map(
      ({ direction, message, delayTime, distance }, index) => {
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
          delayTime,
          distance,
        };
      }
    );
  };

  useEffect(() => {
    const data = getNaviData();
    setNaviData(data);
  }, [currentScenarioKey]);

  useEffect(() => {
    tick();
    return () => {
      if (requestAnimationFrameId) {
        window.cancelAnimationFrame(requestAnimationFrameId);
      }
    };
  }, [naviData]);

  return (
    <div className={styles.navi}>
      <Light direction={directionData} isNear={isNear} />
      <Arrow direction={directionData} />
      <button
        className={`${styles.button} ${
          directionData === "restaurant" ? styles.spot : ""
        }`}
        onClick={changeScenario}
      />
    </div>
  );
};

export default Navi;
