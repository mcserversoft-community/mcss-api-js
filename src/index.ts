export * from './server'
export * from './servers'
export * from './token'
export * from './version'

import axios from 'axios'
import { Agent } from 'https'
export function axiosSetup(){
    const instance = axios.create({httpsAgent: new Agent({rejectUnauthorized: false})});
    return instance;
}