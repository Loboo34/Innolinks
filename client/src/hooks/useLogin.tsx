import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  id: number;
}

export const useUserLogin = () => {
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { dispatch } = useAuthContext();

  const userLogin = async (email: string, password: string) => {
    setLoading(true);
    setError("");
    try {
      const loginResponse = await fetch(
        "http://localhost:3000/api/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const loginData = await loginResponse.json();
      if (!loginResponse.ok) {
        throw new Error(loginData.message || "Login failed");
      }

      console.log("Login response data", loginData);

      if (!loginData.token) {
        throw new Error("No token found in response");
      }
      const decodedToken = jwtDecode<DecodedToken>(loginData.token);
      console.log("Decoded token", decodedToken);
      const userId = decodedToken.id;
      if (!userId) {
        throw new Error("No user ID found in response");
      }

      localStorage.setItem("token", loginData.token);

      const profileResponse = await fetch(
        `http://localhost:3000/api/users/profile/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${loginData.token}`,
          },
        }
      );

      const profileData = await profileResponse.json();
      console.log("Profile response data", profileData);

      if (!profileData) {
        throw new Error("No profile data found in response");
      }

      const mergedUser = { ...profileData, token: loginData.token };

      localStorage.setItem("user", JSON.stringify(mergedUser));

      dispatch({ type: "LOGIN", payload: mergedUser });
      //console.log("User logged in", mergedUser);

      return mergedUser;
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return { userLogin, error, loading };
};
