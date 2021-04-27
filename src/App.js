import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import { Home, Registration, Cats } from "@pages";
import { ApiProvider } from "@services";
import { theme } from "./theme";

const App = () => (
  <ThemeProvider theme={theme}>
    <ApiProvider useMock={process.env.USE_MOCK}>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/registration" component={Registration} />
          <Route path="/cats" component={Cats} />
        </Switch>
      </Router>
    </ApiProvider>
  </ThemeProvider>
);

export default App;
