import type { BookingValues } from "./validate";

export async function fakeBook(values: BookingValues): Promise<void> {
  console.log("fakeBook called");
  await new Promise((resolve) => setTimeout(resolve, 800));

  if (values.email.trim().toLowerCase() === "notmoustafa@gmail.com") {
    throw new Error("This session is fully booked.");
  }
}
