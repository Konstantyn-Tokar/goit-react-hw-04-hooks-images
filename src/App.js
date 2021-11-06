import { useState } from "react";
import { ToastContainer } from "react-toastify";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";

import Searchbar from "./components/Searchbar";
import ImageGallery from "./components/ImageGallery";

function App() {
  const [imageName, setImageName] = useState("");

  return (
    <div className="App">
      <Searchbar onSubmit={(imageName) => setImageName(imageName)} />
      <ImageGallery imageName={imageName} />

      <ToastContainer autoClose={2500} />
    </div>
  );
}

export default App;
