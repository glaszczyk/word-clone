export const Guess = ({ guess }) => {
  return (
    <p className="guess">
      {guess.map((letter, i) => (
        <span key={`${letter}-${i}`} className="cell">
          {letter}
        </span>
      ))}
    </p>
  );
};
