import React from "react";

export const GuessInput = ({ setGuessList, disabled }) => {
  const [guess, setGuess] = React.useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (guess.length < 5) {
      return;
    }
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
        disabled={disabled}
      />
    </form>
  );
};
