import { useRef, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { fakeBook } from "./fakeApi";
import {
  validateBooking,
  type BookingErrors,
  type BookingValues,
} from "./validate";

type Field = keyof BookingValues;
type Status = "idle" | "submitting" | "error" | "done";

const fields: Field[] = [
  "name",
  "email",
  "phone",
  "seats",
  "date",
  "terms",
];

const initialValues: BookingValues = {
  name: "",
  email: "",
  phone: "",
  seats: "1",
  date: "",
  terms: false,
};

function todayISO(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export default function BookingForm() {
  const [values, setValues] = useState<BookingValues>(initialValues);
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [apiError, setApiError] = useState("");
  const submitting = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);

  const errors: BookingErrors = validateBooking(values, todayISO());

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, type, value, checked } = event.currentTarget;
    const field = name as Field;

    setValues((current) => ({
      ...current,
      [field]: type === "checkbox" ? checked : value,
    }));

    if (status === "error") {
      setStatus("idle");
      setApiError("");
    }
  }

  function handleBlur(event: ChangeEvent<HTMLInputElement>) {
    const field = event.currentTarget.name as Field;
    setTouched((current) => ({ ...current, [field]: true }));
  }

  function visibleError(field: Field): string | undefined {
    if (!touched[field] && !submitAttempted) return undefined;
    return errors[field];
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (submitting.current || status === "done") return;

    setSubmitAttempted(true);
    setApiError("");

    const firstInvalid = fields.find((field) => errors[field]);

    if (firstInvalid) {
      formRef.current
        ?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)
        ?.focus();
      return;
    }

    submitting.current = true;
    setStatus("submitting");

    try {
      await fakeBook(values);
      setStatus("done");
    } catch (error: unknown) {
      setApiError(
        error instanceof Error ? error.message : "Something went wrong.",
      );
      setStatus("error");
    } finally {
      submitting.current = false;
    }
  }

  if (status === "done") {
    const date = new Date(`${values.date}T12:00:00`).toLocaleDateString(
      "en-GB",
      { weekday: "long", day: "2-digit", month: "long" },
    );
    const seats = Number(values.seats);
    return (
      <main className="booking-page">
        <section className="booking-card" aria-live="polite">
          <h1>Booking confirmed</h1>
          <p>
            See you on {date}, {values.name.trim()} — {seats}{" "}
            {seats === 1 ? "seat" : "seats"} booked.
          </p>
        </section>
      </main>
    );
  }

  return (
    <main className="booking-page">
      <section className="booking-card">
        <p className="eyebrow">WORKSHOP RESERVATION</p>
        <h1>Book your seat</h1>
        <p className="subtitle">Fill in your details to reserve your place.</p>

        <form ref={formRef} onSubmit={handleSubmit} noValidate>
          {/* Use our own validation messages instead of browser validation bubbles. */}
          <div className="field">
            <label htmlFor="booking-name">Name</label>
            <input
              id="booking-name"
              name="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="name"
              aria-invalid={visibleError("name") ? true : undefined}
              aria-describedby={
                visibleError("name") ? "booking-name-error" : undefined
              }
            />
            {visibleError("name") && (
              <p className="field-error" id="booking-name-error">
                {visibleError("name")}
              </p>
            )}
          </div>

          <div className="field">
            <label htmlFor="booking-email">Email</label>
            <input
              id="booking-email"
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="email"
              aria-invalid={visibleError("email") ? true : undefined}
              aria-describedby={
                visibleError("email") ? "booking-email-error" : undefined
              }
            />
            {visibleError("email") && (
              <p className="field-error" id="booking-email-error">
                {visibleError("email")}
              </p>
            )}
          </div>

          <div className="field">
            <label htmlFor="booking-phone">Mobile number</label>
            <input
              id="booking-phone"
              name="phone"
              type="tel"
              value={values.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="tel"
              aria-invalid={visibleError("phone") ? true : undefined}
              aria-describedby={
                visibleError("phone") ? "booking-phone-error" : undefined
              }
            />
            {visibleError("phone") && (
              <p className="field-error" id="booking-phone-error">
                {visibleError("phone")}
              </p>
            )}
          </div>

          <div className="field">
            <label htmlFor="booking-seats">Seats (1–4)</label>
            <input
              id="booking-seats"
              name="seats"
              type="number"
              min="1"
              max="4"
              value={values.seats}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={visibleError("seats") ? true : undefined}
              aria-describedby={
                visibleError("seats") ? "booking-seats-error" : undefined
              }
            />
            {visibleError("seats") && (
              <p className="field-error" id="booking-seats-error">
                {visibleError("seats")}
              </p>
            )}
          </div>

          <div className="field">
            <label htmlFor="booking-date">Date</label>
            <input
              id="booking-date"
              name="date"
              type="date"
              min={todayISO()}
              value={values.date}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={visibleError("date") ? true : undefined}
              aria-describedby={
                visibleError("date") ? "booking-date-error" : undefined
              }
            />
            {visibleError("date") && (
              <p className="field-error" id="booking-date-error">
                {visibleError("date")}
              </p>
            )}
          </div>

          <div className="field terms-field">
            <label htmlFor="booking-terms">
              <input
                id="booking-terms"
                name="terms"
                type="checkbox"
                checked={values.terms}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={visibleError("terms") ? true : undefined}
                aria-describedby={
                  visibleError("terms") ? "booking-terms-error" : undefined
                }
              />
              I accept the terms and conditions
            </label>
            {visibleError("terms") && (
              <p className="field-error" id="booking-terms-error">
                {visibleError("terms")}
              </p>
            )}
          </div>

          {apiError && (
            <p className="api-error" role="alert">
              {apiError}
            </p>
          )}

          <button type="submit" disabled={status === "submitting"}>
            {status === "submitting" ? "Booking…" : "Book"}
          </button>
        </form>
      </section>
    </main>
  );
}
