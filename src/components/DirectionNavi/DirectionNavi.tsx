import { useEffect, useState } from "react";

import styles from "./styles.module.css";
import Arrow from "../Arrow/Arrow";

const DirectionNavi: React.FC = () => {
  const [bearing, setBearing] = useState<number>(0);
  const destination = { lat: 35.6895, lon: 139.6917 }; // 目的地の緯度経度（例: 東京）

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
        setBearing(bearing);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  // 2点間の方角を計算
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

  useEffect(() => {
    getPosition();
  }, []);
  return (
    <div className={styles.container}>
      <Arrow bearing={bearing} />
    </div>
  );
};

export default DirectionNavi;
