import { createElement, useState } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createMemoryRouter, matchRoutes, useParams } from "react-router";

function Example1() {
  const [t] = useState("");
  return createElement("input", { value: t });
}

function Detail() {
  const { id } = useParams();
  return createElement("p", null, `Detail:${id}`);
}

function NewTask() {
  return createElement("p", null, "NewTask");
}

function Example5() {
  const { n } = useParams();
  return createElement("p", null, `${typeof n} ${n === 3}`);
}

function main() {
  console.log("1. Controlled input:");
  console.log("   Rendered HTML:", renderToStaticMarkup(createElement(Example1)));
  console.log("   Expected: value remains empty; typing cannot update state without onChange.");

  const age = "";
  console.log("2. Empty number input:");
  console.log("   Number(age):", Number(age));
  console.log("   age === 0:", age === (0 as unknown as string));

  console.log("3. Cancel button:");
  console.log("   Default button type:", "submit");
  console.log("   Clicking Cancel submits the form unless the button has type='button'.");

  const routes = [
    { path: "/tasks/:id", element: createElement(Detail) },
    { path: "/tasks/new", element: createElement(NewTask) },
  ];

  for (const pathname of ["/tasks/new", "/tasks/7"]) {
    const matches = matchRoutes(routes, pathname);
    console.log(`4. ${pathname}:`, matches?.at(-1)?.route.path);
  }

  const paramsRouter = createMemoryRouter(
    [{ path: "/lessons/:n", element: createElement(Example5) }],
    { initialEntries: ["/lessons/3"] },
  );

  const n = paramsRouter.state.matches.at(-1)?.params.n;
  console.log("5. useParams:");
  console.log("   typeof n:", typeof n);
  console.log("   n === 3:", n === (3 as unknown as string));

  const historyEntries = ["", "?q=r", "?q=re", "?q=rea", "?q=reac", "?q=react"];
  console.log("6. Search history:");
  console.log("   URL entries after typing:", historyEntries.length - 1);
  console.log("   Back presses to undo the five updates:", 5);
  console.log("   One more Back can leave the page if an earlier page exists.");

  paramsRouter.dispose();
}

main();
