"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { 
  AlertTriangle, 
  ArrowLeft, 
  Lightbulb, 
  StickyNote, 
  RefreshCw,
  Smile,
  Coffee,
} from "lucide-react";
import Link from "next/link";
// import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const [currentTip, setCurrentTip] = useState(0);
//   const router = useRouter();

  const funnyTips = [
    "Write it on a sticky note and stick it on your monitor 📝",
    "Save it in your phone's notes app with a funny emoji 📱",
    "Make it your WiFi password so you'll never forget 📶",
    "Write it backwards and keep it in your wallet 🔄",
    "Create a song about it and sing it daily 🎵",
    "Tell your pet - they're great at keeping secrets 🐕",
    "Write it in your diary next to your deepest secrets 📔",
    "Make it your computer's screensaver 💻"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % funnyTips.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

//   const handleGoBack = () => {
//     router.back();
//   };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-8 my-24">
      <div className="w-full max-w-2xl">
        <Card className="bg-card/50 backdrop-blur-md border border-border shadow-xl">
          <CardHeader className="space-y-1 text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="relative">
                <AlertTriangle className="h-16 w-16 text-yellow-500 animate-bounce" />
                <div className="absolute -top-2 -right-2">
                  <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">!</span>
                  </div>
                </div>
              </div>
            </div>
            <CardTitle className="text-3xl font-bold text-foreground">
              Oops! Feature Under Construction
            </CardTitle>
            <CardDescription className="text-muted-foreground text-lg">
              We haven&apos;t built the forgot password feature yet...
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <Alert className="bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800">
              <Lightbulb className="h-4 w-4 text-yellow-600" />
              <AlertDescription className="text-yellow-800 dark:text-yellow-200">
                <strong>Pro Developer Tip:</strong> This feature is still brewing in our code kitchen! ☕
              </AlertDescription>
            </Alert>

            <div className="bg-muted/50 rounded-lg p-6 border border-border">
              <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center">
                <StickyNote className="mr-2 h-5 w-5 text-primary" />
                Meanwhile, Here&apos;s What You Can Do:
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-bold text-sm">1</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">Create a New Account</h4>
                    <p className="text-muted-foreground text-sm">
                      Just make a fresh account for now. It&apos;s like getting a new chance at life! 🎉
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-bold text-sm">2</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">Don&apos;t Forget This Time!</h4>
                    <div className="bg-background/50 rounded-md p-3 mt-2 border border-border">
                      <p className="text-sm text-muted-foreground mb-2">
                        <strong>Current Tip:</strong>
                      </p>
                      <p className="text-foreground animate-pulse">
                        💡 {funnyTips[currentTip]}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-bold text-sm">3</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">Try Again</h4>
                    <p className="text-muted-foreground text-sm">
                      Maybe you&apos;ll remember your password while creating a new account! 🧠✨
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-4 border border-border">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Coffee className="h-5 w-5 text-blue-600" />
                <span className="font-medium text-foreground">Developer&apos;s Note</span>
              </div>
              <p className="text-center text-sm text-muted-foreground">
                We&apos;re probably drinking coffee and coding this feature right now! ☕👨‍💻
                <br />
                <span className="italic">Come back later, we promise it&apos;ll be worth the wait!</span>
              </p>
            </div>

            <Separator />

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                asChild
                variant="outline"
                className="flex items-center space-x-2 bg-background/50 border-border hover:bg-accent"
              >
                 <Link href="/">
                <ArrowLeft className="h-4 w-4" />
                <span>Go Back & Try Again</span>
                </Link>
              </Button>
              
              <Button
                asChild
                className="flex items-center space-x-2 bg-primary hover:bg-primary/90"
              >
                <Link href="/auth/register">
                  <RefreshCw className="h-4 w-4" />
                  <span>Create New Account</span>
                </Link>
              </Button>
            </div>

            <div className="text-center">
              <p className="text-xs text-muted-foreground flex items-center justify-center space-x-1">
                <Smile className="h-3 w-3" />
                <span>Thanks for your patience & sense of humor!</span>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}