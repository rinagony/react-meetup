import {combineReducers } from 'redux';
import reducer from './reducer-users';
import reducerMeetups from './reducer-meetups';

const reducers = combineReducers({
    users: reducer,
    meetups: reducerMeetups
});

export default reducers;