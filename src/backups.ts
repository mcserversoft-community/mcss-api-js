import { AppResponse } from "./client";
import Servers from "./servers";

export default class Backups {
    instance: any;
    server: string | null;
    constructor(obj: Servers) {
        this.instance = obj.instance;
        this.server = obj.server;
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

    public async get(): Promise<AppResponse> {
        const response = await this.instance.get(`/servers/${this.server}/backups`);
        return this.generateResponse(response.status, response.data);
    }

    public async getBackup(backup: string): Promise<AppResponse> {
        const response = await this.instance.get(`/servers/${this.server}/backups/${backup}`);
        return this.generateResponse(response.status, response.data);
    }

    /*
    public async create(): Promise<AppResponse> {
        const response = await this.instance.post(`/servers/${this.server}/backups`);
        return this.generateResponse(response.status, response.data);
    }
    */

    public async delete(backup: string): Promise<AppResponse> {
        const response = await this.instance.delete(`/servers/${this.server}/backups/${backup}`);
        return this.generateResponse(response.status, response.data);
    }

    public async run(backup: string): Promise<AppResponse> {
        const response = await this.instance.post(`/servers/${this.server}/backups/${backup}`);
        return this.generateResponse(response.status, response.data);
    }

}