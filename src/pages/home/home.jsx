import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styles from './home.less';
import { asyncIncrease, increase, decrease } from '../../actions/counter';

class App extends Component {
    static propTypes = {
        counter: PropTypes.object.isRequired,
        asyncIncrease: PropTypes.func,
        increase: PropTypes.func,
        decrease: PropTypes.func,
    }
    static getDerivedStateFromProps(nextProps, prevState) { // 取代了componentWillReceiveProps
        console.log(nextProps, prevState, '123');
        const { count } = nextProps.counter;
        if (count !== prevState.count) {
            return { ...prevState, count };
        }
        return prevState;
    }
    constructor() {
        super();
        this.state = {
            count: 0
        };
        this.handleChangeCount = this.handleChangeCount.bind(this);
    }
    componentDidMount() {
        const { count } = this.props.counter;
        this.setState({
            count
        });
    }
    render() {
        return (
            <div className="section-container" style={{ background: 'red' }}>
                <div className="body">
                    <h1 className={styles.title}>reactqweqweqwe</h1>
                    <span>{this.state.count}</span>
                </div>
                <div className="nav">
                    <button
                        onClick={() => {
                            this.handleChangeCount(true, false);
                        }}
                    >increase</button>
                    <button
                        onClick={() => {
                            this.handleChangeCount(true, true);
                        }}
                    >async increase</button>
                    <button
                        onClick={() => {
                            this.handleChangeCount(false);
                        }}
                    >decrease</button>
                </div>
            </div>
        );
    }
    handleChangeCount(isIncrease, isAsync) {
        const { asyncIncrease, increase, decrease } = this.props;
        if (isIncrease) {
            if (isAsync) {
                asyncIncrease();
            } else {
                increase();
            }
        } else {
            decrease();
        }
    }

}

const mapStateToProps = (state) => {
    return {
        counter: state.counter
    };
};

const actions = {
    asyncIncrease,
    increase,
    decrease
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);