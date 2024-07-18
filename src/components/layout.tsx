import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./navbar";

export default function Layout() {
  return (
    <>
      <Toaster
        position="bottom-right"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          className: "",
          duration: 10000,
          style: {
            background: "#27272A",
            color: "#E4E4E7",
            borderRadius: "13px",
          },
        }}
      />
      <Navbar />
      <div className="container mx-auto">
        <Outlet />
      </div>
    </>
  );
}
