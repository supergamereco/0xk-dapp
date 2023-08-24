import axios from 'axios'
import { makeApiCallers } from './apiCallers'

const api = axios.create({
    timeout: 60 * 1000, // 1 minute
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, PUT, POST, PATCH, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': '*'
    },
})

const apiForm = axios.create({
    timeout: 60 * 1000, // 1 minute
    headers: {
        'Content-Type': 'multipart/form-data',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, PUT, POST, PATCH, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': '*'
    },
})

const callers = makeApiCallers(api,apiForm)

export { api, callers, apiForm }
