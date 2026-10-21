import { useState } from "react";
import type { SubmitEvent } from "react";
import { useNavigate } from "react-router";
import { pretendToSave } from "../forms/fakeApi";

export function SavingRoute() {
  const [title, setTitle] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting || !title.trim()) return;

    setSubmitting(true);
    setError("");

    try {
      await pretendToSave(title);
      navigate("/lessons", { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <h2>Save and Redirect</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="saving-title">Title (type "fail" to test error)</label>
        <input
          id="saving-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={submitting}
        />
        {error && <p role="alert" className="error">{error}</p>}
        <button disabled={submitting || !title.trim()}>
          {submitting ? "Saving…" : "Save"}
        </button>
      </form>
    </>
  );
}
