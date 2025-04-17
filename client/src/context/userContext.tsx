import {
  createContext,
  useReducer,
  ReactNode,
  Dispatch,
  useEffect,
  useState,
} from "react";

export interface User {
  id: number;
  fullName: string;
  email: string;
  role: "user" | "admin";

  token?: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

type AuthAction = { type: "LOGIN"; payload: User } | { type: "LOGOUT" };

interface AuthContextType extends AuthState {
  dispatch: Dispatch<AuthAction>;
}


export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, isAuthenticated: true, user: action.payload };
    case "LOGOUT":
      return { ...state, isAuthenticated: false, user: null };
    default:
      return state;
  }
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [state, dispatch] = useReducer(authReducer, {
    isAuthenticated: false,
    user: null,
  });
  const [rehydrated, setRehydrated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      try {
        const user: User = JSON.parse(userData);
        dispatch({ type: "LOGIN", payload: user });
        // console.log("Rehydrated user data", user);
      } catch (error) {
        console.error("Failed to parse user data", error);
      }
    }
    setRehydrated(true);
  }, []);

  if (!rehydrated) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
