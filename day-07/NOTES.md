# Day 07 - My Notes

  1. Props vs State

Props are passed from one component to another.
State is data that can change inside a component.
Both help React display data.

  2. Why I Never Mutate State

In my Shopping List, I used a new array to update the items.
I did not change the old array directly.
This helps React detect changes and update the screen.

  3. Derived vs Stored

I calculate the total units from the shopping list.
I do not store the total in state.
If I stored it, it could become wrong when the items change.

  4. One Real Bug

I tested the Rating component with a NaN value.
The component needed to handle invalid rating values.
I added a check for invalid numbers.
Now NaN shows zero stars.
