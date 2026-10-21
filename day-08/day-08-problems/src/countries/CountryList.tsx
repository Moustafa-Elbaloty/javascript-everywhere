
import { Link, useSearchParams } from "react-router";
import { COUNTRIES, type Region } from "./data";

const REGIONS: Region[] = ["Africa", "Asia", "Europe", "Americas"];

export default function CountryList() {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = (searchParams.get("q") ?? "").trim().toLowerCase();
  const requestedRegion = searchParams.get("region");
  const region = REGIONS.find((item) => item === requestedRegion);
  const sort = searchParams.get("sort") === "pop" ? "pop" : "name";

  const matching = COUNTRIES
    .filter((country) => country.name.toLowerCase().includes(query))
    .filter((country) => !region || country.region === region)
    .sort((a, b) =>
      sort === "pop"
        ? b.population - a.population || a.name.localeCompare(b.name)
        : a.name.localeCompare(b.name)
    );

  const pageValue = Number(searchParams.get("page"));
  const requestedPage =
    Number.isInteger(pageValue) && pageValue >= 1 ? pageValue : 1;

  const totalPages = Math.ceil(matching.length / 5);
  const page = totalPages === 0 ? 1 : Math.min(requestedPage, totalPages);
  const visible = matching.slice((page - 1) * 5, page * 5);

  function updateParams(
    changes: Record<string, string | null>,
    replace = false
  ) {
    const next = new URLSearchParams(searchParams);

    for (const [key, value] of Object.entries(changes)) {
      if (value === null || value === "") next.delete(key);
      else next.set(key, value);
    }

    setSearchParams(next, { replace });
  }

  return (
    <section>
      <h1>Country Explorer</h1>

      <label>
        Search countries
        <input
          type="search"
          value={searchParams.get("q") ?? ""}
          onChange={(event) =>
            updateParams(
              { q: event.target.value || null, page: null },
              true
            )
          }
        />
      </label>

      <label>
        Region
        <select
          value={region ?? ""}
          onChange={(event) =>
            updateParams(
              { region: event.target.value || null, page: null }
            )
          }
        >
          <option value="">All regions</option>
          {REGIONS.map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>
      </label>

      <button
        type="button"
        onClick={() =>
          updateParams({ sort: sort === "name" ? "pop" : null })
        }
      >
        Sort: {sort === "name" ? "Name (A–Z)" : "Population (largest first)"}
      </button>

      {visible.length === 0 ? (
        <p>No countries match.</p>
      ) : (
        <ul>
          {visible.map((country) => (
            <li key={country.code}>
              <Link to={`/countries/${country.code}`}>
                {country.name} — {country.population} M
              </Link>
            </li>
          ))}
        </ul>
      )}

      {matching.length > 0 && (
        <div>
          <p>Page {page} of {totalPages} · {matching.length} countries</p>
          <button
            type="button"
            disabled={page <= 1}
            onClick={() => updateParams({ page: String(page - 1) })}
          >
            Previous
          </button>{" "}
          <button
            type="button"
            disabled={page >= totalPages}
            onClick={() => updateParams({ page: String(page + 1) })}
          >
            Next
          </button>
        </div>
      )}
    </section>
  );
}
