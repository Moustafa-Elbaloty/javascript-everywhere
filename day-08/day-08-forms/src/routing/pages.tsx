import { Link, NavLink, Outlet, useParams } from "react-router";

export function Shell() {
  return (
    <div>
      <nav aria-label="Lab">
        <NavLink to="/" end>Home</NavLink>{" | "}
        <NavLink to="/about">About</NavLink>{" | "}
        <NavLink to="/lessons">Lessons</NavLink>
      </nav>

      <hr />
      <Outlet />
    </div>
  );
}

export const Home = () => <h2>Home</h2>;

export const About = () => <h2>About</h2>;

export function Lessons() {
  return (
    <>
      <h2>Lessons</h2>
      <ul>
        {[1, 2, 3].map((n) => (
          <li key={n}>
            <Link to={`/lessons/${n}`}>Lesson {n}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export function Lesson() {
  const { n } = useParams();

  return (
    <>
      <h2>Lesson {n}</h2>
      <p>typeof n → {typeof n}</p>
      <Link to="/lessons">Back</Link>
    </>
  );
}

export const NotFound = () => <h2>404 — nothing here</h2>;
