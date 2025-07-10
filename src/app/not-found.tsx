import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Home, ShoppingBag } from "lucide-react";
import Link from "next/link";
export default function PageNotFound() {
  return (
    <div className="container mx-auto px-4 py-16 my-24">
      <div className="max-w-2xl mx-auto">
        <Card className="border-0 shadow-lg">
          <CardContent className="p-12 text-center space-y-8">
            {/* Icon */}
            <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center">
              <Search className="h-12 w-12 text-muted-foreground" />
            </div>

            {/* Title */}
            <div className="space-y-3">
              <h1 className="text-4xl font-bold text-foreground">
                Page Not Found
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Sorry, we couldn&apos;t find the page your&apos;e looking for. It might have
                been moved, renamed, or is temporarily unavailable.
              </p>
            </div>

            {/* Suggestions */}
            <div className="bg-muted/50 rounded-lg p-6 space-y-3">
              <h3 className="font-semibold text-foreground">
                What you can do:
              </h3>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Check if the page URL is correct</li>
                <li>• Browse our pages to find what you&apos;re looking for</li>
                <li>• Use the search bar to find what you&apos;re looking for</li>
                <li>• Contact us if you think this is an error</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="h-12">
                <Link href="/">
                  <Home className="w-4 h-4 mr-2" />
                  Back to Home
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12">
                <Link href="/products">
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Search
                </Link>
              </Button>
            </div>

            {/* Additional Help */}
            <div className="pt-6 border-t">
              <p className="text-sm text-muted-foreground">
                Need help?{" "}
                <Link
                  href="/contact"
                  className="text-primary hover:underline font-medium"
                >
                  Contact our support team
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
