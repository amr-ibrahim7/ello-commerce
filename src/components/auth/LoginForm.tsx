"use client";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, Mail, Lock, AlertCircle } from "lucide-react";
import Link from "next/link";
import { handleLogin } from "@/lib/services/api/auth";
import { LoginFormValues } from "@/lib/types/auth";
import { useMutation } from "@tanstack/react-query";
import { useUserAuth } from "@/context/AuthContext";
import { setAuthCookie } from "@/lib/services/handlecookies";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(1, "Password is required")
    .required("Password is required"),
});

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();
  const { setToken } = useUserAuth();

  const loginMutation = useMutation({
    mutationFn: (values: LoginFormValues) => handleLogin(values),
    onSuccess: (data) => {
      setToken(data?.token);
      setAuthCookie(data?.token);
      signOut({ redirect: false });
      router.push("/");
    },
    onError: (error: any) => {
      console.error("Login error:", error);
    },
  });

  const formik = useFormik<LoginFormValues>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      loginMutation.mutate(values);
    },
    validateOnMount: true,
    validateOnBlur: true,
    validateOnChange: true,
  });

  const handleGoogleSignIn = async () => {
    // Google sign in logic
  };

  return (
    <div className="space-y-4">
      {loginMutation.error && (
        <Alert className="bg-destructive/10 border-destructive/20">
          <AlertCircle className="h-4 w-4 text-destructive" />
          <AlertDescription className="text-destructive">
            {loginMutation.error?.response?.data?.message || "Login failed. Please try again."}
          </AlertDescription>
        </Alert>
      )}

      {loginMutation.isSuccess && (
        <Alert className="bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800">
          <AlertCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-600">
            Login successful! Redirecting...
          </AlertDescription>
        </Alert>
      )}

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        {/* Email Field */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-foreground">
            Email Address
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              className={`pl-10 bg-background/50 border-border ${
                formik.touched.email && formik.errors.email
                  ? "border-destructive"
                  : ""
              }`}
              {...formik.getFieldProps("email")}
            />
          </div>
          {formik.touched.email && formik.errors.email && (
            <p className="text-destructive text-sm">{formik.errors.email}</p>
          )}
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <Label htmlFor="password" className="text-foreground">
            Password
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className={`pl-10 pr-10 bg-background/50 border-border ${
                formik.touched.password && formik.errors.password
                  ? "border-destructive"
                  : ""
              }`}
              {...formik.getFieldProps("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          {formik.touched.password && formik.errors.password && (
            <p className="text-destructive text-sm">{formik.errors.password}</p>
          )}
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="remember"
              checked={rememberMe}
              onCheckedChange={setRememberMe}
              className="border-border"
            />
            <Label
              htmlFor="remember"
              className="text-sm text-muted-foreground cursor-pointer"
            >
              Remember me
            </Label>
          </div>
          <Link
            href="/forgotpassword"
            className="text-sm text-primary hover:text-primary/80"
          >
            Forgot password?
          </Link>
        </div>

        <Button
          type="submit"
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          disabled={
            !(formik.isValid && formik.dirty) || loginMutation.isPending
          }
        >
          {loginMutation.isPending ? "Signing in..." : "Sign In"}
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      <Button
        type="button"
        variant="outline"
        className="w-full bg-background/50 border-border hover:bg-accent"
        onClick={handleGoogleSignIn}
        disabled={loginMutation.isPending}
      >
        <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
        </svg>
        {loginMutation.isPending ? "Signing in..." : "Google"}
      </Button>

      <div className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link
          href="/auth/register"
          className="text-primary hover:text-primary/80 font-medium"
        >
          Create account
        </Link>
      </div>
    </div>
  );
}