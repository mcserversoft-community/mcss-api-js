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
            case 201:
                return { status: 201, data };
            case 401:
                return { status: 401, error: { message: 'Incorrect API key' } }
            case 404:
                return { status: 404, error: { message: 'Server not found' } }
            default: 
                return { status: code, error: { message: 'An unexpected error occured' } }
        }
    }
    public async getVersion(): Promise<AppResponse> {
        let response = await this.instance.get(this.getURL());
       return this.generateResponse(response.status, response.data);
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
    server: string;
    scheduler: Scheduler;
    constructor(client) {
        this.client = client;
    }
    private getURL(): string {
        return `http://${this.client.ip}:${this.client.port}/api/v1/servers/`
    }
    public fetch(_id) {
        this.server = _id;
        this.scheduler = new Scheduler(this.client, _id);
        return this;
    }
    public async getTasks() {
        let response = await this.client.instance.get(this.getURL() + `${this.server}/scheduler/tasks`);
        return this.client.generateResponse(response.status, response.data);
    }
    public async get(_id): Promise<AppResponse> {
        let response = await this.client.instance.get(this.getURL() + _id);
        return this.client.generateResponse(response.status, response.data);
    }
    public async getStats(_id): Promise<AppResponse> {
        let response = await this.client.instance.get(this.getURL() + _id + "/stats");
        return this.client.generateResponse(response.status, response.data);
    }
    public async getIcon(_id): Promise<AppResponse> {
        let response = await this.client.instance.get(this.getURL() + _id + "/icon");
        return this.client.generateResponse(response.status, response.data);
    }
    public async edit(_id: string, server: ServerEditor): Promise<AppResponse> {
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


class Scheduler {
    client: any;
    server: any;
    constructor(client, args) {
        this.client = client;
        this.server = args;
    }
    private getURL(_id): string {
        return `http://${this.client.ip}:${this.client.port}/api/v1/servers/${_id}/scheduler`
    }
    public async create(task: ServerTask) {
        if(!task.name || !task.timing || !task.job) throw new Error("You are missing required Arguments for creating a task.");
        let response = await this.client.instance.request({
            method: 'POST',
            url: this.getURL(this.server) + "/tasks",
            data: JSON.stringify(task)
        });
        return this.client.generateResponse(response.status, response.data);
    }
    public async edit(_id: string, task: ServerTask) {
        if(!task.name || !task.timing || !task.job) throw new Error("You are missing required Arguments for creating a task.")
        await this.client.instance.request({
            method: 'PUT',
            url: this.getURL(this.server) + "/tasks/" + _id,
            data: JSON.stringify(task)
        });
    }
    public async delete(_id: string) {
        await this.client.instance.delete(this.getURL(this.server) + "/tasks/" + _id);
    }
    public async run(_id: string) {
        await this.client.instance.post(this.getURL(this.server) + "/tasks/" + _id);
    }
    public async get(_id: string): Promise<AppResponse> {
        let response = await this.client.instance.get(this.getURL(this.server) + "/tasks/" + _id);
        return this.client.generateResponse(response.status, response.data);
    }
    public async details(): Promise<AppResponse> {
        let response = await this.client.instance.get(this.getURL(this.server));
        return this.client.generateResponse(response.status, response.data);
    }
}

class ServerTask {
    name: string;
    enabled: boolean;
    playerRequirement: number;
    timing: object;
    job: object;
    constructor() {
        this.name;
        this.enabled;
        this.playerRequirement;
        this.timing;
        this.job;
    }
    setName(name: string) {
        this.name = name;
        return this;
    }
    setEnabled(condition: boolean) {
        this.enabled = condition;
        return this;
    }
    setPlayerRequirement(value: number) {
        this.playerRequirement = value;
        return this;
    }
    setTiming(interval: number, repeat: boolean) {
        this.timing = { repeat: repeat, interval: interval};
        return this;
    }
    setJobs(commands: object) {
        this.job = { commands };
        return this;
    }
}
module.exports.ServerTask = ServerTask;

/*
class Backups {
    client: any;
    constructor(client) {
        this.client = client;
    }
}
*/