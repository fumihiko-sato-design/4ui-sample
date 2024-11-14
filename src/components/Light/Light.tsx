import React, { useState } from "react";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import styles from "./styles.module.css";
import { directionType } from "../../types/types";

type LightProps = {
  direction?: directionType;
  isNear: boolean;
  // isOn: boolean;
  // toggleLight: () => void;
};

const Light: React.FC<LightProps> = ({ direction, isNear }) => {
  const lights = useRef<HTMLDivElement>(null);
  const [lightItemLength, setLightItemLength] = useState(7);

  useEffect(() => {
    const elements: HTMLCollection | undefined = lights.current?.children;
    if (!elements) return;
    [...elements].forEach((element, index) => {
      let delay = 0;
      const coefficient = isNear ? 0.12 : 0.3;
      switch (direction) {
        case "up":
          break;
        case "rightTop":
          delay = index * coefficient;
          break;
        case "right":
          delay = index * coefficient;
          break;
        case "leftTop":
          delay = (elements!.length - index) * coefficient;
          break;
        case "left":
          delay = (elements!.length - index) * coefficient;
          break;
        default:
          break;
      }
      console.log("delay", isNear);
      gsap.to(element, {
        duration: isNear ? 0.5 : 1.5,
        repeat: -1,
        yoyo: true,
        opacity: 0,
        delay,
      });
    });
    return () => {
      // クリーンアップ関数でアニメーションを停止し、スタイルをリセット
      Array.from(elements).forEach((element) => {
        gsap.killTweensOf(element); // アニメーションを停止
        gsap.set(element, { opacity: 1 }); // スタイルをリセット
      });
    };
  }, [direction, isNear]);

  return (
    <div
      ref={lights}
      className={`${styles.lights} ${direction ? styles[direction] : ""}`}
    >
      {[...Array(lightItemLength)].map((_, i) => {
        // TODO 謎の数値1.14をなんとかする
        const radian =
          (i / (lightItemLength - 1)) * (Math.PI * 0.75) + Math.PI * 1.14;
        const left = Math.cos(radian) * 100 + 52;
        const top = Math.sin(radian) * 100 + 85;

        return (
          <span
            key={i}
            className={styles.light}
            style={{ top: top + "px", left: left + "px" }}
          ></span>
        );
      })}
    </div>
  );
};

export default Light;
