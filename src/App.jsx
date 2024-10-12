import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import { Toaster } from "react-hot-toast";
import RoutesFile from "./routes.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Toaster position="top-center" reverseOrder={false} />
        <RoutesFile />
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
