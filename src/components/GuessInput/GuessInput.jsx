import React from "react";

export const GuessInput = ({ guess, onChange, handleSubmit, disabled }) => {
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
        onChange={onChange}
        disabled={disabled}
      />
    </form>
  );
};
