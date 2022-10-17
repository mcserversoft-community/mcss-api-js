import axios from 'axios'
import { Agent } from 'https'

interface AppResponse {
    status: number,
    data?: any,
    error?: {
        message: string,
    } 
}

module.exports = class MCSS {
    ip: string;
    port: number|string;
    apiKey: string;
    instance: any;
    server: Server;
    constructor(_ip: string, _port: string|number, _key: string) {

        if(!_ip || !_port || !_key) throw new Error("Must Provide a valid Info");

        this.instance = axios.create({
            httpsAgent: new Agent({ rejectUnauthorized: false }),
            validateStatus: () => true,
            headers: {
                apikey : _key
            }
        });

        this.ip = _ip;
        this.port = _port;
        this.apiKey = _key;

        this.server = new Server(this);
    }
    private getURL(): string {
        return `http://${this.ip}:${this.port}/api/v1/`
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
    public async getServers(): Promise<AppResponse> {
        let response = await this.instance.get(this.getURL() + "servers");
       return this.generateResponse(response.status, response.data);
    }
    public async getServerCount(): Promise<AppResponse> {
        let response = await this.instance.get(this.getURL() + "servers/count");
       return this.generateResponse(response.status, response.data);
    }
}

class Server {
    client: any;
    previous: any;
    server: any;
    constructor(client) {
        this.client = client;
    }
    private getURL(): string {
        return `http://${this.client.ip}:${this.client.port}/api/v1/servers/`
    }
    public async get(_id) {
        let response = await this.client.instance.get(this.getURL() + _id);
        this.server = _id;
        return this.client.generateResponse(response.status, response.data);
    }
    public async getStats(_id) {
        let response = await this.client.instance.get(this.getURL() + _id + "/stats");
        return this.client.generateResponse(response.status, response.data);
    }
    public async getIcon(_id) {
        let response = await this.client.instance.get(this.getURL() + _id + "/icon");
        return this.client.generateResponse(response.status, response.data);
    }
    public async edit(_id: string, server: ServerEditor) {
        let response = await this.client.instance.put(this.getURL() + _id, server);
        return this.client.generateResponse(response.status, response.data);
    }
    public async execute(_id: string, ...action: any): Promise<void> {
        if(action.length == 1) {
            switch(action[0]) {
                case 0:
                    await this.client.instance.post(this.getURL() + _id + "/execute/action", { action: 0 });
                    break;
                case 1:
                    await this.client.instance.post(this.getURL() + _id + "/execute/action", { action: 1 });
                    break;
                case 2:
                    await this.client.instance.post(this.getURL() + _id + "/execute/action", { action: 2 });
                    break;
                case 3:
                    await this.client.instance.post(this.getURL() + _id + "/execute/action", { action: 3 });
                    break;
                case 4:
                    await this.client.instance.post(this.getURL() + _id + "/execute/action", { action: 4 });
                    break;
                default: 
                    await this.client.instance.post(this.getURL() + _id + "/execute/command", { command: action[0] });
                    break;
            }
        } else {
            await this.client.instance.post(this.getURL() + _id + "/execute/commands", { commands: action });
        }
    }
}

class ServerEditor {
    name: string;
    description: string;
    autoStartWithMcss: boolean;
    forceSaveOnStop: boolean;
    allocatedMemoryInMegabytes: number;
    constructor() {
        this.name;
        this.description;
        this.autoStartWithMcss;
        this.forceSaveOnStop;
        this.allocatedMemoryInMegabytes;
    }
    setName(name: string) {
        this.name = name;
        return this;
    }
    setDescription(description: string) {
        this.description = description;
        return this;
    }
    setAutoStartWithMcss(condition: boolean) {
        this.autoStartWithMcss = condition;
        return this;
    }
    setForceSaveOnStop(condition: boolean) {
        this.forceSaveOnStop = condition;
        return this;
    }
    setAllocatedMemoryInMegabytes(amount: number) {
        this.allocatedMemoryInMegabytes = amount;
        return this;
    }
}
module.exports.ServerEditor = ServerEditor;