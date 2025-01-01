import { useState } from "react";
import Home from "./components/Ui/Home/Home.jsx";

function App() {
  let [loading, setLoading] = useState(false);

  return (
    <div className="app-container">
      <div className="wrapper">
        <h1>Have Fun Typing!</h1>
        <div className="main-content">
          <Home loading={loading} setLoading={setLoading} />
        </div>
      </div>
    </div>
  );
}

export default App;
