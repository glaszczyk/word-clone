import React from "react";

import { range, sample } from "../../utils";
import { WORDS } from "../../data";
import { KEYS } from "../../keys";
import { NUM_OF_GUESSES_ALLOWED } from "../../constants";
import { checkGuess } from "../../game-helpers";

import { GuessInput } from "../GuessInput";
import { GuessList } from "../GuessList";
import { Banner } from "../Banner";
import { ScreenKeyboard } from "../ScreenKeyboard";

const keysParsed = KEYS.map((key) => ({ letter: key.toUpperCase() }));

const keysWithStatus = (keys, pressedKeys) => {
  const flatterPressedKeys = pressedKeys.reduce(
    (acc, current) => [...acc, ...current],
    []
  );
  console.log(flatterPressedKeys);
  const findKey = (arr, key) => {
    const filteredKeys = arr.filter((item) => item.letter === key.letter);
    if (filteredKeys.length === 0) {
      return key;
    }
    return filteredKeys.reduce((acc, current) => {
      if (Object.keys(acc).length === 0) {
        return current;
      }
      if (acc?.status === "incorrect" && current?.status === "misplaced") {
        return current;
      }
      if (acc?.status === "misplaced" && current?.status === "correct") {
        return current;
      }
      return acc;
    }, {});
  };

  return keys.map((key) => ({
    ...findKey(flatterPressedKeys, key),
  }));
};

const getStatus = (isCorrectGuess, attemptsTaken) => {
  if (isCorrectGuess && attemptsTaken <= NUM_OF_GUESSES_ALLOWED) return "win";
  if (!isCorrectGuess && attemptsTaken === NUM_OF_GUESSES_ALLOWED)
    return "lose";
  return "in-progress";
};

function Game() {
  const defaultList = [];
  const [guess, setGuess] = React.useState("");
  const [guessList, setGuessList] = React.useState(defaultList);
  const [isCorrectGuess, setIsCorrectGuess] = React.useState(false);
  const [attemptsTaken, setAttemptsTaken] = React.useState(0);
  const [answer, setAnswer] = React.useState(() => {
    const result = sample(WORDS);
    console.info({ result });
    return result;
  });

  const remainingEmptyRows =
    attemptsTaken === NUM_OF_GUESSES_ALLOWED
      ? []
      : range(0, NUM_OF_GUESSES_ALLOWED - attemptsTaken).map(() => null);
  const completeGuessList = [...guessList, ...remainingEmptyRows];

  const restartGame = () => {
    const newAnswer = sample(WORDS);
    console.log({ newAnswer });
    setAnswer(newAnswer);
    setGuessList(defaultList);
    setIsCorrectGuess(false);
    setAttemptsTaken(0);
  };

  const handleChangeGuess = (event) => {
    const value = event.target.value.toUpperCase();
    setGuess(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (guess.length < 5) {
      return;
    }
    handleAddNextGuess(guess);
    setGuess("");
  };

  const handleScreenKeyboardSubmit = () => {
    if (guess.length < 5) {
      return;
    }
    handleAddNextGuess(guess);
    setGuess("");
  };

  const handleAddNextGuess = (nextWord) => {
    const checkedGuess = checkGuess(nextWord, answer);
    setAttemptsTaken(attemptsTaken + 1);
    setGuessList([...guessList, checkedGuess]);
    const result = checkedGuess.every((letter) => letter.status === "correct");
    setIsCorrectGuess(result);
  };

  const handleOnClick = (key) => {
    if (guess.length < 5) {
      setGuess(guess + key);
    }
  };

  const renderResult = () => {
    const status = getStatus(isCorrectGuess, attemptsTaken);
    if (status === "win") {
      return (
        <Banner status="happy">
          <p>
            <strong>Congratulations!</strong> Got it in{" "}
            <strong>{attemptsTaken} guesses</strong>.
          </p>
        </Banner>
      );
    }
    if (status === "lose") {
      return (
        <Banner status="sad">
          <p>
            Sorry, the correct answer is <strong>{answer}</strong>.
          </p>
        </Banner>
      );
    }
  };

  return (
    <>
      <GuessList guessList={completeGuessList} />
      <div className="input-reset-wrapper">
        <GuessInput
          guess={guess}
          onChange={handleChangeGuess}
          handleSubmit={handleSubmit}
          disabled={
            getStatus(isCorrectGuess, attemptsTaken) === "win" ||
            getStatus(isCorrectGuess, attemptsTaken) === "lose"
          }
        />
        <button className="reset-button" onClick={() => restartGame()}>
          Restart
        </button>
      </div>
      {renderResult()}
      <ScreenKeyboard
        onClick={handleOnClick}
        onSubmit={handleScreenKeyboardSubmit}
        keys={keysWithStatus(keysParsed, guessList)}
      />
    </>
  );
}

export default Game;
