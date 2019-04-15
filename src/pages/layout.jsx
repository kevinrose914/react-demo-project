import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { Link, Route, Redirect } from 'react-router-dom';
import Loadable from 'react-loadable'; // 按需加载有关
import AnimateRouter from '../components/animateRouter.jsx';

const MyLoadingComponent = ({ isLoading, error }) => {
    // Handle the loading state
    if (isLoading) {
        return <div>Loading...</div>;
    }
    // Handle the error state
    else if (error) {
        return <div>Sorry, there was a problem loading the page.</div>;
    }
    else {
        return null;
    }
};
// 异步加载组件
const Home = Loadable({
    loader: () => import(/* webpackChunkName: 'home' */ './home/home'),
    loading: MyLoadingComponent
});
const User = Loadable({
    loader: () => import(/* webpackChunkName: 'user' */ './user/user'),
    loading: MyLoadingComponent
});
const List = Loadable({
    loader: () => import(/* webpackChunkName: 'list' */ './list/list'),
    loading: MyLoadingComponent
});
// 预加载，类似于同步加载
// Home.preload();
// User.preload();
// List.preload();

class Layout extends Component {
    static propTypes = {
        // location: PropTypes.object
        // children: PropTypes.element.isRequired
    }
    constructor() {
        super();
    }

    render() {
        return (
            <div className="container">
                <section className="body">
                    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                        <AnimateRouter className="fade">
                            <Redirect exact from="/" to="/home" />
                            <Route exact path="/home" component={Home} />
                            <Route exact path="/user" component={User} />
                            <Route exact path="/list" component={List} />
                        </AnimateRouter>
                    </div>
                </section>
                <nav className="nav-bar">
                    <Link to="/home">Home</Link>
                    <Link to="/user">User</Link>
                    <Link to="/list">list</Link>
                </nav>
            </div>
        );
    }
}

export default Layout;