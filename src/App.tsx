import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout";
import Discover from "./pages/discover";
import GenerateImage from "./pages/generate-image";
import Tutorial from "./pages/tutorial";
import Image from "./pages/image";
import NotFound from "./pages/not-found";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Discover />} />
          <Route path="/generate-image" element={<GenerateImage />} />
          <Route path="/tutorial" element={<Tutorial />} />
          <Route path="/image/:id" element={<Image />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
