import React, { useState } from "react";

import Button from "../components/Button";
import Card from "../components/Card";

import {
  User,
  Shield
} from "lucide-react";


import {
  loginUser,
  registerUser,
} from "../api/authApi";

const AuthPage = ({
  login,
  showToast,
}) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "participant",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isLogin) {
        const res = await loginUser({
          email: formData.email,
          password: formData.password,
        });

        login(res.data.user, res.data.token);

      } else {

        await registerUser(formData);

        if (!isLogin) {

          if (!/^[A-Za-z ]+$/.test(formData.name)) {
            return showToast("Enter a valid name", "error");
          }

          if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            return showToast("Enter a valid email", "error");
          }

          if (!/^\d{10}$/.test(formData.phone)) {
            return showToast("Phone number must contain exactly 10 digits", "error");
          }

          if (formData.password.length < 8) {
            return showToast(
              "Password must be at least 8 characters",
              "error"
            );
          }
        }

        showToast(
          "Registration successful! Please log in."
        );

        setIsLogin(true);

        setFormData({
          name: "",
          email: "",
          password: "",
          phone: "",
          role: "participant",
        });

      }

    } catch (err) {

      showToast(
        err.response?.data?.message ||
        "Something went wrong",
        "error"
      );

    }
  }


  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

      <Card className="w-full max-w-md p-8 relative z-10" glass shadow>
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-[#FF8C42] to-[#4CAF50] flex items-center justify-center text-white font-bold text-3xl mb-4 shadow-lg">
            EK
          </div>
          <h2 className="text-3xl font-bold text-gray-900">{isLogin ? 'Welcome Back' : 'Join the Cause'}</h2>
          <p className="text-gray-500 mt-2">{isLogin ? 'Sign in to access your dashboard' : 'Create an account to start volunteering'}</p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: e.target.value.replace(/[^a-zA-Z\s]/g, ""),
                  })
                }
                className="w-full px-4 py-3 rounded-xl border border-gray-200"
                placeholder="John Doe"
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              required
              autoComplete="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  email: e.target.value.trim(),
                })
              }
              className="w-full px-4 py-3 rounded-xl border border-gray-200"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              required
              minLength={8}
              value={formData.password}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  password: e.target.value,
                })
              }
              className="w-full px-4 py-3 rounded-xl border border-gray-200"
              placeholder="••••••••"
            />
          </div>
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>

              <input
                type="tel"
                required
                inputMode="numeric"
                maxLength={10}
                pattern="[0-9]{10}"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    phone: e.target.value.replace(/\D/g, ""),
                  })
                }
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#FF8C42] outline-none"
                placeholder="9876543210"
              />
            </div>
          )}
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Register As
              </label>

              <select
                value={formData.role}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    role: e.target.value,
                  })
                }
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#FF8C42] outline-none"
              >
                <option value="participant">Participant</option>
                <option value="volunteer">Volunteer</option>
              </select>
            </div>
          )}
          {isLogin && (
            <div className="flex justify-end">
              <a href="#" className="text-sm text-[#FF8C42] font-medium hover:underline">Forgot password?</a>
            </div>
          )}

          <Button
            className="w-full py-3"
            type="submit"
          >
            {isLogin ? "Sign In" : "Create Account"}
          </Button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-8">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button onClick={() => setIsLogin(!isLogin)} className="text-[#FF8C42] font-bold hover:underline focus:outline-none">
            {isLogin ? 'Sign Up' : 'Log In'}
          </button>
        </p>
      </Card>
    </div>
  );
};


export default AuthPage;