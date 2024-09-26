import React from "react";

const Container = ({ children }: { children: React.ReactNode }) => {
  return <div className="max-w-[1300px] mx-auto px-4 h-full">{children}</div>;
};

export default Container;
