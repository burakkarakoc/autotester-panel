import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import { useAuth } from "@/context";
import { Progress } from "@material-tailwind/react";
import { useState, useEffect } from "react";

function App() {
  const { user, loading } = useAuth();
  const [token, setToken] = useState("");

  function getTokenFromBackend(uid) {
    /*
      Gets token from backend based on uid.
    */
    const apiUrl = "http://127.0.0.1:105/controller/login_success";
    const data = { uid: uid };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    fetch(apiUrl, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setToken(data.token);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  useEffect(() => {
    if (user) {
      console.log(user.uid);
      getTokenFromBackend(user.uid);
    }
  }, [user]);

  useEffect(() => {
    if (token !== "") {
      // Save the token to local storage
      localStorage.setItem("user_token", token);
      console.log("User token: " + token);
    }
  }, [token]);

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full flex-col gap-4">
        {/* <Progress value={25} size="sm" />
        <Progress value={50} size="md" /> */}
        <Progress value={75} size="lg" />
      </div>
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
