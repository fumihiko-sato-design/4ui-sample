import { useState, useEffect } from "react";
import "./App.css";
import Navi from "./components/Navi/Navi";
import { speech } from "./utils/speech";
import DirectionNavi from "./components/DirectionNavi/DirectionNavi";

type ScenarioTestType = {
  [key: string]: {
    distance: number;
    direction: string;
    roadType: string;
    message: string;
    scenario: string;
  }[];
};

type NaviType = "arrow" | "direction" | "road";

function App() {
  const [settings, setSettings] = useState<{ perSecond: number }>({
    // 4.17m/s = 15km/h(自転車の速度)
    perSecond: 4.17,
  });
  const [isStart, setIsStart] = useState(false);
  const [naviType, setNaviType] = useState<NaviType>("arrow");
  const [scenarioTest, setScenarioTest] = useState<ScenarioTestType>({});

  useEffect(() => {
    import("./scenarioTest.json").then((data) => {
      setScenarioTest(data.default);
    });
  }, []);

  const start = (naviType: NaviType) => {
    setNaviType(naviType);
    setIsStart(true);
    // これを入れないとiOSで音声が再生されない
    speech("案内を開始します");
  };

  return (
    <>
      <div className="wrapper">
        {isStart && scenarioTest ? (
          <>
            {naviType !== "direction" ? (
              <Navi
                settings={settings}
                scenarioTest={scenarioTest}
                type={naviType}
              />
            ) : (
              <DirectionNavi />
            )}
          </>
        ) : (
          <>
            <div className="startBox">
              <div className="buttons">
                <button
                  onClick={() => {
                    start("arrow");
                  }}
                >
                  スタート
                </button>
                <button
                  onClick={() => {
                    start("road");
                  }}
                >
                  スタート(道)
                </button>
                <button
                  onClick={() => {
                    start("direction");
                  }}
                >
                  スタート(方角)
                </button>
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
