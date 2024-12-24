import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import GlobalProvider from "./context/GlobalProvider";

//* ------------------------------------------------------------------------- Pages ---------------------------------------------------------------------------------------
import PrivateRoute from "./utils/middlewares/PrivateRoute";
import Page404 from "./pages/404/Page404";

import Login from "./pages/login/LoginPage";
import HomePage from "./pages/home/HomePage";

function App() {
  return (
    <GlobalProvider>
      <Router>
        <div className="relative w-screen h-screen ">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<HomePage />} />
            </Route>
            <Route path="*" element={<Page404 />} />
          </Routes>
        </div>
      </Router>
    </GlobalProvider>
  );
}

export default App;
