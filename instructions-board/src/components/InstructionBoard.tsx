import React, { useState } from "react";

interface Instruction {
  id: number;
  text: string;
}

const InstructionsBoard: React.FC = () => {
  const [instructions, setInstructions] = useState<Instruction[]>([]);

  const [newInstruction, setNewInstruction] = useState<string>("");

  // Add a new instruction
  const addInstruction = () => {
    if (newInstruction.trim()) {
      setInstructions([
        ...instructions,
        { id: instructions.length + 1, text: newInstruction },
      ]);
      setNewInstruction("");
    }
  };

  // Move instruction up
  const moveUp = (index: number) => {
    if (index > 0) {
      const updated = [...instructions];
      [updated[index - 1], updated[index]] = [
        updated[index],
        updated[index - 1],
      ];
      setInstructions(updated);
    }
  };

  // Move instruction down
  const moveDown = (index: number) => {
    if (index < instructions.length - 1) {
      const updated = [...instructions];
      [updated[index], updated[index + 1]] = [
        updated[index + 1],
        updated[index],
      ];
      setInstructions(updated);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Instructions Board</h1>
      <div style={styles.form}>
        <input
          type="text"
          value={newInstruction}
          onChange={(e) => setNewInstruction(e.target.value)}
          placeholder="Enter a new instruction"
          style={styles.input}
        />
        <button onClick={addInstruction} style={styles.addButton}>
          Add
        </button>
      </div>
      <ul style={styles.list}>
        {instructions.map((instruction, index) => (
          <li key={instruction.id} style={styles.item}>
            <span>
              {instruction.id}. {instruction.text}
            </span>
            <div style={styles.buttons}>
              <button
                style={styles.button}
                onClick={() => moveUp(index)}
                disabled={index === 0}
              >
                Move Up
              </button>
              <button
                style={styles.button}
                onClick={() => moveDown(index)}
                disabled={index === instructions.length - 1}
              >
                Move Down
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "600px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    border: "1px solid #ccc",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  },
  title: {
    fontSize: "24px",
    textAlign: "center" as const,
    marginBottom: "20px",
  },
  list: {
    listStyleType: "none",
    padding: 0,
  },
  item: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "4px",
    border: "1px solid #ddd",
  },
  buttons: {
    display: "flex",
    gap: "10px",
  },
  button: {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    padding: "5px 10px",
    cursor: "pointer",
    borderRadius: "4px",
    fontSize: "12px",
    disabled: {
      backgroundColor: "#ccc",
    },
  },
  form: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
  },
  input: {
    flex: 1,
    marginRight: "10px",
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  addButton: {
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    padding: "8px 15px",
    cursor: "pointer",
    borderRadius: "4px",
  },
};

export default InstructionsBoard;
