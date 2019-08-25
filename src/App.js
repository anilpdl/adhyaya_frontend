import React, { Fragment } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

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

const RouteWrapper = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest}
            render={(props) => <Fragment>
                <Layout />
                <Component {...props} />
            </Fragment>}
        />
    );
};

const App = () => {
    return (
        <div className="App">
            <Toaster />
            <BrowserRouter>
                <MainWrapper>
                    <RouteWrapper exact path={ROUTES.INDEX} component={Dashboard} />
                    <RouteWrapper path={ROUTES.ABOUT_US} component={About} />
                    <RouteWrapper path={ROUTES.CONTACT_US} component={Contact} />
                    <RouteWrapper path={ROUTES.LOGIN} component={LogIn} />
                </MainWrapper>
            </BrowserRouter>
        </div>
    );
}

export default App;
