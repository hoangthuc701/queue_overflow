import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from './components/Header';
import Footer from './components/Footer';

import HomePage from './pages/Home';
import SignInPage from './pages/SignIn';
import NotFoundPage from './pages/NotFound';

const MainRoute = () => (
  <BrowserRouter>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
    <Header />
    <div className="container">
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/signin" component={SignInPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
    <Footer />
  </BrowserRouter>
);
export default MainRoute;
