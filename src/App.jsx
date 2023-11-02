import "./App.css";
import React from "react"
import { Routes, Route, Navigate } from "react-router-dom";
const LazyProducts = React.lazy(()=>import("./components/Products"))
const LazySiparis = React.lazy(()=>import("./components/Siparis"))
import Home from "./components/Home";
import LoadingScreen from "./components/LoadingScreen";

function App() {

  return (
    <div className="App">
        <div className="App-container">
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/urunler" exact element={<React.Suspense fallback={<LoadingScreen/>}><LazyProducts/></React.Suspense>}/>
            <Route path="/siparis" exact element={<React.Suspense fallback={<LoadingScreen/>}><LazySiparis/></React.Suspense>} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
    </div>
  );
}

export default App;
