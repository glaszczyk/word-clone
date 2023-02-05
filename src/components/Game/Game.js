import React from "react";

import { range, sample } from "../../utils";
import { WORDS } from "../../data";

import { GuessInput } from "../GuessInput";
import { GuessList } from "../GuessList";
import { NUM_OF_GUESSES_ALLOWED } from "../../constants";

// Pick a random word on every pageload.
const answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({ answer });
const emptyWordPlaceholder = range(1, 6).map(() => "");

function Game() {
  const [guessList, setGuessList] = React.useState([]);
  const guessesCount = guessList.length;
  const remainingEmptyRows =
    guessesCount < NUM_OF_GUESSES_ALLOWED
      ? range(0, NUM_OF_GUESSES_ALLOWED - guessesCount).map(
          () => emptyWordPlaceholder
        )
      : [];
  const guessesList = [...guessList, ...remainingEmptyRows];

  const handleAddNextGuess = (nextWord) => {
    const splitNextWord = nextWord.split("");
    setGuessList([...guessList, splitNextWord]);
  };
  return (
    <>
      <GuessList guessList={guessesList} />
      <GuessInput
        setGuessList={handleAddNextGuess}
        disabled={guessList.length === NUM_OF_GUESSES_ALLOWED}
      />
    </>
  );
}

export default Game;
