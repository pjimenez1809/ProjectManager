import './App.scss';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import NewProject from './views/NewProject';
import Dashboard from './views/Dashboard';
import Login from './views/Login';

/* import DetailProperty from './views/DetailProperty'; */


function App() {
  return (
    <div className="App">
      <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/new">New Project</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li> 
{/*             <li>
              <Link to="/details/:id">Ver Propiedad</Link>
            </li>
 */}          </ul>
        </nav>        
        <Switch>         
          <Route exact path="/">
            <Dashboard />
          </Route>
          <Route exact path="/new">
            <NewProject/>
          </Route>
          <Route exact path="/login">
            <Login/>
          </Route>
{/*       <Route exact path="/details/:id">
            <DetailProperty/>
          </Route>
 */}
        </Switch>
      </div>
    </Router>
    </div>
  );
}

export default App;
