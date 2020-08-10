import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from './components/Header';
import Footer from './components/Footer';

import HomePage from './pages/Home';
import SignInPage from './pages/SignIn';
import NotFoundPage from './pages/NotFound';
import SignUpPage from './pages/SignUp';
import TestSite from './pages/Test';

const MainRoute = () => (
  <>
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
        <Route exact path="/signup" component={SignUpPage} />
        <Route exact path="/test" component={TestSite} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
    <Footer />
  </>
);
export default withRouter(MainRoute);
