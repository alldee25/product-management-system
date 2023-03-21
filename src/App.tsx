import React, { Suspense } from "react";
import { HashRouter } from "react-router-dom";
import "./App.css";
import { AuthContextProvider } from "./context/Auth/store";
import RenderRoute from "./routes/RenderRoute";
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);
function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <HashRouter>
          <Suspense fallback={loading}>
            <RenderRoute />
          </Suspense>
        </HashRouter>
      </AuthContextProvider>
    </div>
  );
}

export default App;
