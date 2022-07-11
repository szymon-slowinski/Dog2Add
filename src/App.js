import React from 'react';
import './App.css';
import LayoutHomePage from './component/LayoutHomePage/LayoutHomePage';
import { AuthProvider } from './context/AuthContext';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Dashboard from './component/Dashboard/Dashboard';
import LoginForm from './component/LoginForm/LoginForm';
import PrivateRoute from './component/PrivateRoute';
import ForgotPassword from './component/ForgotPassword/ForgotPassword';
import Profil from './component/Profil/Profil';
import Adoption from './component/Adoption/Adoption';
import AdoptionAdd from './component/AdoptionAdd/AdoptionAdd';
import UsersDogs from './component/MyDogs/UsersDogs'
import DogDetails from './component/DogDetails/DogDetails';

function App() {
  return (
    <div className="App">
      <Router>
      <AuthProvider>
        <Switch>
          <Route path="/rejestracja" component={LayoutHomePage}></Route>
          <Route path="/logowanie" component={LoginForm}></Route>
          <Route path="/zapomniales-haslo" component={ForgotPassword}></Route>
          <PrivateRoute exact path="/" component={Dashboard}></PrivateRoute>
          <PrivateRoute path="/profil" component={Profil}></PrivateRoute>
          <PrivateRoute path="/adopcja" component={Adoption}></PrivateRoute>
          <PrivateRoute path="/mojepsy" component={UsersDogs}></PrivateRoute>
          <PrivateRoute path="/adopcja-dodaj" component={AdoptionAdd}></PrivateRoute>
          <PrivateRoute path="/pies/:id" component={DogDetails}></PrivateRoute>
        </Switch>
      </AuthProvider>
      </Router>
    </div>
   
  );
}

export default App;
