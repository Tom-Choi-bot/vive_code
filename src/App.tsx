import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AppProvider } from "./contexts/AppContext";
import { Splash } from "./pages/Splash";
import { Home } from "./pages/Home";
import { Pets } from "./pages/Pets";
import { Routines } from "./pages/Routines";
import { Calendar } from "./pages/Calendar";

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter basename="/readers">
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/home" element={<Home />} />
          <Route path="/pets" element={<Pets />} />
          <Route path="/routines" element={<Routines />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
