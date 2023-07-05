import React from "react"; 
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import mainWikiStore from "./store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App store={mainWikiStore}/>
  </React.StrictMode>
);
