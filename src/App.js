import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Tasks, Init, Login, Menu} from './components';

function App() {
  return (
    <div className="container" >
      <Router>
        <Menu></Menu>
        <Switch>
          <Route exact path="/" component={Init}></Route>
          <Route path="/tasks" component={Tasks}></Route>
          <Route path="/login" component={Login}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
