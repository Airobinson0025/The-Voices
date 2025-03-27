"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already given consent
    const hasConsent = localStorage.getItem("cookieConsent");
    if (!hasConsent) {
      setShowBanner(true);
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem("cookieConsent", "all");
    setShowBanner(false);
  };

  const acceptEssential = () => {
    localStorage.setItem("cookieConsent", "essential");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-background/80 backdrop-blur-sm">
      <Card>
        <CardHeader>
          <CardTitle>Cookie Consent</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            We use cookies to enhance your experience on our website. By
            continuing to browse, you agree to our use of cookies.
          </p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={acceptEssential}>
            Essential Only
          </Button>

          <div className="flex gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline">Cookie Settings</Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Cookie Preferences</SheetTitle>
                </SheetHeader>
                <div className="py-4">
                  {/* Detailed cookie settings UI goes here */}
                </div>
              </SheetContent>
            </Sheet>

            <Button onClick={acceptAll}>Accept All</Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
