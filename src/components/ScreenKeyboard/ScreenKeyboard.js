import React from "react";
import { KEYS } from "../../keys";

export const ScreenKeyboard = () => {
  return (
    <div className="keyboard-wrapper">
      {KEYS.map((row, i) => (
        <div key={i} className="row-wrapper">
          {Object.keys(row).map((key) => (
            <button key={key} className="keyboard-button">
              {row[key]}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};
