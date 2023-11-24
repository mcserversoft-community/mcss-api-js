import Backup from "./builders/Backup";

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
            case 403:
                return { status: 403, error: { message: 'You do not have permission to access this server' } }
            case 404:
                return { status: 404, error: { message: 'Server not found' } }
            default:
                return { status: code, error: { message: 'An unexpected error occured' } }
        }
    }

    /**
     * @description Get all backups
     * @returns {Promise<AppResponse>}
     */
    public async get(): Promise<AppResponse> {
        const response = await this.instance.get(`/servers/${this.server}/backups`);
        return this.generateResponse(response.status, response.data);
    }

    /**
     * @description Get backup stats
     * @returns {Promise<AppResponse>}
     */
    public async getStats(): Promise<AppResponse> {
        const response = await this.instance.get(`/servers/${this.server}/backups/stats`);
        return this.generateResponse(response.status, response.data);
    }

    /**
     * @description Get a specific backup
     * @param {string} backup - The backup ID
     * @returns {Promise<AppResponse>}
     */
    public async getBackup(backup: string): Promise<AppResponse> {
        const response = await this.instance.get(`/servers/${this.server}/backups/${backup}`);
        return this.generateResponse(response.status, response.data);
    }

    /**
     * @description Create a new backup
     * @param {Backup} data - The backup data
     * @returns {Promise<AppResponse>}
     */
    public async create(data: Backup): Promise<AppResponse> {
        if(!data.name || !data.destination) throw new Error('Missing required parameters');
        const response = await this.instance.post(`/servers/${this.server}/backups`, data);
        return this.generateResponse(response.status, response.data);
    }

    /**
     * @description Update a backup
     * @param {string} backup - The backup ID
     * @param {Backup} data - The backup data
     * @returns {Promise<AppResponse>}
     */
    public async update(backup: string, data: Backup): Promise<AppResponse> {
        const response = await this.instance.put(`/servers/${this.server}/backups/${backup}`, data);
        return this.generateResponse(response.status, response.data);
    }

    /**
     * @description Delete a backup
     * @param {string} backup - The backup ID
     * @returns {Promise<AppResponse>}
     */
    public async delete(backup: string): Promise<AppResponse> {
        const response = await this.instance.delete(`/servers/${this.server}/backups/${backup}`);
        return this.generateResponse(response.status, response.data);
    }

    /**
     * @description Run a backup
     * @param {string} backup - The backup ID
     * @returns {Promise<AppResponse>}
     */
    public async run(backup: string): Promise<AppResponse> {
        const response = await this.instance.post(`/servers/${this.server}/backups/${backup}`);
        return this.generateResponse(response.status, response.data);
    }

    /**
     * @description Gets server backup history
     * @returns {Promise<AppResponse>}
     */
    public async getHistory(): Promise<AppResponse> {
        const response = await this.instance.get(`/servers/${this.server}/backups/history`);
        return this.generateResponse(response.status, response.data);
    }

    /**
     * @description Clears server backup history
     * @returns {Promise<AppResponse>}
     */
    public async clearHistory(): Promise<AppResponse> {
        const response = await this.instance.post(`/servers/${this.server}/backups/history/clear`);
        return this.generateResponse(response.status, response.data);
    }

}