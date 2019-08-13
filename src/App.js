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

const RouteWrapper = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest}
            render={(props) => <Fragment>
                <Header />
                    <Component {...props} />
                <Footer />
            </Fragment>}
        />
    );
};

const App = () => {
    return (
        <div className="App">
            <Toaster />
            <BrowserRouter>
                <RouteWrapper exact path={ROUTES.INDEX} component={Home} />
                <RouteWrapper path={ROUTES.ABOUT_US} component={About} />
                <RouteWrapper path={ROUTES.CONTACT_US} component={Contact} />
                <RouteWrapper path={ROUTES.LOGIN} component={LogIn} />
            </BrowserRouter>
        </div>
    );
}

export default App;
