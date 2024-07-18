import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout";
import Landing from "./pages/landing";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Landing />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
