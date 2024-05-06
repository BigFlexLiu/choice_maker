import { useEffect, useState } from "react";
import "../index.css";

const Elimination = (props) => {
  const [items, setItems] = useState([...props.items]);
  const [currentChoices, setCurrentChoices] = useState([]);
  const [showAllItems, setShowAllItems] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);

  const decisionTime = 10000; // ms
  const decisionTimeUpdateInterval = 10;

  // Get new choices and refresh decision time when items change
  useEffect(() => {
    setCurrentChoices(getTwoItems());
    setTimeElapsed(0);
  }, [items]);

  // Update timeElapsed every 10ms
  useEffect(() => {
    if (timeElapsed >= decisionTime) {
      setCurrentChoices(getTwoItems());
      setTimeElapsed(0);
    }
    const interval = setInterval(incrementProgress, decisionTimeUpdateInterval);

    return () => clearInterval(interval);
  }, [timeElapsed]);

  const incrementProgress = () => {
    if (timeElapsed < decisionTime) {
      setTimeElapsed(timeElapsed + decisionTimeUpdateInterval);
    }
  };

  const removeItem = (item) => {
    setItems(items.filter((i) => i !== item));
  };

  // Get two random items
  // If there are less than two items, return an empty array
  const getTwoItems = () => {
    if (items.length < 2) {
      return [];
    }
    const randomIndex = Math.floor(Math.random() * items.length);
    let randomIndex2;
    do {
      randomIndex2 = Math.floor(Math.random() * items.length);
    } while (randomIndex2 === randomIndex);
    return [items[randomIndex], items[randomIndex2]];
  };

  if (items.length === 0) {
    return <h1>There is no item to choose from</h1>;
  }

  if (items.length === 1) {
    return (
      <div>
        <div
          style={{
            position: "fixed",
            top: "30%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <h1>The best choice is: {items[0]}</h1>
        </div>
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
        <button onClick={() => props.setEliminating(false)}>
          <h1>Make another choice</h1>
        </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1>Pick the one you prefer</h1>
      <div className="elimination-choices">
        <button onClick={() => removeItem(currentChoices[1])}>
          {currentChoices[0]}
        </button>
        <div className="mini-spacer"></div>
        <button onClick={() => removeItem(currentChoices[0])}>
          {currentChoices[1]}
        </button>
      </div>
      {
        <progress
          style={{ width: "100%" }}
          value={timeElapsed}
          max={decisionTime}
        ></progress>
      }
      <div style={{ minHeight: "20vh" }}></div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h1>
          {items.length} / {props.items.length} items left
        </h1>
        <div className="mini-spacer"></div>
        <button onClick={() => setShowAllItems(!showAllItems)}>
          <h1>Show items</h1>
        </button>
      </div>
      {showAllItems && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div className="list-container">
            {props.items.map((item, index) => {
              if (!items.includes(item)) {
                const style = {
                  textDecoration: "line-through",
                  backgroundColor: "#fff",
                };
                return (
                  <div
                    key={item}
                    className="flex-container"
                  >
                    <p
                      className="list-item"
                      style={style}
                    >
                      {item}
                    </p>
                  </div>
                );
              }
              return (
                <div
                  key={index}
                  className="flex-container"
                >
                  <p className="list-item">{item}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Elimination;
