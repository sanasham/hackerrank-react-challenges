import { useState } from "react";

import "./App.css";
import InstructionBoard from "./components/InstructionBoard";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <InstructionBoard />
    </>
  );
}

export default App;
