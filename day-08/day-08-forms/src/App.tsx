import { Navigate, Route, Routes } from "react-router";
import {
  About,
  Home,
  Lesson,
  Lessons,
  NotFound,
  Shell,
} from "./routing/pages";
import { Fruit } from "./routing/Fruit";
import { SharedLayout, PageA, PageB } from "./routing/Shared";
import { SavingRoute } from "./routing/SavingRoute";

export default function App() {
  return (
    <Routes>
      <Route element={<Shell />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="lessons" element={<Lessons />} />
        <Route path="lessons/:n" element={<Lesson />} />
        <Route path="old-about" element={<Navigate to="/about" replace />} />
        <Route path="fruit" element={<Fruit />} />
        <Route path="saving" element={<SavingRoute />} />
        <Route path="shared" element={<SharedLayout />}>
          <Route index element={<PageA />} />
          <Route path="b" element={<PageB />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
