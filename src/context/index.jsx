import React from "react";
import PropTypes from "prop-types";

export const MaterialTailwind = React.createContext(null);
MaterialTailwind.displayName = "MaterialTailwindContext";

export function reducer(state, action) {
  switch (action.type) {
    case "OPEN_SIDENAV": {
      return { ...state, openSidenav: action.value };
    }
    case "SIDENAV_TYPE": {
      return { ...state, sidenavType: action.value };
    }
    case "SIDENAV_COLOR": {
      return { ...state, sidenavColor: action.value };
    }
    case "TRANSPARENT_NAVBAR": {
      return { ...state, transparentNavbar: action.value };
    }
    case "FIXED_NAVBAR": {
      return { ...state, fixedNavbar: action.value };
    }
    case "OPEN_CONFIGURATOR": {
      return { ...state, openConfigurator: action.value };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

export function MaterialTailwindControllerProvider({ children }) {
  const initialState = {
    openSidenav: false,
    sidenavColor: "dark",
    sidenavType: "white",
    transparentNavbar: true,
    fixedNavbar: false,
    openConfigurator: false,
  };

  const [controller, dispatch] = React.useReducer(reducer, initialState);
  const value = React.useMemo(
    () => [controller, dispatch],
    [controller, dispatch]
  );

  return (
    <MaterialTailwind.Provider value={value}>
      {children}
    </MaterialTailwind.Provider>
  );
}

export function useMaterialTailwindController() {
  const context = React.useContext(MaterialTailwind);

  if (!context) {
    throw new Error(
      "useMaterialTailwindController should be used inside the MaterialTailwindControllerProvider."
    );
  }

  return context;
}

MaterialTailwindControllerProvider.displayName = "/src/context/index.jsx";

MaterialTailwindControllerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const setOpenSidenav = (dispatch, value) =>
  dispatch({ type: "OPEN_SIDENAV", value });
export const setSidenavType = (dispatch, value) =>
  dispatch({ type: "SIDENAV_TYPE", value });
export const setSidenavColor = (dispatch, value) =>
  dispatch({ type: "SIDENAV_COLOR", value });
export const setTransparentNavbar = (dispatch, value) =>
  dispatch({ type: "TRANSPARENT_NAVBAR", value });
export const setFixedNavbar = (dispatch, value) =>
  dispatch({ type: "FIXED_NAVBAR", value });
export const setOpenConfigurator = (dispatch, value) =>
  dispatch({ type: "OPEN_CONFIGURATOR", value });

// ***********************************
import { createContext, useState, useEffect, useContext } from "react";
import { auth } from "@/services/firebase";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [internalUserForContext, setinternalUserForContext] = useState(null);
  const [loading, setLoading] = useState(true);
  const [identityToken, setToken] = useState(null);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [company, setCompany] = useState(null);

  const login = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    setUser(userCredential.user);
    // setinternalUserForContext(userCredential.user);
    getTokenFromBackend(userCredential.user.uid);
  };

  const signup = async (email, password, username, company) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    setEmail(email);
    setPassword(password);
    setUsername(username);
    setCompany(company);
    // setUser(userCredential.user);
    setinternalUserForContext(userCredential.user);
    await getTokenFromBackend(userCredential.user.uid);
  };

  const registerUserToDB = async (
    uid,
    email,
    password,
    username,
    company,
    token
  ) => {
    var formdata = new FormData();
    formdata.append("uid", uid);
    formdata.append("email", email);
    formdata.append("password", password);
    formdata.append("username", username);
    formdata.append("company", company);

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch("http://127.0.0.1:205/user/create?token=" + token, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        console.log(internalUserForContext);
        setUser(internalUserForContext);
        return result;
      })
      .catch((error) => {
        console.log("error", error);
        return error;
      });
  };

  const logout = async () => {
    const userCredential = await signOut(auth);
    setUser(null);
  };

  async function getTokenFromBackend(uid) {
    /*
      Gets token from backend based on uid.
    */
    const apiUrl = "http://127.0.0.1:105/apigwt";
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
    const registers = async () => {
      if (identityToken) {
        localStorage.setItem("user_token", identityToken);
        console.log("User token: " + identityToken);
      }
      if (internalUserForContext) {
        await registerUserToDB(
          internalUserForContext.uid,
          email,
          password,
          username,
          company,
          identityToken
        );
      }
    };
    registers();
  }, [identityToken]);

  // TRIGGERED AT EACH PAGE REFRESH!
  // Listen to the Firebase Auth state and set the user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setLoading(false); // Set loading to false once the user is fetched
        getTokenFromBackend(user.uid);
      } else {
        setUser(null);
        setLoading(false); // Set loading to false once the user is fetched
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        loading,
        identityToken,
        registerUserToDB,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
// ***********************************

import { fetchUser } from "@/services/user";
import { fetchProjects } from "@/services/project";
import { fetchCompany } from "@/services/company";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [projectsData, setProjectsData] = useState(null);
  const [companyData, setCompanyData] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const getUserData = async () => {
      if (user) {
        const usr = await fetchUser(user.uid);
        // console.log(usr);
        setUserData(usr);
      } else {
        // console.log("no user yet...");
      }
    };

    const getProjectsData = async () => {
      if (user) {
        const projects = await fetchProjects(user.uid);
        setProjectsData(projects);
      } else {
        // console.log("no user to fetch projects yet...");
      }
    };

    const getCompany = async () => {
      if (user) {
        const company = await fetchCompany(user.uid);
        setCompanyData(company);
      } else {
        // console.log("no user to fetch projects yet...");
      }
    };

    getUserData();
    getCompany();
    getProjectsData();
  }, [user]);

  return (
    <AppContext.Provider value={{ userData, projectsData, companyData }}>
      {children}
    </AppContext.Provider>
  );
};
