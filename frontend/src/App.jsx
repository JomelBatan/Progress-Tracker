import { useState } from "react";
import Stats from "./components/Stats";
import Interface from "./components/Interface";

function App() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Stats />
      <Interface />
    </div>
  );
}

export default App;
