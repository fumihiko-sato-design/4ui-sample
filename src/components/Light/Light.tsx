import React from "react";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import styles from "./styles.module.css";
import { directionType } from "../../types/types";

type LightProps = {
  direction?: directionType;
  // isOn: boolean;
  // toggleLight: () => void;
};

const Light: React.FC<LightProps> = ({ direction }) => {
  const light01 = useRef<HTMLDivElement>(null);
  const lights = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elements: HTMLCollection | undefined = lights.current?.children;
    if (!elements) return;
    [...elements].forEach((element, index) => {
      let delay = 0;
      switch (direction) {
        case "up":
          break;
        case "rightTop":
          delay = index * 0.1;
          break;
        case "right":
          delay = index * 0.1;
          break;
        case "leftTop":
          delay = (elements!.length - index) * 0.1;
          break;
        case "left":
          delay = (elements!.length - index) * 0.1;
          break;
        default:
          break;
      }

      gsap.to(element, {
        duration: 1,
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
  }, [direction]);

  return (
    <div
      ref={lights}
      className={`${styles.lights} ${direction ? styles[direction] : ""}`}
    >
      <span ref={light01} className={styles.light}></span>
      <span className={styles.light}></span>
      <span className={styles.light}></span>
      <span className={styles.light}></span>
      <span className={styles.light}></span>
    </div>
  );
};

export default Light;
