import { useState } from "react";

const Statistics = ({
  good,
  bad,
  neutral,
}: {
  good: number;
  bad: number;
  neutral: number;
}) => {
  const total = good + neutral + bad;
  const average = (good + bad * -1) / total;
  const percentage = (good * 100) / total;
  return (
    <table>
      <tbody>
        <StatisticLine text="Good" value={good} />
        <StatisticLine text="Neutral" value={neutral} />
        <StatisticLine text="Bad" value={bad} />
        <StatisticLine text="All" value={total} />
        <StatisticLine text="Average" value={average} />
        <StatisticLine text="Positive" value={percentage} />
      </tbody>
    </table>
  );
};

const Button = ({
  text,
  handleClick,
}: {
  text: string;
  handleClick: () => void;
}) => <button onClick={handleClick}>{text}</button>;

const StatisticLine = ({ text, value }: { text: string; value: number }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const total = good + neutral + bad;

  return (
    <div>
      <h2>Give feedback</h2>
      <Button handleClick={() => setGood((prev) => prev + 1)} text="good" />
      <Button
        handleClick={() => setNeutral((prev) => prev + 1)}
        text="neutral"
      />
      <Button handleClick={() => setBad((prev) => prev + 1)} text="bad" />
      <h2>Statistics</h2>

      {total > 0 ? (
        <Statistics bad={bad} good={good} neutral={neutral} />
      ) : (
        <p>No feedback given</p>
      )}
    </div>
  );
}

export default App;
