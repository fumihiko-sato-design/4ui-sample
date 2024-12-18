import React, { useState, useEffect } from "react";
import { throttle } from "lodash";
import styles from "./styles.module.css";
import Arrow from "../Arrow/Arrow";
import Light from "../Light/Light";

const DirectionNavi: React.FC = () => {
  const [bearing, setBearing] = useState<number>(0);
  // const destination = { lat: 35.6895, lon: 139.6917 }; // 目的地の緯度経度（例: 東京都庁）
  // const destination = { lat: 35.66625720652304, lon: 139.41362857061216 }; // 目的地の緯度経度（例: ちかくのスーパー）
  const destination = { lat: 35.73695076346057, lon: 139.75140725933173 }; // 目的地の緯度経度（例: 東中里公園）

  const [deviceOrientation, setDeviceOrientation] = useState<number | null>(
    null
  );

  // 現在位置の取得
  const getPosition = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const bearing = calculateBearing(
          latitude,
          longitude,
          destination.lat,
          destination.lon
        );
        console.log(latitude, longitude);
        setBearing(bearing);
      },
      (error) => {
        console.error(error);
      }
    );
  };

  useEffect(() => {
    getPosition();
  }, []);

  const handleOrientation = throttle((event: DeviceOrientationEvent) => {
    const alpha = event.alpha; // デバイスの方位（0-360度）
    if (alpha !== null) {
      setDeviceOrientation(alpha);
    }
  }, 100); // 100msごとに実行

  useEffect(() => {
    window.addEventListener("deviceorientation", handleOrientation);

    return () => {
      window.removeEventListener("deviceorientation", handleOrientation);
    };
  }, []);

  // デバイスの向きと目的地の方角の差を計算
  const calculateDirection = () => {
    if (deviceOrientation !== null) {
      const direction = (deviceOrientation - bearing + 360) % 360;
      return direction;
    }
    return 0;
  };

  setInterval(() => {
    getPosition();
  }, 500);

  const direction = calculateDirection();

  return (
    <div className={styles.navi}>
      {deviceOrientation !== null && (
        <div>
          bearing: {Math.round(bearing)} | deviceOrientation:
          {Math.round(deviceOrientation)}| direction:{Math.round(direction)}
        </div>
      )}
      <div
        className={styles.naviWrapper}
        style={{
          transform: `rotate(${Math.round(direction)}deg)`,
        }}
      >
        <Light isNear={false} naviType="direction" />
        <Arrow direction="simpleArrow" />
      </div>

      <button onClick={() => console.log("ok")} className={styles.button} />
    </div>
  );
};

// 方角の計算関数
function calculateBearing(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const toRadians = (degree: number) => degree * (Math.PI / 180);
  const toDegrees = (radian: number) => radian * (180 / Math.PI);

  const φ1 = toRadians(lat1);
  const φ2 = toRadians(lat2);
  const Δλ = toRadians(lon2 - lon1);

  const y = Math.sin(Δλ) * Math.cos(φ2);
  const x =
    Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);
  const θ = Math.atan2(y, x);

  return (toDegrees(θ) + 360) % 360; // 方角を0-360度の範囲に正規化
}

export default DirectionNavi;
