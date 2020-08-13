import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from './components/Header';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';

import HomePage from './pages/Home';
import SignInPage from './pages/SignIn';
import NotFoundPage from './pages/NotFound';
import SignUpPage from './pages/SignUp';
import TestSite from './pages/Test';
import AddQuestionPage from './pages/AddQuestion';
import QuestionDetail from './pages/QuestionDetail';

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
        <div className="container" id="content">
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/signin" component={SignInPage} />
            <Route exact path="/signup" component={SignUpPage} />
            <Route exact path="/question/add" component={AddQuestionPage} />
            <Route
              exact
              path="/question/:questionId"
              component={QuestionDetail}
            />
            <PrivateRoute exact path="/test" component={TestSite} />
            <Route component={NotFoundPage} />
          </Switch>
        </div>
        {this.renderFooter()}
      </BrowserRouter>
    );
  }
}

export default App;
