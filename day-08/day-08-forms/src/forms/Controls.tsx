import { useState } from "react";

export function Controls() {
  const [text, setText] = useState("");
  const [notes, setNotes] = useState("");
  const [color, setColor] = useState("teal");
  const [subscribed, setSubscribed] = useState(false);
  const [size, setSize] = useState("m");
  const [age, setAge] = useState("");
  const [date, setDate] = useState("");

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <label>
        Text
        <input value={text} onChange={(e) => setText(e.target.value)} />
      </label>

      <label>
        Notes
        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} />
      </label>

      <label>
        Colour
        <select value={color} onChange={(e) => setColor(e.target.value)}>
          <option value="teal">Teal</option>
          <option value="amber">Amber</option>
          <option value="rose">Rose</option>
        </select>
      </label>

      <label>
        <input
          type="checkbox"
          checked={subscribed}
          onChange={(e) => setSubscribed(e.target.checked)}
        />
        Subscribe
      </label>

      <fieldset>
        <legend>Size</legend>
        {["s", "m", "l"].map((s) => (
          <label key={s}>
            <input
              type="radio"
              name="size"
              value={s}
              checked={size === s}
              onChange={(e) => setSize(e.target.value)}
            />
            {" "}{s}
          </label>
        ))}
      </fieldset>

      <label>
        Age
        <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
      </label>

      <label>
        Date
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </label>

      <pre>{JSON.stringify({ text, notes, color, subscribed, size, age, date }, null, 2)}</pre>
    </form>
  );
}
