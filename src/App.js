import React, { Component, Suspense } from 'react';
import { connect } from 'react-redux';
import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Logout from './components/Auth/Logout/Logout';
import * as actionCreators from './store/actions/actions';

const LazyCheckout = React.lazy(() => {
  return import('./components/Checkout/Checkout');
});

const LazyAuth = React.lazy(() => {
  return import('./containers/Auth/Auth');
});

const LazyOrders = React.lazy(() => {
  return import('./components/Orders/Orders');
});


// TODO 
// 1. add types to components
// 2. improve mobile menu
// 3. Tests
// 4. Lazy loading new
class App extends Component {

  componentDidMount = () => {
    this.props.onTryAutoLogin();
  }

  render() {
    let showRoutes = (
      <Switch>
        <Route path="/login" render={(props) => <LazyAuth {...props} />} />
        <Route path="/" component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );
    if (this.props.isAuthenticated) {
      showRoutes = (
        <Switch>
          {/* order is very important!!! */}
          <Route path="/checkout" render={(props) => <LazyCheckout {...props} />} />
          <Route path="/orders" render={(props) => <LazyOrders {...props} />} />
          <Route path="/login" render={(props) => <LazyAuth {...props} />} />
          <Route path="/logout" component={Logout} />
          <Route path="/" component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      )
    }
    return (
      <div>
        <Layout>
          <Suspense fallback={<p>Loading...</p>}>
            {showRoutes}
          </Suspense>
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.authReducer.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoLogin: () => dispatch(actionCreators.authCheck())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
