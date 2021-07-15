import React from "react";
import Header from "./components/Header/Header";
import SideBar from "./components/Sidebar/Sidebar";
import { routes } from "./AppRoutes";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <div className="wrapper">
      <Router>
        <Header />
        <SideBar />
        {routes.map((route) => (
          <Route
            key={route.path}
            exact
            path={route.path}
            component={route.component}
          />
        ))}
      </Router>
    </div>
  );
}

export default App;
