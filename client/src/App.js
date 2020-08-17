import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from './components/Header';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';

import SignInPage from './pages/SignIn';
import NotFoundPage from './pages/NotFound';
import SignUpPage from './pages/SignUp';
import TestSite from './pages/Test';
import QuestionPage from './pages/QuestionPage';
import AddQuestionPage from './pages/AddQuestion';
import ForgotPasswordPage from './pages/ForgotPassword';
import ResetPasswordPage from './pages/ResetPassword';
import VerifyAccoutPage from './pages/VerifyAccount';

class App extends Component {
  renderHeader = () => <Header />;

  renderToastMessage = () => (
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
  );

  renderFooter = () => <Footer />;

  render() {
    return (
      <BrowserRouter>
        {this.renderToastMessage()}
        {this.renderHeader()}
        <div className="container">
          <Switch>
            <Route exact path="/" component={QuestionPage} />
            <Route exact path="/signin" component={SignInPage} />
            <Route exact path="/signup" component={SignUpPage} />
            <Route exact path="/question/add" component={AddQuestionPage} />
            <PrivateRoute exact path="/test" component={TestSite} />
            <Route exact path="/verify/:token" component={VerifyAccoutPage} />
            <Route
              exact
              path="/forgotPassword"
              component={ForgotPasswordPage}
            />
            <Route
              exact
              path="/resetPassword/:token"
              component={ResetPasswordPage}
            />
            <Route component={NotFoundPage} />
          </Switch>
        </div>
        {this.renderFooter()}
      </BrowserRouter>
    );
  }
}

export default App;
