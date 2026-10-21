import { useState } from "react";
import type { SubmitEvent } from "react";
import { pretendToSave } from "./fakeApi";

export function Saving() {
  const [title, setTitle] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState<string[]>([]);

  async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    if (submitting || title.trim() === "") return;

    setError("");
    setSubmitting(true);

    try {
      await pretendToSave(title);
      setSaved((prev) => [...prev, title.trim()]);
      setTitle("");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="save-title">
          Title (type "fail" to see an error)
        </label>
        <input
          id="save-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={submitting}
        />
      </div>

      {error && (
        <p role="alert" className="error">
          {error}
        </p>
      )}

      <button type="submit" disabled={submitting || title.trim() === ""}>
        {submitting ? "Saving…" : "Save"}
      </button>

      <ul>
        {saved.map((item, index) => (
          <li key={`${item}-${index}`}>{item}</li>
        ))}
      </ul>
    </form>
  );
}
