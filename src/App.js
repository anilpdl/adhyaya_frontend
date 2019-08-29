import React, { Component, Fragment } from 'react';
import { Route, BrowserRouter, Redirect } from 'react-router-dom';

import Home from './containers/Home';
import Header from './containers/Header';
import ROUTES from './constants/Routes';
import Footer from './containers/Footer';
import About from './containers/About';
import Contact from './containers/Contact';
import LogIn from './containers/LogIn';
import Toaster from './components/Toaster';
import Dashboard from './containers/Dashboard';
import Layout from './containers/Layout';
import MainWrapper from './components/MainWrapper/MainWrapper';
import { isUserAuthenticated } from './utils/userHelpers';
import Services from './containers/Services';

const RouteWrapper = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest}
            render={(props) => <Fragment>
                <Layout />
                <div className="container__wrap">
                    <Component {...props} />
                </div>
            </Fragment>}
        />
    );
};

const PublicRoutes = ({ component: Component, ...rest }) => (
    <Route {...rest}
        render={(props) => (
            <Fragment>
                <div className="layout layout--top-navigation">
                    <Header />
                </div>
                <div className="container__wrap">
                    <Component {...props} />
                </div>
                <Footer />
            </Fragment>
        )}
    />
);

const ProtectedRoutes = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest}
            render={(props) => {
                const isAuthenticated = isUserAuthenticated();
                if (isAuthenticated)
                    return <RouteWrapper component={Component} {...props} />
                return (
                    <Redirect to={ROUTES.LOGIN} />
                );
            }}
        />
    )
}

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <MainWrapper>
                    <Toaster />
                    <main>
                        <PublicRoutes exact path={ROUTES.INDEX} component={Home} />
                        <PublicRoutes path={ROUTES.ABOUT_US} component={About} />
                        <PublicRoutes path={ROUTES.CONTACT_US} component={Contact} />
                        <PublicRoutes path={ROUTES.LOGIN} component={LogIn} />
                        <PublicRoutes path={ROUTES.SERVICES} component={Services} />
                        <ProtectedRoutes exact path={ROUTES.DASHBOARD} component={Dashboard} />
                    </main>
                </MainWrapper>
            </BrowserRouter>
        );
    }
}

export default App;
