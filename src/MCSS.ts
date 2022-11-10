import axios, { AxiosInstance } from 'axios'
import { Agent } from 'https'
import Server from './Server'

type AppResponse = {
    status: number
    data?: any
    error?: {
        message: string
    } 
}

export default class MCSS {
    ip: string;
    port: number|string;
    apiKey: string;
    instance: AxiosInstance;
    server: Server;
    https: boolean;
    protected url: string;
    constructor(ip: string, port: string|number, apiKey: string, https: boolean = true) {

        if(!ip || !port || !apiKey) throw new Error("Must Provide a valid Info");

        this.instance = axios.create({
            httpsAgent: new Agent({ rejectUnauthorized: false }),
            validateStatus: () => true,
            headers: {
                apiKey,
            }
        });

        this.ip = ip;
        this.port = port;
        this.apiKey = apiKey;
        this.https = https;
        this.url = this.https ? `https://${this.ip}:${this.port}/api/v1/` : `http://${this.ip}:${this.port}/api/v1/`

        this.server = new Server(this.ip, this.port, this.apiKey, this.https);    
    }
    protected generateResponse(code: number, data?: any): AppResponse {
        switch(code) {
            case 200:
                return { status: 200, data };
            case 401:
                return { status: 401, error: { message: 'Incorrect API key' } }
            case 404:
                return { status: 404, error: { message: 'Server not found' } }
            default: 
                return { status: code, error: { message: 'An unexpected error occured' } }
        }
    }
    public async getServers(): Promise<AppResponse> {
        let response = await this.instance.get(this.url + "servers");
       return this.generateResponse(response.status, response.data);
    }
    public async getServerCount(): Promise<AppResponse> {
        let response = await this.instance.get(this.url + "servers/count");
       return this.generateResponse(response.status, response.data);
    }
}