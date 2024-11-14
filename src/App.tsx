import { useState } from "react";
import "./App.css";
import Navi from "./components/Navi/Navi";
import { directionType } from "./types/types";

function App() {
  const [settings, setSettings] = useState<{ perSecond: number }>({
    // 4.17m/s = 15km/h(自転車の速度)
    perSecond: 4.17,
  });
  const [isStart, setIsStart] = useState(false);
  const start = () => {
    setIsStart(true);
  };

  return (
    <>
      <div className="wrapper">
        {isStart ? (
          <Navi settings={settings} />
        ) : (
          <>
            <div className="startBox">
              <div>
                <button onClick={start}>スタート</button>
              </div>
              <div>
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
