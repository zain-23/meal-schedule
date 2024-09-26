import React from "react";
import { cn } from "../lib/utils";

const Heading = ({
  children,
  className,
  tag: Tag = "h1",
}: {
  children: React.ReactNode;
  className?: string;
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}) => {
  return <Tag className={cn("text-2xl font-bold", className)}>{children}</Tag>;
};

export default Heading;
