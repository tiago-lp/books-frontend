import { useContext } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Context } from '../contexts/AuthContext/AuthContext';
import { Login, Home } from '../pages';

const CustomRoute = ({ isPrivate, ...rest }) => {
    const { loading, isAuthenticated } = useContext(Context);

    if (loading) {
        return <h1>Carregando...</h1>;
    }

    if (isPrivate && !isAuthenticated) {
        return <Redirect to='/' />;
    };

    return <Route {...rest} />;
};

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <CustomRoute path='/' exact component={Login} />
                <CustomRoute isPrivate='/home' exact component={Home} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;