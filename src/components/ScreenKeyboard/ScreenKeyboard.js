import React from "react";
import { KEYS } from "../../keys";

export const ScreenKeyboard = ({ onClick, onSubmit }) => {
  return (
    <div className="keyboard-wrapper">
      {KEYS.map((row, i) => (
        <div key={i} className="row-wrapper">
          {Object.keys(row).map((key) => (
            <button
              key={key}
              className="keyboard-button"
              onClick={() => onClick(row[key])}
            >
              {row[key]}
            </button>
          ))}
        </div>
      ))}
      <button
        key={"enter"}
        className="keyboard-button enter-button"
        onClick={onSubmit}
      >
        Enter
      </button>
    </div>
  );
};
