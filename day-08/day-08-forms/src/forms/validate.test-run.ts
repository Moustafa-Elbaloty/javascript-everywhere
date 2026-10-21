import { INITIAL, hasErrors, validate } from "./validate.ts";

console.log(Object.keys(validate(INITIAL)).join(","));
console.log(
  validate({
    ...INITIAL,
    name: "Sara",
    email: "a@b.co",
    password: "abcdefg1",
    agree: true,
  }),
);
console.log(validate({ ...INITIAL, password: "abcdefgh" }).password);
console.log(hasErrors({}));
