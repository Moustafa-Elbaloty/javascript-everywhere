export interface BookingValues {
  name: string;
  email: string;
  phone: string;
  seats: string;
  date: string;
  terms: boolean;
}

export type BookingErrors = Partial<
  Record<keyof BookingValues, string>
>;

function validateName(name: string): string | undefined {
  const value = name.trim();

  if (!value) return "Name is required";
  if (value.length < 2) return "Use at least 2 characters";

  return undefined;
}

function validateEmail(email: string): string | undefined {
  const value = email.trim();

  if (!value) return "Email is required";

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    return "Enter an email like name@example.com";
  }

  return undefined;
}

function validatePhone(phone: string): string | undefined {
  const value = phone.replace(/ /g, "");

  if (!value) return "Phone is required";

  if (!/^01[0125]\d{8}$/.test(value)) {
    return "Enter a mobile number like 010 1234 5678";
  }

  return undefined;
}

function validateSeats(seats: string): string | undefined {
  const value = seats.trim();

  if (!/^\d+$/.test(value)) return "Book 1 to 4 seats";

  const count = Number(value);

  if (count < 1 || count > 4) return "Book 1 to 4 seats";

  return undefined;
}

function validateDate(
  date: string,
  today: string,
): string | undefined {
  if (!date) return "Pick a date";

  if (date < today) return "That date has passed";

  if (new Date(`${date}T00:00`).getDay() === 5) {
    return "We're closed on Fridays";
  }

  return undefined;
}

export function validateBooking(
  values: BookingValues,
  today: string,
): BookingErrors {
  const errors: BookingErrors = {};

  const nameError = validateName(values.name);
  if (nameError) errors.name = nameError;

  const emailError = validateEmail(values.email);
  if (emailError) errors.email = emailError;

  const phoneError = validatePhone(values.phone);
  if (phoneError) errors.phone = phoneError;

  const seatsError = validateSeats(values.seats);
  if (seatsError) errors.seats = seatsError;

  const dateError = validateDate(values.date, today);
  if (dateError) errors.date = dateError;

  if (!values.terms) {
    errors.terms = "Accept the terms to continue";
  }

  return errors;
}
