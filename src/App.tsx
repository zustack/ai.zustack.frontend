import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout";
import Discover from "./pages/discover";
import GenerateImage from "./pages/generate-image";
import Tutorial from "./pages/tutorial";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Discover />} />
          <Route path="/generate-image" element={<GenerateImage />} />
          <Route path="/tutorial" element={<Tutorial />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
