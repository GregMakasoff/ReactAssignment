import React from 'react';
import HomePage from './pages/HomePage';
import 'bootstrap/dist/css/bootstrap.css';
import 'jquery/dist/jquery.min.js';
import 'popper.js/dist/popper.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import AboutPage from './pages/AboutPage';
import ToonListPage from './pages/ToonListPage';
import ToonDetailPage from './pages/ToonDetailPage';
import NavBar from './NavBar';
import AddToonPage from './pages/AddToonPage';
import EditToonPage from './pages/EditToonPage';
import DeleteToonPage from './pages/DeleteToonPage';

import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import NotFoundPage from './components/NotFoundPage';

function App() {
  return (
    <div className="container">
      <Router>
        <NavBar />
        <Switch>
          <Route path="/" component={HomePage} exact />
          <Route path="/about" component={AboutPage} exact />
          <Route path="/list" component={ToonListPage} exact />
          <Route path="/detail/:id" component={ToonDetailPage} exact />
          <Route path="/add" component={AddToonPage} exact />
          <Route path="/edit/:id" component={EditToonPage} exact />
          <Route path="/del/:id" component={DeleteToonPage} exact />
          <Route component={NotFoundPage} />
        </Switch>
      </Router>
    </div >
  );
}

export default App;
