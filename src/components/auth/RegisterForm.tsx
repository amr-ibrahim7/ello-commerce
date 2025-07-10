"use client";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff, Mail, Lock, User, Phone, MapPin, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useMutation } from "@tanstack/react-query";
import { handleRegister } from "@/lib/services/api/auth";
import { RegisterFormValues } from "@/lib/types/auth";

const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
        .matches(
          /^[A-Z][a-z0-9]{3,40}$/,
          "Password must start with an uppercase letter and be more than 5 characters"
        )
        .required("Enter Your Password"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
  address: Yup.string()
    .min(3, "Address must be at least 3 characters")
    .required("Address is required"),
  phone: Yup.string()
    .matches(/^[0-9]+$/, "Phone number must contain only digits")
    .min(10, "Phone number must be at least 10 digits")
    .required("Phone number is required"),
});

// Password requirements checker
const checkPasswordRequirements = (password: string) => {
  const requirements = [
    {
      text: "Start with uppercase letter",
      met: password.length > 0 && /^[A-Z]/.test(password),
      icon: "🔤"
    },
    {
      text: "At least 6 characters",
      met: password.length >= 6,
      icon: "📏"
    },
    {
      text: "Contains lowercase letters",
      met: /[a-z]/.test(password),
      icon: "🔡"
    },
    {
      text: "Contains numbers",
      met: /[0-9]/.test(password),
      icon: "🔢"
    }
  ];

  return requirements;
};

export default function RegisterForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // useMutation للتعامل مع الـ registration
  const registerMutation = useMutation({
    mutationFn: (values: RegisterFormValues) => handleRegister(values),
    onSuccess: (response) => {
      setErrorMsg("");
      setSuccessMsg(response.message || "Account created successfully! Redirecting to login...");
      
      // تحويل تلقائي للـ login بعد 2 ثانية
      setTimeout(() => {
        router.push("/auth/login");
      }, 2000);
    },
    onError: (error: any) => {
      setSuccessMsg("");
      setErrorMsg(error?.response?.data?.message || error?.message || "Registration failed");
      console.error("Registration error:", error);
    },
  });

  const formik = useFormik<RegisterFormValues>({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      address: "",
      phone: "",
    },
    validationSchema,
    onSubmit: (values) => {
      // التحقق من تطابق كلمة المرور
      if (values.password !== values.confirmPassword) {
        setErrorMsg("Passwords do not match");
        return;
      }
      
      // استخدام useMutation لإرسال البيانات
      registerMutation.mutate(values);
      
      // إعادة تعيين الفورم بعد الإرسال
      formik.resetForm();
    },
    validateOnMount: true,
    validateOnBlur: true,
    validateOnChange: true,
  });

  const handleGoogleSignIn = async () => {
    try {
      await signIn("google", { callbackUrl: "/" });
    } catch (error) {
      console.error("Google sign in error:", error);
      setErrorMsg("Google sign in failed");
    }
  };

  // Get password requirements
  const passwordRequirements = checkPasswordRequirements(formik.values.password);

  return (
    <div className="space-y-4">
      {errorMsg && (
        <Alert className="bg-destructive/10 border-destructive/20">
          <AlertCircle className="h-4 w-4 text-destructive" />
          <AlertDescription className="text-destructive">
            {errorMsg}
          </AlertDescription>
        </Alert>
      )}

      {successMsg && (
        <Alert className="bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800">
          <AlertCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-600">
            {successMsg}
          </AlertDescription>
        </Alert>
      )}

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        {/* Name Field */}
        <div className="space-y-2">
          <Label htmlFor="name" className="text-foreground">
            Full Name
          </Label>
          <div className="relative">
            <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="name"
              type="text"
              placeholder="Enter your full name"
              className={`pl-10 bg-background/50 border-border ${
                formik.touched.name && formik.errors.name
                  ? "border-destructive"
                  : ""
              }`}
              {...formik.getFieldProps("name")}
            />
          </div>
          {formik.touched.name && formik.errors.name && (
            <p className="text-destructive text-sm">{formik.errors.name}</p>
          )}
        </div>

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

        {/* Phone Field */}
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-foreground">
            Phone Number
          </Label>
          <div className="relative">
            <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="phone"
              type="tel"
              placeholder="Enter your phone number"
              className={`pl-10 bg-background/50 border-border ${
                formik.touched.phone && formik.errors.phone
                  ? "border-destructive"
                  : ""
              }`}
              {...formik.getFieldProps("phone")}
            />
          </div>
          {formik.touched.phone && formik.errors.phone && (
            <p className="text-destructive text-sm">{formik.errors.phone}</p>
          )}
        </div>

        {/* Address Field */}
        <div className="space-y-2">
          <Label htmlFor="address" className="text-foreground">
            Address
          </Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="address"
              type="text"
              placeholder="Enter your address"
              className={`pl-10 bg-background/50 border-border ${
                formik.touched.address && formik.errors.address
                  ? "border-destructive"
                  : ""
              }`}
              {...formik.getFieldProps("address")}
            />
          </div>
          {formik.touched.address && formik.errors.address && (
            <p className="text-destructive text-sm">{formik.errors.address}</p>
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
              placeholder="Create a password"
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
          
          {/* Password Requirements Indicator */}
          {formik.values.password && (
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground mb-2">Password requirements:</div>
              <div className="space-y-1">
                {passwordRequirements.map((req, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <span className="text-xs">{req.icon}</span>
                    <span className={`text-xs transition-colors ${
                      req.met 
                        ? 'text-green-600 dark:text-green-400' 
                        : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {req.text}
                    </span>
                    <span className={`text-xs ${
                      req.met 
                        ? 'text-green-600 dark:text-green-400' 
                        : 'text-gray-400'
                    }`}>
                      {req.met ? '✓' : '○'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {formik.touched.password && formik.errors.password && (
            <p className="text-destructive text-sm">{formik.errors.password}</p>
          )}
        </div>

        {/* Confirm Password Field */}
        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className="text-foreground">
            Confirm Password
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              className={`pl-10 pr-10 bg-background/50 border-border ${
                formik.touched.confirmPassword && formik.errors.confirmPassword
                  ? "border-destructive"
                  : ""
              }`}
              {...formik.getFieldProps("confirmPassword")}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <p className="text-destructive text-sm">{formik.errors.confirmPassword}</p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          disabled={
            !(formik.isValid && formik.dirty) || registerMutation.isPending
          }
        >
          {registerMutation.isPending ? "Creating Account..." : "Create Account"}
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
        disabled={registerMutation.isPending}
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
        Google
      </Button>

      <div className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/auth/login"
          className="text-primary hover:text-primary/80 font-medium"
        >
          Sign in
        </Link>
      </div>
    </div>
  );
}

// ahmed@email.com
// A12345a