import React from "react";

export const GuessInput = ({ setGuessList }) => {
  const [guess, setGuess] = React.useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (guess.length < 5) {
      return;
    }
    console.log(">>>>>", guess);
    setGuessList(guess);
    setGuess("");
  };

  const handleChange = (event) => {
    const value = event.target.value.toUpperCase();
    setGuess(value);
  };

  return (
    <form className="guess-input-wrapper" onSubmit={handleSubmit}>
      <label htmlFor="guess-input">Enter guess:</label>
      <input
        id="guess-input"
        type="text"
        required
        value={guess}
        minLength={5}
        maxLength={5}
        onChange={handleChange}
      />
    </form>
  );
};
