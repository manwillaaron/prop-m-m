import {createStore, combineReducers, applyMiddleware} from 'redux'
import promiseMiddleware from 'redux-promise-middleware'
import propertyDux from './reducers/propertyDux'
import editDux from './reducers/editDux'
import userDux from './reducers/userDux'

const rootReducer = combineReducers({
    properties: propertyDux,
    editing: editDux,
    user: userDux
})

export default createStore(rootReducer, applyMiddleware(promiseMiddleware))
