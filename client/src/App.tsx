import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";
import "./App.css";
import { UsersTable } from "./components/UsersTable";
import { UserDetails } from "./components/UserDetails";
import { useLayoutEffect } from "react";

function Root() {
  const history = useHistory();

  useLayoutEffect(() => {
    history.push("/users");
  }, []);

  return null;
}

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/users/:id">
            <UserDetails />
          </Route>
          <Route path="/users">
            <UsersTable />
          </Route>
          <Route path="/">
            <Root />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
