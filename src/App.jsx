import React, { useState } from "react";

// Components
import Header from "./components/Header";

// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

const App = function App({ title, tech }) {
  const [clicks, changeClicks] = useState(0);

  const techList = tech.map((el) => <li key={el}>{el}</li>);

  return (
    <div>
      <Header />
      <strong>{title}</strong>
      <ul>{techList}</ul>
      <button type="button" onClick={() => changeClicks(() => clicks + 1)}>
        {clicks}
      </button>
    </div>
  );
};

export default App;
