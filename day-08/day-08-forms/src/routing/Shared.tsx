import { useState } from "react";
import { Link, Outlet, useOutletContext } from "react-router";

interface Shared {
  count: number;
  increment: () => void;
}

export function SharedLayout() {
  const [count, setCount] = useState(0);
  const context: Shared = {
    count,
    increment: () => setCount((c) => c + 1),
  };

  return (
    <>
      <h2>Shared State Lab</h2>
      <nav>
        <Link to="/shared">Page A</Link>{" | "}
        <Link to="/shared/b">Page B</Link>
      </nav>
      <p>Layout says: {count}</p>
      <Outlet context={context} />
    </>
  );
}

export function PageA() {
  const { count, increment } = useOutletContext<Shared>();
  return <button onClick={increment}>A: {count}</button>;
}

export function PageB() {
  const { count } = useOutletContext<Shared>();
  const [local, setLocal] = useState(0);

  return (
    <>
      <p>B sees: {count}</p>
      <button onClick={() => setLocal((n) => n + 1)}>
        local: {local}
      </button>
    </>
  );
}
