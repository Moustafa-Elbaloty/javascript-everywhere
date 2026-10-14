# Day 07 - Warm-up Predictions

  1. Object in JSX

- Prediction: I think React will show the user object on the page, like a normal text.
- Actual result: React shows an error because an object cannot be rendered directly as a child.
- Why, if wrong: I learned that I can show a property like user.name instead of the whole object.

  2. Empty list

- Prediction: I think the page will be completely empty because there are no items.
- Actual result: The number 0 appears on the page.
- Why, if wrong: The items.length value is 0, and the && operator returns 0.

  3. Normal variable in React

- Prediction - console: I think the console will show the count after every click.
- Prediction - button: I think the button number will also increase because count changes.
- Actual result: The console shows 1, 2, and 3 after three clicks, but the button still shows 0.
- Why, if wrong: Changing a normal variable does not make React render the component again.

  4. setState three times

- Prediction: I think one click will add 3 because setN is called three times.
- Actual result: After one click, the button shows 1.
- Why, if wrong: All three calls use the same old value of n.

  5. Functional updater

- Prediction: I think the number will increase by 1 because I clicked only once.
- Actual result: After one click, the button shows 3.
- Why, if wrong: Each updater receives the previous update's result, so all three updates are applied.

  6. Changing an array in state

- Prediction: I think the list will show 1, 2, 3 after one click because I added the number 3.
- Actual result: The array changes, but the screen may still show 1,2.
- Why, if wrong: I learned that changing the same array does not give React a new reference to detect the change.
