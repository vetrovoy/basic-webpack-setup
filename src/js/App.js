import React from "react";
import { useState } from "react";

export default function App() {
  const [title, setTitle] = useState(null);

  const clickHandler = () => {
    const id = new Date().valueOf();

    setTitle(id);
  };

  return (
    <>
      <div>React App {title && title}</div>
      <button onClick={() => clickHandler()}>CLick me!</button>
    </>
  );
}
