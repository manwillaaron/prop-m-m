import {createStore, combineReducers, applyMiddleware} from 'redux'
import promiseMiddleware from 'redux-promise-middleware'
import propertyDux from './reducers/propertyDux'
import editDux from './reducers/editDux'
import userDux from './reducers/userDux'
import expenseDux from './reducers/expenseDux'

const rootReducer = combineReducers({
    properties: propertyDux,
    editing: editDux,
    user: userDux,
    expenses: expenseDux
})

export default createStore(rootReducer, applyMiddleware(promiseMiddleware))
