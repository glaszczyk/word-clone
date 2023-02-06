import React from "react";

import { Guess } from "../Guess";

export const GuessList = ({ guessList }) => {
  return (
    <div className="guess-results">
      {guessList.map((guess, i) => (
        <Guess className="guess" key={`${i}`} guess={guess} />
      ))}
    </div>
  );
};
