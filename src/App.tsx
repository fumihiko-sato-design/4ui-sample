import { useState } from "react";
import "./App.css";
import Navi from "./components/Navi/Navi";
import GUI from "lil-gui";
import { directionType } from "./types/types";

function App() {
  const [direction, setDirection] = useState<directionType>();
  const [interval, setInterval] = useState<number>(5);
  const [isStart, setIsStart] = useState(false);
  const start = () => {
    setIsStart(true);
  };
  const gui = new GUI();
  const settings = { direction, interval };
  gui
    .add(settings, "direction", [
      "up",
      "right",
      "rightTop",
      "left",
      "leftTop",
      "restaurant",
    ])
    .onChange((value: directionType) => {
      setDirection(value);
    });

  gui.add(settings, "interval", 5, 100, 5).onChange((value: number) => {
    setInterval(value);
  });
  return (
    <>
      <div className="wrapper">
        {isStart ? (
          <Navi settings={settings} />
        ) : (
          <button onClick={start}>スタート</button>
        )}
      </div>
    </>
  );
}

export default App;
