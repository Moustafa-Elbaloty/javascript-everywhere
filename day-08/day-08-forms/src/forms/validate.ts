export interface Values {
  name: string;
  email: string;
  password: string;
  role: string;
  agree: boolean;
}

export type Errors = Partial<
  Record<"name" | "email" | "password" | "agree", string>
>;

export const INITIAL: Values = {
  name: "",
  email: "",
  password: "",
  role: "student",
  agree: false,
};

export function validate(values: Values): Errors {
  const errors: Errors = {};

  if (values.name.trim().length < 2) {
    errors.name = "Enter your name.";
  }

  if (!/^\S+@\S+\.\S+$/.test(values.email)) {
    errors.email = "Enter a valid email address.";
  }

  if (values.password.length < 8) {
    errors.password = "Use at least 8 characters.";
  } else if (!/\d/.test(values.password)) {
    errors.password = "Include at least one number.";
  }

  if (!values.agree) {
    errors.agree = "You need to accept the terms.";
  }

  return errors;
}

export function hasErrors(errors: Errors): boolean {
  return Object.keys(errors).length > 0;
}
