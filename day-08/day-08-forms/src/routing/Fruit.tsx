import { useSearchParams } from "react-router";

const FRUIT = ["apple", "apricot", "banana", "blueberry", "cherry", "date"];
const SORTS = ["asc", "desc"] as const;
type Sort = (typeof SORTS)[number];

function parseSort(raw: string | null): Sort {
  return SORTS.find((s) => s === raw) ?? "asc";
}

export function Fruit() {
  const [params, setParams] = useSearchParams();
  const q = params.get("q") ?? "";
  const sort = parseSort(params.get("sort"));

  function update(name: string, value: string, replace: boolean) {
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (value === "") next.delete(name);
        else next.set(name, value);
        return next;
      },
      { replace },
    );
  }

  const shown = FRUIT
    .filter((f) => f.includes(q.toLowerCase()))
    .sort((a, b) => sort === "asc" ? a.localeCompare(b) : b.localeCompare(a));

  return (
    <>
      <h2>Fruit Search</h2>
      <input
        value={q}
        onChange={(e) => update("q", e.target.value, true)}
        aria-label="Search"
        placeholder="Search fruit"
      />
      <button
        type="button"
        onClick={() => update("sort", sort === "asc" ? "desc" : "asc", false)}
      >
        Sort: {sort}
      </button>
      <ul>{shown.map((f) => <li key={f}>{f}</li>)}</ul>
    </>
  );
}
