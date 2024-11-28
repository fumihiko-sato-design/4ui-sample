import { useState, useEffect } from "react";
import "./App.css";
import Navi from "./components/Navi/Navi";

type ScenarioTestType = {
  [key: string]: {
    distance: number;
    direction: string;
    message: string;
    scenario: string;
  }[];
};

function App() {
  const [settings, setSettings] = useState<{ perSecond: number }>({
    // 4.17m/s = 15km/h(自転車の速度)
    perSecond: 4.17,
  });
  const [isStart, setIsStart] = useState(false);
  const [scenarioTest, setScenarioTest] = useState<ScenarioTestType>({});

  useEffect(() => {
    import("./scenarioTest.json").then((data) => {
      setScenarioTest(data.default);
    });
  }, []);

  const start = () => {
    setIsStart(true);
  };

  return (
    <>
      <div className="wrapper">
        {isStart && scenarioTest ? (
          <Navi settings={settings} scenarioTest={scenarioTest} />
        ) : (
          <>
            <div className="startBox">
              <div>
                <button onClick={start}>スタート</button>
              </div>
              <div>
                <span className="label">速度:{settings.perSecond}</span>
                <input
                  value={settings.perSecond}
                  type="range"
                  min="1"
                  max="20"
                  step="0.1"
                  onChange={(e) =>
                    setSettings({ perSecond: Number(e.target.value) })
                  }
                />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
