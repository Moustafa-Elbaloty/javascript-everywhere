
import { Link, useParams } from "react-router";
import { COUNTRIES } from "./data";

export default function CountryDetail() {
  const { code } = useParams();

  const country = COUNTRIES.find(
    (item) => item.code === code?.toUpperCase()
  );

  if (!country) {
    return (
      <section>
        <h1>Country not found.</h1>
        <Link to="/countries">Back to countries</Link>
      </section>
    );
  }

  return (
    <section>
      <h1>{country.name} ({country.code})</h1>
      <p>{country.region}</p>
      <p>{country.population} million</p>
      <Link to="/countries">Back to countries</Link>
    </section>
  );
}
