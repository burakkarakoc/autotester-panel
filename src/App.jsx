import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import { useAuth } from "@/context";
import { Progress } from "@material-tailwind/react";
import { useState, useEffect } from "react";

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <center>
        <div className="flex flex-col items-center justify-center w-full flex-col gap-4">
          {/* <Progress value={25} size="sm" />
        <Progress value={50} size="md" /> */}
          <Progress value={75} size="lg" />
        </div>
      </center>
    );
  }

  return (
    <Routes>
      {user ? (
        // If logged in, show dashboard and related routes
        <Route path="/dashboard/*" element={<Dashboard />} />
      ) : (
        // If not logged in, show auth routes
        <Route path="/auth/*" element={<Auth />} />
      )}
      {/* Redirect based on login status */}
      <Route
        path="*"
        element={<Navigate to={user ? "/dashboard/home" : "/auth/sign-in"} />}
      />
    </Routes>
  );
}

export default App;
