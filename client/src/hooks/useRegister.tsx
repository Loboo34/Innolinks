import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useUserRegister = () => {
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { dispatch } = useAuthContext();

  const userRegister = async (
    email: string,
    password: string,
    fullName: string,
    phone: string
  ) => {
    setLoading(true);
    setError("");
    try {
      const registerResponse = await fetch(
        "http://localhost:3000/api/users/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password, fullName, phone }),
        }
      );

      const registerData = await registerResponse.json();
      if (!registerResponse.ok) {
        throw new Error(registerData.message || "Register failed");
      }

      console.log("Register response data", registerData);

      if (registerResponse.ok) {
        console.log("Register success");
        localStorage.setItem("user", JSON.stringify(registerData));
      }
      dispatch({ type: "LOGIN", payload: registerData });
      return registerData;
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

  return { userRegister, error, loading };
};
