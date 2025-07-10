// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import RegisterForm from "@/components/auth/RegisterForm";
// import { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "Create Account - Ello Noriic",
//   description: "Join us today and start your journey with Ello Noriic",
// };

// export default function RegisterPage() {
//   return (
//     <div className="min-h-screen bg-background flex items-center justify-center px-4 py-8 my-24">
//       <div className="w-full max-w-md">
//         <Card className="bg-card/50 backdrop-blur-md border border-border shadow-xl">
//           <CardHeader className="space-y-1 text-center">
//             <div className="flex items-center justify-center mb-4">
//               <h1 className="text-2xl font-normal text-foreground tracking-wide">
//                 Ello <span className="font-bold">Noriic</span>
//               </h1>
//             </div>
//             <CardTitle className="text-2xl font-semibold text-foreground">
//               Create Account
//             </CardTitle>
//             <CardDescription className="text-muted-foreground">
//               Join us today and start your journey
//             </CardDescription>
//           </CardHeader>

//           <CardContent>
//             <RegisterForm />
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import RegisterForm from "@/components/auth/RegisterForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Account - Ello Noriic",
  description: "Join us today and start your journey with Ello Noriic",
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen relative flex items-center justify-center px-4 py-8 mt-24">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80')"
        }}
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Content */}
      <div className="w-full max-w-md relative z-10">
        <Card className="bg-card/80 backdrop-blur-lg border border-border/50 shadow-2xl">
          <CardHeader className="space-y-1 text-center">
            <div className="flex items-center justify-center mb-4">
              <h1 className="text-2xl font-normal text-foreground tracking-wide">
                Ello <span className="font-bold">Noriic</span>
              </h1>
            </div>
            <CardTitle className="text-2xl font-semibold text-foreground">
              Create Account
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Join us today and start your journey
            </CardDescription>
          </CardHeader>

          <CardContent>
            <RegisterForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}