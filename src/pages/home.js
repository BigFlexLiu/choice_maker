import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import "../index.css";
import Elimination from "./elimination";
import Introduction from "./introduction";

function Home() {
  const [inputValue, setInputValue] = useState("");
  const [list, setList] = useState([]);
  const [eliminating, setEliminating] = useState(false);
  const [isTutorialShown, setIsTutorialShown] = useState(false);

  // Remove duplicates and empty strings
  useEffect(() => {
    if (list.length !== new Set(list).size) {
      setList([...new Set(list)]);
      return;
    }
    if (list.includes("")) {
      setList(list.filter((item) => item !== ""));
      return;
    }
  }, [list]);

  // Split input by comma or new line
  useEffect(() => {
    setList(inputValue.split(/[\n,]+/).map((item) => item.trim()));
  }, [inputValue]);

  // Reset input value
  useEffect(() => {
    if (!eliminating) {
      setInputValue("");
    }
  }, [eliminating]);

  const updateInputValue = (event) => {
    setInputValue(event.target.value);
  };

  if (!isTutorialShown) {
    return <Introduction setIsTutorialShown={setIsTutorialShown}></Introduction>;
  }

  if (eliminating) {
    return (
      <Elimination
        items={list}
        setEliminating={setEliminating}
      />
    );
  }

  let input = (
    <TextField
      style={{ width: "60vw" }}
      label="Add items separated by a comma or a new line"
      variant="outlined"
      value={inputValue}
      multiline={true}
      onChange={updateInputValue}
    ></TextField>
  );

  return (
    <div className="App">
      <div className="spacer"></div>
      <h1>Add Items</h1>
      <div>{input}</div>
      <div className="list-container">
        {list.map((item, index) => (
          <p key={item} className="list-item">{item}</p>
        ))}
      </div>
      <div
        className="button"
        onClick={() => setEliminating(true)}
      >
        Start
      </div>
    </div>
  );
}

export default Home;
