import { BrowserRouter } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";
import LangContext from "./Context/LangContext";
import { useState, useEffect } from "react";
import RoutesList from "./Routes/RoutesList";

function App() {
  const [lang, setLang] = useState("En");

  useEffect(() => {
    document.documentElement.lang = lang;

    if (lang === "Ar") {
      document.documentElement.dir = "rtl";
    } else {
      document.documentElement.dir = "ltr";
    }
  }, [lang]);

  return (
    <LangContext value={{ lang, setLang }}>
      <BrowserRouter>
        <RoutesList />
      </BrowserRouter>
    </LangContext>
  );
}

export default App;
