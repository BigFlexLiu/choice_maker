"../index.css";

function Guide(props) {
  return (
    <div className="App">
      <div style={{ height: "10vh"}}></div>
      <h1>Motivation</h1>
      <p className="center-text">
        When given more than a handful of choices at once, people tend to do worse at
        evaluating them
      </p>
      <p className="center-text">
        This game will let you consider a pair of items at a time to bypass this
        issue
      </p>

      <h1>Decision Game</h1>
      <p className="center-text">Add items separated by new line or comma</p>
      <p className="center-text">Click start when you're ready</p>
      <p className="center-text">
        You will be asked to select one of two items to keep with time limit
      </p>
      <p className="center-text">The other item shown will be eliminated</p>
      <p className="center-text">
        If the time limit is reached, a new pair of items will be shown
      </p>
      <p className="center-text">This continues until only one item is left</p>

      <div style={{ height: "5vh"}}></div>
      <div className="button" 
        onClick={() => props.setIsTutorialShown(true)}
      >
        Start
      </div>
    </div>
  );
}

export default Guide;
