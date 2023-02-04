import React from "react";

export const GuessInput = () => {
  const [guess, setGuess] = React.useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(">>>>>", guess);
    setGuess("");
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setGuess(value.toUpperCase());
  };

  return (
    <form className="guess-input-wrapper" onSubmit={handleSubmit}>
      <label htmlFor="guess-input">Enter guess:</label>
      <input
        id="guess-input"
        type="text"
        value={guess}
        minLength={5}
        maxLength={5}
        onChange={handleChange}
      />
    </form>
  );
};
