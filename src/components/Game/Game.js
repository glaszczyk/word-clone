import React from "react";

import { range, sample } from "../../utils";
import { WORDS } from "../../data";
import { NUM_OF_GUESSES_ALLOWED } from "../../constants";
import { checkGuess } from "../../game-helpers";

import { GuessInput } from "../GuessInput";
import { GuessList } from "../GuessList";

// Pick a random word on every pageload.
const answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({ answer });

function Game() {
  const [guessList, setGuessList] = React.useState([]);
  const attemptsToTake = NUM_OF_GUESSES_ALLOWED - guessList.length;
  const remainingEmptyRows =
    attemptsToTake > 0 ? range(0, attemptsToTake).map(() => null) : [];
  const completeGuessList = [...guessList, ...remainingEmptyRows];

  const handleAddNextGuess = (nextWord) => {
    const checkedGuess = checkGuess(nextWord, answer);
    setGuessList([...guessList, checkedGuess]);
  };
  return (
    <>
      <GuessList guessList={completeGuessList} />
      <GuessInput
        setGuessList={handleAddNextGuess}
        disabled={attemptsToTake === 0}
      />
    </>
  );
}

export default Game;
