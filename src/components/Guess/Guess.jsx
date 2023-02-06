import { range } from "../../utils";

export const Guess = ({ guess }) => {
  const renderGuessRow = (guess) => {
    return guess.map(({ letter, status }, i) => (
      <span key={`${letter}-${i}`} className={`cell ${status}`}>
        {letter}
      </span>
    ));
  };

  const renderEmptyRow = () => {
    return range(0, 5).map((id) => <span key={`${id}`} className="cell" />);
  };

  return (
    <p className="guess">{guess ? renderGuessRow(guess) : renderEmptyRow()}</p>
  );
};
