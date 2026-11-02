import { Route, Routes } from "react-router-dom";

import Layout from "./components/layout/Layout";
import PrivateRoute from "./routes/PrivateRoute";

import HomePage from "./pages/HomePage";
import CameraPage from "./pages/CameraPage";
import GalleryPage from "./pages/GalleryPage";
import ReferencesPage from "./pages/ReferencesPage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Rotas públicas */}
        <Route index element={<HomePage />} />
        <Route path="referencias" element={<ReferencesPage />} />
        <Route path="login" element={<LoginPage />} />

        {/* Rotas privadas: exigem sessão de demonstração */}
        <Route element={<PrivateRoute />}>
          <Route path="camera" element={<CameraPage />} />
          <Route path="galeria" element={<GalleryPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}