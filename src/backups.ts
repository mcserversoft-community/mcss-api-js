import Backup from "./builders/Backup";

import { AppResponse } from './types';

import { AxiosInstance } from "axios";

export default class Backups {
    #instance: any;
    server: string | null;
    constructor(instance: AxiosInstance, serverId: string | null) {
        this.#instance = instance;
        this.server = serverId;
    }

    private generateResponse(code: number, data?: any): AppResponse {
        switch(code) {
            case 200:
                return { status: 200, data };
            case 204:
                return { status: 204, data: {} }
            case 400:
                return { status: 400, error: { message: 'Invaild Section' } }
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
     *   Get all backups
     * @returns {Promise<AppResponse>}
     */
    public async get(): Promise<AppResponse> {
        const response = await this.#instance.get(`/servers/${this.server}/backups`);
        return this.generateResponse(response.status, response.data);
    }

    /**
     *   Get backup stats
     * @returns {Promise<AppResponse>}
     */
    public async getStats(): Promise<AppResponse> {
        const response = await this.#instance.get(`/servers/${this.server}/backups/stats`);
        return this.generateResponse(response.status, response.data);
    }

    /**
     *   Get a specific backup
     * @param {string} backup - The backup ID
     * @returns {Promise<AppResponse>}
     */
    public async getBackup(backup: string): Promise<AppResponse> {
        const response = await this.#instance.get(`/servers/${this.server}/backups/${backup}`);
        return this.generateResponse(response.status, response.data);
    }

    /**
     *   Create a new backup
     * @param {Backup} data - The backup data
     * @returns {Promise<AppResponse>}
     */
    public async create(data: Backup): Promise<AppResponse> {
        if(!data.name || !data.destination) throw new Error('Missing required parameters');
        const response = await this.#instance.post(`/servers/${this.server}/backups`, data);
        return this.generateResponse(response.status, response.data);
    }

    /**
     *   Update a backup
     * @param {string} backup - The backup ID
     * @param {Backup} data - The backup data
     * @returns {Promise<AppResponse>}
     */
    public async update(backup: string, data: Backup): Promise<AppResponse> {
        const response = await this.#instance.put(`/servers/${this.server}/backups/${backup}`, data);
        return this.generateResponse(response.status, response.data);
    }

    /**
     *   Delete a backup
     * @param {string} backup - The backup ID
     * @returns {Promise<AppResponse>}
     */
    public async delete(backup: string): Promise<AppResponse> {
        const response = await this.#instance.delete(`/servers/${this.server}/backups/${backup}`);
        return this.generateResponse(response.status, response.data);
    }

    /**
     *   Run a backup
     * @param {string} backup - The backup ID
     * @returns {Promise<AppResponse>}
     */
    public async run(backup: string): Promise<AppResponse> {
        const response = await this.#instance.post(`/servers/${this.server}/backups/${backup}`);
        return this.generateResponse(response.status, response.data);
    }

    /**
     *   Gets server backup history
     * @returns {Promise<AppResponse>}
     */
    public async getHistory(): Promise<AppResponse> {
        const response = await this.#instance.get(`/servers/${this.server}/backups/history`);
        return this.generateResponse(response.status, response.data);
    }

    /**
     *   Clears server backup history
     * @returns {Promise<AppResponse>}
     */
    public async clearHistory(): Promise<AppResponse> {
        const response = await this.#instance.post(`/servers/${this.server}/backups/history/clear`);
        return this.generateResponse(response.status, response.data);
    }

}