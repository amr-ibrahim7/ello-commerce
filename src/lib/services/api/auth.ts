
import { AuthResponse, LoginFormValues, RegisterFormValues } from "@/lib/types/auth";

// Base API URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const handleLogin = async (values: LoginFormValues): Promise<AuthResponse> => {
  const url = `${API_BASE_URL}/auth/login`;
  
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Login failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

// export const handleRegister = async (values: RegisterFormValues): Promise<AuthResponse> => {
//   const url = `${API_BASE_URL}/auth/register`;
  
//   // Keep confirmPassword since the server requires it
//   const registerData = {
//     name: values.name,
//     email: values.email,
//     password: values.password,
//     confirmPassword: values.confirmPassword,
//     address: values.address,
//     phone: values.phone,
//   };
  
//   try {
//     const response = await fetch(url, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(registerData),
//     });

//     const data = await response.json();

//     if (!response.ok) {
//       // Handle different error formats from the server
//       let errorMessage = "Registration failed";
      
//       if (data.message) {
//         errorMessage = data.message;
//       } else if (data.error) {
//         errorMessage = data.error;
//       } else if (data.errors && Array.isArray(data.errors)) {
//         errorMessage = data.errors.join(", ");
//       }
      
//       throw new Error(errorMessage);
//     }

//     return data;
//   } catch (error) {
//     if (error instanceof Error) {
//       console.error("Registration error:", error.message);
//       throw error;
//     } else {
//       console.error("Registration error:", error);
//       throw new Error("Network error. Please try again.");
//     }
//   }
// };

export const handleRegister = async (values: RegisterFormValues): Promise<AuthResponse> => {
  const url = `${API_BASE_URL}/auth/register`;
  
  const registerData = {
    name: values.name,
    email: values.email,
    password: values.password,
    confirmPassword: values.confirmPassword,
    address: values.address,
    phone: values.phone,
  };
  console.log("Sending data:", registerData);
  console.log("Password length:", values.password.length);
  console.log("Password chars:", values.password.split(''));
  
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerData),
    });

    const data = await response.json();
    
    
    console.log("Response status:", response.status);
    console.log("Response data:", data);

    if (!response.ok) {
      let errorMessage = "Registration failed";
      
      if (data.message) {
        errorMessage = data.message;
      } else if (data.error) {
        errorMessage = data.error;
      } else if (data.errors && Array.isArray(data.errors)) {
        errorMessage = data.errors.join(", ");
      }
      
      throw new Error(errorMessage);
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Registration error:", error.message);
      throw error;
    } else {
      console.error("Registration error:", error);
      throw new Error("Network error. Please try again.");
    }
  }
};