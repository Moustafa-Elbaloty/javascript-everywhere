import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
import Layout from "./Layout";
import TaskListPage from "./pages/TaskListPage";
import TaskFormPage from "./pages/TaskFormPage";
import TaskDetailPage from "./pages/TaskDetailPage";
import NotFoundPage from "./pages/NotFoundPage";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<TaskListPage />} />
          <Route path="/tasks/new" element={<TaskFormPage />} />
          <Route path="/tasks/:id" element={<TaskDetailPage />} />
          <Route path="/tasks/:id/edit" element={<TaskFormPage />} />
          <Route path="/tasks/:id/duplicate" element={<TaskFormPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
