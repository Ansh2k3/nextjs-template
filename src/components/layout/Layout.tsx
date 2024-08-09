import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import Navbar from "./Navbar";


const Layout = ({
  className,
  children,

}: {
  className?: string;
  children: ReactNode;
}) => {
  return (
    <div
      className={cn(
        "w-screen min-h-screen flex flex-col  font-poppins",
        className
      )}
    >
      {/* TODO: use context to avoid prop drilling */}
      <Navbar/>
      {children}
    </div>
  );
};

export default Layout;