import React, { useState } from "react";
import { AiFillCaretUp, AiFillCaretDown } from "react-icons/ai";
import "./InstructionStyle.css";

interface Instruction {
  id: number;
  instruction: string;
}

const InstructionBoard = () => {
  const [instructions, setInstructions] = useState<Instruction[]>([]);
  const [newInstruction, setNewInstruction] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewInstruction(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newInstruction) {
      setInstructions((prev) => [
        ...prev,
        {
          id: prev.length ? prev[prev.length - 1].id + 1 : 1,
          instruction: newInstruction,
        },
      ]);
      setNewInstruction("");
    }
  };

  const moveUp = (id: number) => {
    if (id > 0) {
      const updated = [...instructions];
      [updated[id - 1], updated[id]] = [updated[id], updated[id - 1]];
      setInstructions(updated);
    }
  };

  const moveDown = (id: number) => {
    if (id < instructions.length - 1) {
      const updated = [...instructions];
      [updated[id + 1], updated[id]] = [updated[id], updated[id + 1]];
      setInstructions(updated);
    }
  };

  return (
    <div className="container">
      <form className="main-section" onSubmit={handleSubmit}>
        <input
          type="text"
          value={newInstruction}
          onChange={handleChange}
          placeholder="Enter new instruction"
        />
        <button type="submit">Add Instruction</button>
      </form>
      {instructions.length > 0 && (
        <div className="items-section">
          <ul>
            {instructions.map((item, index) => (
              <li className="items" key={item.id}>
                <span className="instruction-text">{item.instruction}</span>
                <div className="icons">
                  <span onClick={() => moveDown(index)}>
                    <AiFillCaretDown />
                  </span>
                  <span onClick={() => moveUp(index)}>
                    <AiFillCaretUp />
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default InstructionBoard;
