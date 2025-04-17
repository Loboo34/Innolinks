import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // If using React Router
import { supabase } from "../superbaseClient";

interface Session {
  user: {
    email: string;
  };
}

function Login() {
  const [session, setSession] = useState<Session | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Get session on page load
    const fetchSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session as Session | null);

      // Redirect if session exists
      if (session) {
        navigate("/dashboard");
      }
    };

    fetchSession();

    // Listen for authentication state changes
    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session as Session | null);
        if (session) {
          navigate("/dashboard"); // Redirect after login
        }
      }
    );

    return () => subscription.subscription.unsubscribe();
  }, [navigate]);

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
      });

      if (error) {
        console.error("Google Sign-In error:", error.message);
      }
    } catch (error) {
      console.error("Google authentication failed:", error);
    }
  };

  return (
    <div>
      {!session ? (
        <button onClick={handleGoogleLogin}>Sign in with Google</button>
      ) : (
        <p>Redirecting...</p>
      )}
    </div>
  );
}

export default Login;
