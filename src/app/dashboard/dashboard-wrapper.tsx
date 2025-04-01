// app/dashboard/dashboard-wrapper.tsx
"use client";

import { User } from "@/types/user";
import React from "react";

export function DashboardWrapper({
  children,
  user,
}: {
  children: React.ReactNode;
  user: User;
}) {
  //   console.log("User in DashboardWrapper:", user);
  // Modify children to include the user prop
  const childrenWithProps = React.Children.map(children, (child) => {
    // Check if the child is a valid element
    if (React.isValidElement<{ user: User }>(child)) {
      // Clone the element to add props
      return React.cloneElement(child, { user });
    }
    return child;
  });

  return <>{childrenWithProps}</>;
}
