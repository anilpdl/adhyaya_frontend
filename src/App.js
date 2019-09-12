import React, { Component, Fragment } from 'react';
import { Route, BrowserRouter, Redirect, Switch } from 'react-router-dom';

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
import UserInvitation from './containers/UserInvitation';
import InvalidToken from './components/UserInvitation/InvalidToken';
import Users from './containers/Sidebar/Admin/User';
import UsersList from './components/User/UsersList';
import InvitationsList from './components/UserInvitation/InvitationsList';
import FileUpload from './containers/Files/FileUpload';
import FileList from './containers/Files/FileList';
import UserProfile from './containers/UserProfile';

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
};

const UserRoutes = () => {
    return (
        <Switch>
            <ProtectedRoutes exact path={ROUTES.ADD_USERS} component={Users} />
            <ProtectedRoutes exact path={ROUTES.LIST_USERS} component={UsersList} />
        </Switch>
    )
}

const FileRoutes = () => {
    return (
        <Switch>
            <ProtectedRoutes exact path={ROUTES.FILES_UPLOAD} component={FileUpload} />
            <ProtectedRoutes exact path={ROUTES.FILES_INDEX} component={FileList} />
        </Switch>
    )
}

const UserInvitationRoute = () => {
    return (
        <Switch>
            <Route exact path={ROUTES.INVALID_INVITATION} component={InvalidToken} />
            <Route exact path={ROUTES.USER_INVITATIONS} component={UserInvitation} />
            <ProtectedRoutes path={ROUTES.USER_INVITATIONS_INDEX} component={InvitationsList} />
        </Switch>
    );
};

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
                        <Route path={ROUTES.USER_INVITATIONS_INDEX} component={UserInvitationRoute} />
                        <PublicRoutes path={ROUTES.SERVICES} component={Services} />
                        <ProtectedRoutes exact path={ROUTES.DASHBOARD} component={Dashboard} />
                        <ProtectedRoutes excat path={ROUTES.PROFILE} component={UserProfile} />
                        <Route path={ROUTES.FILES_INDEX} component={FileRoutes} />
                        <Route path={ROUTES.USERS} component={UserRoutes} />
                    </main>
                </MainWrapper>
            </BrowserRouter>
        );
    }
}

export default App;
