import axios from 'axios'
import {GET_PROPERTIES} from '../action'

const initialState = {
    properties: [],
    err: false
}

export function getProperties(){
    let data = axios.get('/api/properties').then(res => {
        return res.data
    })
    return {
        type: GET_PROPERTIES,
        payload: data
    }
}

export default function propertyDux(state = initialState, action){
    let {type, payload } = action

    
    switch(type){
        case GET_PROPERTIES + "_FULFILLED":     
            return {...state, properties: payload}
        default:
            return state;
    }

}



