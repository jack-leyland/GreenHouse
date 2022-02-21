import React from "react";
import { ResponsiveContainer } from "recharts";

interface props {
  children: any;
}

export default function ChartContainer({ children }: props) {
  return (
    <div className="w-full h-5/6 relative p-8">
      <ResponsiveContainer>{children}</ResponsiveContainer>
    </div>
  );
}
