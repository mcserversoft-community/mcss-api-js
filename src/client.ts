import axios, { AxiosInstance } from 'axios';

import Server from './servers';
import Users from './users';

export type AppResponse = {
    status: number
    data?: any
    error?: {
        message: string
    }
}

export default class Client {
    instance: AxiosInstance;
    ip: string;
    port: string | number;
    apiKey: string;
    https: boolean;
    url: string;
    servers: Server;
    users: Users;
    constructor(ip: string, port: string|number , apiKey: string, https: boolean = true) {

        if(!ip || !port || !apiKey) throw new Error("Missing parameters");

        this.ip = ip;
        this.port = port;
        this.apiKey = apiKey;
        this.https = https;
        this.url = `${https ? "https" : "http"}://${ip}:${port}/api/v2/`;

        this.instance = axios.create({
            validateStatus: () => true,
            baseURL: this.url,
            headers: {
                apiKey
            }
        });

        this.servers = new Server(this);
        this.users = new Users(this);

    }
    
    private generateResponse(code: number, data?: any): AppResponse {
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

    public async getStats(): Promise<AppResponse> {
        const response = await this.instance.get("/");
        return this.generateResponse(response.status, response.data);
    }

    public async getServers(): Promise<AppResponse> {
        const response = await this.instance.get('servers');
        return this.generateResponse(response.status, response.data);
    }

    public async getServerCount(): Promise<AppResponse> {
        const response = await this.instance.get('servers/count');
        return this.generateResponse(response.status, response.data);
    }

}