import React from "react";
import "@style/resets.scss";
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";
import { HomePage, PokemonPage } from "@pages";

function App() {

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route exact path="/pokemon/:pokemonId">
          <PokemonPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
