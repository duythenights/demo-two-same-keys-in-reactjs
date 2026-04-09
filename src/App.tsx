import { useState } from "react";
import "./App.css";

const DuplicateKeyBlog = () => {
  const [items, setItems] = useState([
    { id: "1", text: "Item A" },
    { id: "1", text: "Item B" }, // Duplicate ID
    { id: "3", text: "Item C" },
    { id: "4", text: "Item D" },
  ]);

  const removeA = () => {
    setItems(items.filter((item) => item.text !== "Item A"));
  };

  const idCount: Record<string, number> = {};
  items.forEach((item) => {
    idCount[item.id] = (idCount[item.id] || 0) + 1;
  });

  return (
    <div className="demo-container">
      <header className="demo-header">
        <h1>Duplicate Keys in React</h1>
        <p>
          Two items share the same <code>key</code>. Type in the inputs, then
          remove Item A and watch the DOM glitch.
        </p>
      </header>

      <div className="demo-card">
        <div className="demo-actions">
          <button className="btn btn-danger" onClick={removeA}>
            Remove Item A
          </button>
        </div>

        <ul className="item-list">
          {items.map((item) => {
            const isDuplicate = idCount[item.id] > 1;
            return (
              <li
                key={item.id}
                className={`item-row${isDuplicate ? " duplicate" : ""}`}
              >
                <span className="item-id">{item.id}</span>
                <span className="item-text">{item.text}</span>
                <input className="item-input" placeholder="Type here…" />
                {isDuplicate && (
                  <span className="badge-duplicate">dup</span>
                )}
              </li>
            );
          })}
        </ul>

        <div className="demo-footer">
          <p>
            Items A and B share <code>key="1"</code>. When A is removed, React
            reuses B's DOM node for the remaining <code>key="1"</code> element
            — <strong>input state gets swapped</strong>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DuplicateKeyBlog;
