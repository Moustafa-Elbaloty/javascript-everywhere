import { useState } from "react";

interface Item {
  readonly id: number;
  name: string;
  qty: number;
}

interface ShoppingRowProps {
  item: Item;
  onIncrease: (id: number) => void;
  onDecrease: (id: number) => void;
  onRemove: (id: number) => void;
}

function ShoppingRow({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}: ShoppingRowProps) {
  function handleIncreaseThree() {
    onIncrease(item.id);
    onIncrease(item.id);
    onIncrease(item.id);
  }

  return (
    <li>
      {item.name} ×{item.qty}{" "}
      <button onClick={() => onDecrease(item.id)}>-</button>{" "}
      <button onClick={() => onIncrease(item.id)}>+</button>{" "}
      <button onClick={handleIncreaseThree}>+3</button>{" "}
      <button onClick={() => onRemove(item.id)}>Remove</button>
    </li>
  );
}

// Component tree: ShoppingList -> ShoppingRow.
// ShoppingList owns the items state; ShoppingRow receives an item and handlers.
export function ShoppingList() {
  const [items, setItems] = useState<Item[]>([]);
  const [name, setName] = useState("");
  const [nextId, setNextId] = useState(1);

  function addItem() {
    const trimmedName = name.trim();
    if (trimmedName === "") return;

    const existingItem = items.find(
      (item) => item.name.trim().toLowerCase() === trimmedName.toLowerCase()
    );

    if (existingItem) {
      setItems((currentItems) =>
        currentItems.map((item) =>
          item.id === existingItem.id
            ? { ...item, qty: item.qty + 1 }
            : item
        )
      );
    } else {
      setItems((currentItems) => [
        ...currentItems,
        { id: nextId, name: trimmedName, qty: 1 },
      ]);
      setNextId((currentId) => currentId + 1);
    }

    setName("");
  }

  function increaseItem(id: number) {
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  }

  function decreaseItem(id: number) {
    setItems((currentItems) =>
      currentItems
        .map((item) =>
          item.id === id ? { ...item, qty: item.qty - 1 } : item
        )
        .filter((item) => item.qty > 0)
    );
  }

  function removeItem(id: number) {
    setItems((currentItems) => currentItems.filter((item) => item.id !== id));
  }

  const totalUnits = items.reduce((total, item) => total + item.qty, 0);

  return (
    <main>
      <h1>Shopping List</h1>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          addItem();
        }}
      >
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Enter item name"
        />
        <button type="submit">Add</button>
      </form>

      {items.length === 0 ? (
        <p>Your list is empty.</p>
      ) : (
        <>
          <ul>
            {items.map((item) => (
              <ShoppingRow
                key={item.id}
                item={item}
                onIncrease={increaseItem}
                onDecrease={decreaseItem}
                onRemove={removeItem}
              />
            ))}
          </ul>
          <p>
            {items.length} {items.length === 1 ? "item" : "items"} ·{" "}
            {totalUnits} {totalUnits === 1 ? "unit" : "units"}
          </p>
        </>
      )}
    </main>
  );
}
