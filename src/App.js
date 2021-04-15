import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Registration from "./pages/registration/Registration";
import Cats from "./pages/cats/Cats";
import { ApiProvider } from "./service/apollo";

const App = () => (
  <ApiProvider useMock={process.env.USE_MOCK}>
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/registration" component={Registration} />
        <Route path="/cats" component={Cats} />
      </Switch>
    </Router>
  </ApiProvider>
);

export default App;
