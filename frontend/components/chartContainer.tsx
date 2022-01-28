import React from "react";
import { ResponsiveContainer } from "recharts";

interface props {
  children: React.ReactChild | React.ReactChildren;
}

export default function ChartContainer({ children }: props) {
  return (
    <div className="w-full, h-5/6 relative mt-5">
      <ResponsiveContainer>{children}</ResponsiveContainer>
    </div>
  );
}
