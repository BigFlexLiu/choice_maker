import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import "../index.css";
import Elimination from "./elimination";
import Guide from "./guide";

function Home() {
  const [value, setValue] = useState("");
  const [list, setList] = useState([]);
  const [eliminating, setEliminating] = useState(false);
  const [isTutorialShown, setIsTutorialShown] = useState(false);

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

  useEffect(() => {
    setList(value.split(/[\n,]+/).map((item) => item.trim()));
  }, [value]);

  useEffect(() => {
    setValue("");
  }, [eliminating]);

  const updateValue = (event) => {
    setValue(event.target.value);
  };

  if (!isTutorialShown) {
    return <Guide setIsTutorialShown={setIsTutorialShown}></Guide>;
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
      value={value}
      multiline={true}
      onChange={updateValue}
    ></TextField>
  );

  return (
    <div className="App">
      <div className="spacer"></div>
      <div>{input}</div>
      <div className="list-container">
        {list.map((item, index) => (
          <p className="list-item">{item}</p>
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
