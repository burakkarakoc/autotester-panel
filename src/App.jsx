import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";

function App() {
  const path = window.location.pathname.replace("/dashboard", "");

  return (
    <Routes>
      {["/home", "/profile", "/tables", "/plans"].includes(path) && (
        <Route path="/dashboard/*" element={<Dashboard />} />
      )}
      <Route path="/auth/*" element={<Auth />} />
      <Route path="*" element={<Navigate to="/dashboard/home" />} />

      {/* <Route path="*" element={<Navigate to="/dashboard/home" />} /> */}
      {/* <Route path="*" element={<Navigate to="/dashboard/home" />} /> */}
    </Routes>
  );
}

export default App;
