import React, { useState } from "react";
import { Mail, Lock, User, ArrowRight } from "lucide-react";

import { useUserLogin } from "../hooks/useLogin";
//import { useNavigate } from "react-router-dom";
import { useUserRegister } from "../hooks/useRegister";
//import { supabase } from "../superbaseClient";


interface AuthProps {
  initialMode?: "login" | "register";
}

const Auth: React.FC<AuthProps> = ({ initialMode = "login" }) => {
  const { userLogin } = useUserLogin();
  const { userRegister } = useUserRegister();
  const [isLogin, setIsLogin] = useState(initialMode === "login");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [isVisible, setIsVisible] = useState(false)

  const visibilityHandler= () => {
    setIsVisible(!isVisible)
  }

  //const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { email, password, fullName, phone, confirmPassword } = formData;

    if (!isLogin && password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const userData = isLogin
        ? await userLogin(email, password)
        : await userRegister(email, password, fullName, phone);

      if (userData) {
        window.location.href = isLogin
          ? userData.role === "admin"
            ? "/admin"
            : "/dashboard"
          : "/login";
      }
    } catch (error) {
      console.error("Authentication error:", error);
    }
  };

  const handleGoogleLogin = async () => {
    // try {
    //   const { error } = await supabase.auth.signInWithOAuth({
    //     provider: "google",
    //     options: {
    //       redirectTo: window.location.origin, // ✅ Redirect to your app after login
    //     },
    //   });

    //   if (error) {
    //     console.error("Google Sign-In error:", error.message);
    //   }
    // } catch (error) {
    //   console.error("Google authentication failed:", error);
    // }
    console.log("Google login");
  };



  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-lg">
        {/* Logo and Title */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            {isLogin ? "Welcome Back!" : "Create Account"}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {isLogin
              ? "Sign in to access your account"
              : "Join us and start your journey"}
          </p>
        </div>

        {/* Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Name Field - Only show for registration */}
            {!isLogin && (
              <>
                <div>
                  <label htmlFor="name" className="sr-only">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      className="appearance-none relative block w-full pl-10 pr-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-[#0FFCBE] focus:border-[#0FFCBE] focus:z-10 sm:text-sm"
                      placeholder="Full Name"
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="phone" className="sr-only">
                    Phone
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="phone"
                      name="phone"
                      type="text"
                      required
                      className="appearance-none relative block w-full pl-10 pr-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-[#0FFCBE] focus:border-[#0FFCBE] focus:z-10 sm:text-sm"
                      placeholder="Phone"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                    />
                  </div>
                </div>
              </>
            )}

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="appearance-none relative block w-full pl-10 pr-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-[#0FFCBE] focus:border-[#0FFCBE] focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={isVisible ? "text" : "password"}
                  required
                  className="appearance-none relative block w-full pl-10 pr-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-[#0FFCBE] focus:border-[#0FFCBE] focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />

                {/* Password visibility toggle */}
                <button
                  type="button"
                  onClick={visibilityHandler}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0FFCBE] transition-colors duration-300"
                  aria-label={isVisible ? "Hide password" : "Show password"}
                >
                  {isVisible ? <p>Hide</p> : <p>show</p>}
                </button>
              </div>
            </div>

            {/* Confirm Password Field - Only show for registration */}
            {!isLogin && (
              <div>
                <label htmlFor="confirmPassword" className="sr-only">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={isVisible ? "text" : "password"}
                    required
                    className="appearance-none relative block w-full pl-10 pr-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-[#0FFCBE] focus:border-[#0FFCBE] focus:z-10 sm:text-sm"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        confirmPassword: e.target.value,
                      })
                    }
                  />
                  {/* Password visibility toggle */}
                  <button
                    type="button"
                    onClick={visibilityHandler}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0FFCBE] transition-colors duration-300"
                    aria-label={isVisible ? "Hide password" : "Show password"}
                  >
                    {isVisible ? <p>Hide</p> : <p>show</p>}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Forgot Password Link - Only show for login */}
          {isLogin && (
            <div className="flex items-center justify-end">
              <a
                href="#"
                className="text-sm font-medium text-[#106EBE] hover:text-[#0FFCBE] transition-colors"
              >
                Forgot your password?
              </a>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-[#106EBE] hover:bg-[#0FFCBE] hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0FFCBE] transition-colors duration-300"
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
            {isLogin ? "Sign In" : "Create Account"}
          </button>

          {/* Google Auth Button */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="relative w-full flex justify-center py-3 px-4 border-2 border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0FFCBE] transition-colors"
          >
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google"
              className="h-5 w-5 mr-2"
            />
            Continue with Google
          </button>
        </form>

        {/* Toggle between Login and Register */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="ml-2 font-medium text-[#106EBE] hover:text-[#0FFCBE] transition-colors"
            >
              {isLogin ? "Register here" : "Sign in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
