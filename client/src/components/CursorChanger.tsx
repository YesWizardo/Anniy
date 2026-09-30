import React, { useEffect } from "react";

const CURSORS = [
  "default",
  "crosshair",
  "help",
  "not-allowed",
  "wait",
  "grab"
];

export const CursorChanger: React.FC = () => {
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % CURSORS.length;
      document.body.style.cursor = CURSORS[index];
    }, 8000);

    return () => {
      clearInterval(interval);
      document.body.style.cursor = "default";
    };
  }, []);

  return null;
};
