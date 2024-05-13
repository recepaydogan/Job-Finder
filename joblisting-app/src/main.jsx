import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "./Context.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./authContexts/AuthContext.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <BrowserRouter>
      <Provider>
        <App />
      </Provider>
    </BrowserRouter>
  </AuthProvider>
);
