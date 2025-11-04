"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader } from "@/components/forms/CustomCard";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import { CusInput } from "@/components/forms/CusInput";
import { CusCheckbox } from "@/components/forms/CustomCheckbox";
import {
  LoginFormValues,
  loginSchema,
  SignUpFormValues,
  signUpSchema,
} from "@/schemas/auth/login.schema";

type LoginResponse = {
  success: boolean;
  token?: string;
  message?: string;
};

export default function AuthPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  // Login form
  const {
    register: loginRegister,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
    reset: resetLogin,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  // Signup form
  const {
    register: signupRegister,
    handleSubmit: handleSignupSubmit,
    formState: { errors: signupErrors },
    reset: resetSignup,
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
  });

  // ✅ Login submit uses only callApi
  const onLoginSubmit = async (data: LoginFormValues) => {
    setLoading(true);
    const payLoad = { usr: data.email, pwd: data.password };

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payLoad),
      });

      const result: LoginResponse = await res.json();

      console.log(result, "asfd", res);

      if (res.ok && result.success) {
        toast.success(result.message || "Login successful ✅");
        router.push("/");
        resetLogin();
      } else {
        toast.error(result.message || "Login failed ❌");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  // Signup submit (still using fetch)
  const onSignupSubmit = async (data: SignUpFormValues) => {
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (res.ok && result.success) {
        toast.success("Account created successfully 🎉");
        router.push("/");
        resetSignup();
      } else {
        toast.error(result.message || "Sign up failed");
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    resetLogin();
    resetSignup();
    setAcceptTerms(false);
  };

  return (
    <div className="flex h-screen w-full">
      {/* Left side image */}
      <div className="relative hidden w-1/2 lg:flex items-center justify-center text-white overflow-hidden z-0">
        <Image
          src="/assets/images/login_candidate.svg"
          alt="Auth Background"
          fill
          className="object-cover grayscale blur-xs"
          priority
        />
        <div className="relative z-10 flex flex-col items-center">
          <img
            src="/assets/logos/logo_w.png"
            alt="Logo"
            width={300}
            height={100}
          />
        </div>
      </div>

      {/* Right side form */}
      <div className="flex w-full lg:w-1/2 items-center justify-center bg-(--bg-candidate) z-10">
        <Card className="w-full max-w-md shadow-md shadow-[#000]/70 bg-(--login-bg) border-[#3C4056]">
          <CardHeader className="mb-4 text-center">
            <div className="flex w-full justify-center mt-4 mb-4">
              <img
                src="/assets/logos/logo_w.png"
                alt="logo"
                className="w-1/2"
              />
            </div>
            <p className="text-2xl font-bold">
              {isLogin ? "Login to your account" : "Signup"}
            </p>
            <p className="text-xs text-gray-300">
              {isLogin ? "Welcome back" : ""}
            </p>
          </CardHeader>
          <CardContent>
            {isLogin ? (
              // LOGIN FORM
              <form
                onSubmit={handleLoginSubmit(onLoginSubmit)}
                className="space-y-4"
              >
                <CusInput
                  label="Username / Email"
                  type="text"
                  error={loginErrors.email?.message}
                  {...loginRegister("email")}
                />
                <div className="relative">
                  <CusInput
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    error={loginErrors.password?.message}
                    {...loginRegister("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-8 flex items-center cursor-pointer"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                <Button className="w-full" type="submit" disabled={loading}>
                  {loading ? "Logging in..." : "Login"}
                </Button>
                <p className="mt-4 text-center text-xs mb-4">
                  Are you a new user?{" "}
                  <button
                    type="button"
                    onClick={toggleForm}
                    className="text-primary font-bold"
                  >
                    Sign Up
                  </button>
                </p>
              </form>
            ) : (
              // SIGNUP FORM
              <form
                onSubmit={handleSignupSubmit(onSignupSubmit)}
                className="space-y-2"
              >
                <CusInput
                  label="Full name"
                  {...signupRegister("username")}
                  error={signupErrors.username?.message}
                />
                <CusInput
                  label="Email"
                  type="email"
                  {...signupRegister("email")}
                  error={signupErrors.email?.message}
                />
                <div className="relative">
                  <CusInput
                    label="Password"
                    type={showSignupPassword ? "text" : "password"}
                    {...signupRegister("password")}
                    error={signupErrors.password?.message}
                  />
                  <button
                    type="button"
                    onClick={() => setShowSignupPassword(!showSignupPassword)}
                    className="absolute right-2 top-8 flex items-center cursor-pointer"
                  >
                    {showSignupPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                <div className="relative">
                  <CusInput
                    label="Confirm Password"
                    type={showConfirmPassword ? "text" : "password"}
                    {...signupRegister("confirmPassword")}
                    error={signupErrors.confirmPassword?.message}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-2 top-8 flex items-center cursor-pointer"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                <div className="flex items-center gap-2 mt-5">
                  <CusCheckbox
                    id="terms"
                    checked={acceptTerms}
                    onCheckedChange={(checked) => setAcceptTerms(!!checked)}
                  />
                  <p className="text-xs text-label">
                    By signing up, you agree to our{" "}
                    <a href="/terms" className="text-primary">
                      Terms of Service and Privacy Policy
                    </a>
                  </p>
                </div>
                <Button
                  className="w-full"
                  type="submit"
                  disabled={loading || !acceptTerms}
                >
                  {loading ? "Signing up..." : "Sign Up"}
                </Button>
                <p className="mt-4 text-center text-xs mb-4">
                  Already registered?{" "}
                  <button
                    type="button"
                    onClick={toggleForm}
                    className="text-primary font-bold"
                  >
                    Login
                  </button>
                </p>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
