import React from "react";
import { Route, Switch } from "react-router-dom";
import "./assets/scss/app.scss";
import Header from "./components/Header";
import errorPage from "./pages/404";
import ItemsResult from "./pages/ItemsResult";
import ItemDetail from "./pages/itemDetail";

const App = () => (
  <div className="App">
    <Header />
    <main>
      <Switch>
        <Route exact path="/" />
        <Route exact path="/items" component={ItemsResult} />
        <Route path="/items/:id" component={ItemDetail} />
        <Route component={errorPage} />
      </Switch>
    </main>
  </div>
);

export default App;
