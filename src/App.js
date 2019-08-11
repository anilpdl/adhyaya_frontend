import React, { Fragment } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import Home from './containers/Home';
import Header from './containers/Header';
import ROUTES from './constants/Routes';
import Footer from './containers/Footer';

const RouteWrapper = ({ component: Component, rest }) => {
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
            <BrowserRouter>
                <RouteWrapper path={ROUTES.INDEX} component={Home} />
            </BrowserRouter>
        </div>
    );
}

export default App;
