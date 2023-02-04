import React from "react";

export const GuessList = ({ guessList }) => {
  return (
    <div className="guess-results">
      {guessList.map((guess, i) => (
        <p className="guess" key={`${i}-${guess}`}>
          {guess}
        </p>
      ))}
    </div>
  );
};
