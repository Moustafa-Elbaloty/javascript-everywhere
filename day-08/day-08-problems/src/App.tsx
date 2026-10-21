
import {
  BrowserRouter,
  Navigate,
  NavLink,
  Route,
  Routes,
} from "react-router";
import BookingForm from "./booking/BookingForm";
import CountryList from "./countries/CountryList";
import CountryDetail from "./countries/CountryDetail";

function NotFound() {
  return <h1>Page not found.</h1>;
}

function AppRoutes() {
  return (
    <>
      <header>
        <nav aria-label="Main navigation">
          <NavLink to="/booking">Booking</NavLink>
          {" | "}
          <NavLink to="/countries">Countries</NavLink>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/countries" replace />} />
          <Route path="/booking" element={<BookingForm />} />
          <Route path="/countries" element={<CountryList />} />
          <Route path="/countries/:code" element={<CountryDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

