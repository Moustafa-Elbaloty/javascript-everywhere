import { useId, useState } from "react";
import type { ChangeEvent, FocusEvent, SubmitEvent } from "react";
import { INITIAL, hasErrors, validate } from "./validate";
import type { Values } from "./validate";

type FieldName = keyof Values;
type ValidatedField = "name" | "email" | "password" | "agree";

export function Signup() {
  const [values, setValues] = useState<Values>({ ...INITIAL });
  const [touched, setTouched] = useState<
    Partial<Record<FieldName, boolean>>
  >({});
  const [submitted, setSubmitted] = useState(false);
  const id = useId();

  const errors = validate(values);

  function show(name: ValidatedField) {
    return touched[name] || submitted ? errors[name] : undefined;
  }

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    const { name, value } = e.target;

    const next =
      e.target instanceof HTMLInputElement && e.target.type === "checkbox"
        ? e.target.checked
        : value;

    setValues((prev) => ({ ...prev, [name]: next }));
  }

  function handleBlur(e: FocusEvent<HTMLInputElement>) {
    const name = e.target.name as FieldName;
    setTouched((prev) => ({ ...prev, [name]: true }));
  }

  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
    setTouched({
      name: true,
      email: true,
      password: true,
      agree: true,
    });

    if (hasErrors(errors)) {
      e.currentTarget
        .querySelector<HTMLElement>('[aria-invalid="true"]')
        ?.focus();
      return;
    }

    console.log("Valid signup:", values);
  }

  function handleReset() {
    setValues({ ...INITIAL });
    setTouched({});
    setSubmitted(false);
  }

  return (
    <form onSubmit={handleSubmit} onReset={handleReset} noValidate>
      <div className="field">
        <label htmlFor={`${id}-name`}>Name</label>
        <input
          id={`${id}-name`}
          name="name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={show("name") ? true : undefined}
          aria-describedby={show("name") ? `${id}-name-error` : undefined}
        />
        {show("name") && (
          <p id={`${id}-name-error`} className="error">
            {show("name")}
          </p>
        )}
      </div>

      <div className="field">
        <label htmlFor={`${id}-email`}>Email</label>
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={show("email") ? true : undefined}
          aria-describedby={show("email") ? `${id}-email-error` : undefined}
        />
        {show("email") && (
          <p id={`${id}-email-error`} className="error">
            {show("email")}
          </p>
        )}
      </div>

      <div className="field">
        <label htmlFor={`${id}-password`}>Password</label>
        <input
          id={`${id}-password`}
          name="password"
          type="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={show("password") ? true : undefined}
          aria-describedby={
            show("password") ? `${id}-password-error` : undefined
          }
        />
        {show("password") && (
          <p id={`${id}-password-error`} className="error">
            {show("password")}
          </p>
        )}
      </div>

      <div className="field">
        <label htmlFor={`${id}-role`}>I am a…</label>
        <select
          id={`${id}-role`}
          name="role"
          value={values.role}
          onChange={handleChange}
        >
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </select>
      </div>

      <div className="field">
        <label>
          <input
            type="checkbox"
            name="agree"
            checked={values.agree}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={show("agree") ? true : undefined}
            aria-describedby={show("agree") ? `${id}-agree-error` : undefined}
          />
          {" "}I accept the terms
        </label>
        {show("agree") && (
          <p id={`${id}-agree-error`} className="error">
            {show("agree")}
          </p>
        )}
      </div>

      <div className="actions">
        <button type="submit">Create account</button>
        <button type="reset">Reset</button>
      </div>
    </form>
  );
}
