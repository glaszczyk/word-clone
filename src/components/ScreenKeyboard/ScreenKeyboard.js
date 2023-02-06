import React from "react";
import { range } from "../../utils";

const rowsCount = [range(0, 10), range(10, 19), range(19, 26)];
const row2obj = (arr, source) =>
  arr.reduce((acc, current) => [...acc, source[current]], []);

export const ScreenKeyboard = ({ onClick, onSubmit, keys }) => {
  const keysInRows = rowsCount.map((row) => row2obj(row, keys));
  return (
    <div className="keyboard-wrapper">
      {keysInRows.map((row, i) => (
        <div key={i} className="row-wrapper">
          {row.map((key) => (
            <button
              key={key.letter}
              className={`keyboard-button ${key.status}`}
              onClick={() => onClick(key.letter)}
            >
              {key.letter}
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
