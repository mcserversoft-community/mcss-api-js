import { AppResponse } from "./client";

import Task from "./builders/Task";
import Servers from "./servers";

export default class Scheduler {
    protected instance: any;
    server: string | null;
    constructor(obj: Servers) {
        this.instance = obj.instance;
        this.server = obj.server;
    }
    private generateResponse(code: number, data?: any): AppResponse {
        switch(code) {
            case 200:
                return { status: 200, data }
            case 401:
                return { status: 401, error: { message: 'Incorrect API key' } }
            case 404:
                return { status: 404, error: { message: 'Server not found' } }
            default:
                return { status: code, error: { message: 'An unexpected error occured' } }
        };
    }

    public async get(): Promise<AppResponse> {
        const response = await this.instance.get(`servers/${this.server}/scheduler`);
        return this.generateResponse(response.status, response.data);
    }

    public async getTasks(): Promise<AppResponse> {
        const response = await this.instance.get(`servers/${this.server}/scheduler/tasks`);
        return this.generateResponse(response.status, response.data);
    }

    public async getTask(Id: string): Promise<AppResponse> {
        const response = await this.instance.get(`servers/${this.server}/scheduler/tasks/${Id}`);
        return this.generateResponse(response.status, response.data);
    }

    public async create(data: any | Task): Promise<AppResponse> {
        const response = await this.instance.post(`servers/${this.server}/scheduler/tasks`, data);
        return this.generateResponse(response.status, response.data);
    }

    public async update(Id: string, data: any | Task): Promise<AppResponse> {
        const response = await this.instance.put(`servers/${this.server}/scheduler/tasks/${Id}`, data);
        return this.generateResponse(response.status, response.data);
    }

    public async delete(Id: string): Promise<AppResponse> {
        const response = await this.instance.delete(`servers/${this.server}/scheduler/tasks/${Id}`);
        return this.generateResponse(response.status, response.data);
    }

    public async run(Id: string): Promise<AppResponse> {
        const response = await this.instance.post(`servers/${this.server}/scheduler/tasks/${Id}/`);
        return this.generateResponse(response.status, response.data);
    }

}