import React, { useState } from "react";
import "./index.css";

const initialItems = [
  { position: 1, name: "Item1", score: 0 },
  { position: 2, name: "Item2", score: 0 },
  { position: 3, name: "Item3", score: 0 },
  { position: 4, name: "Item4", score: 0 },
  { position: 5, name: "Item5", score: 0 },
  { position: 6, name: "Item6", score: 0 },
];

const App = () => {
  const [items, setItems] = useState(initialItems);
  const [comparisons, setComparisons] = useState([]);

  const handleButtonClick = () => {
    const newComparisons = [];
    for (let i = 0; i < items.length - 1; i++) {
      for (let j = i + 1; j < items.length; j++) {
        newComparisons.push([items[i], items[j]]);
      }
    }
    setComparisons(newComparisons);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const score1 = parseInt(event.target.elements.score1.value);
    const score2 = parseInt(event.target.elements.score2.value);

    if (!isNaN(score1) && !isNaN(score2)) {
      const [itemA, itemB] = comparisons[0];
      const updatedItems = items.map((item) => {
        if (item.name === itemA.name) {
          return { ...item, score: item.score + (score1 > score2 ? 1 : 0) };
        }
        if (item.name === itemB.name) {
          return { ...item, score: item.score + (score2 > score1 ? 1 : 0) };
        }
        return item;
      });

      const updatedComparisons = comparisons.slice(1);
      setItems(updatedItems);

      if (updatedComparisons.length === 0) {
        const sortedItems = [...updatedItems].sort((a, b) => b.score - a.score);
        setItems(sortedItems);
      }

      setComparisons(updatedComparisons);
    }
  };

  const sortedItems = [...items].sort((a, b) => b.score - a.score);

  sortedItems.forEach((item, index) => {
    item.position = index + 1;
  });

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col justify-center items-center font-sourceCodePro">
      <h1 className="text-4xl font-bold text-blue-900 mb-8">List Comparison</h1>
      <ul className="w-64 bg-white shadow rounded-lg mb-8">
        {sortedItems.map((item) => (
          <li key={item.position} className="border-b p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-semibold text-blue-900">
                  {item.name}
                </p>
                <p className="text-blue-600">Position: {item.position}</p>
              </div>
              <p className="text-xl font-bold text-blue-900">{item.score}</p>
            </div>
          </li>
        ))}
      </ul>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
        onClick={handleButtonClick}
        disabled={comparisons.length > 0}
      >
        Start Comparison
      </button>
      {comparisons.length > 0 && (
        <form className="mt-8" onSubmit={handleFormSubmit}>
          <div className="flex items-center mb-4">
            <p className="mr-2 text-blue-900">{comparisons[0][0].name}</p>
            <input
              type="number"
              name="score1"
              required
              className="border rounded-lg py-2 px-3 mr-2 w-16 text-center"
              defaultValue={0}
            />
            <input
              type="number"
              name="score2"
              required
              className="border rounded-lg py-2 px-3 w-16 text-center"
              defaultValue={0}
            />
            <p className="ml-2 text-blue-900">{comparisons[0][1].name}</p>
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default App;
