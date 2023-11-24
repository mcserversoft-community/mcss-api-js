import { AppResponse } from "./client";

import Task from "./builders/Task";
import Servers from "./servers";

/**
 * @enum TaskFilter
 * @description The scheduler response object
 */
export enum TaskFilter {
    None = 0,
    FixedTime = 1,
    Interval = 2,
    Timeless = 3
}

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
            case 403:
                return { status: 403, error: { message: 'You do not have permission to access this server' } }
            case 404:
                return { status: 404, error: { message: 'Server not found' } }
            default:
                return { status: code, error: { message: 'An unexpected error occured' } }
        };
    }

    /**
     * @description Get the current scheduler status
     * @returns {Promise<AppResponse>}
     */
    public async get(): Promise<AppResponse> {
        const response = await this.instance.get(`servers/${this.server}/scheduler`);
        return this.generateResponse(response.status, response.data);
    }

    /**
     * @description Get all tasks
     * @param {TaskFilter|number} filter - The filter to apply
     * @returns {Promise<AppResponse>}
     */
    public async getTasks(filter: TaskFilter|number = 0): Promise<AppResponse> {
        const response = await this.instance.get(`servers/${this.server}/scheduler/tasks${filter ? `?filter=${filter}` : ''}`);
        return this.generateResponse(response.status, response.data);
    }

    /**
     * @description Get a specific task
     * @param {string} Id - The task ID
     * @returns {Promise<AppResponse>}
     */
    public async getTask(Id: string): Promise<AppResponse> {
        const response = await this.instance.get(`servers/${this.server}/scheduler/tasks/${Id}`);
        return this.generateResponse(response.status, response.data);
    }

    /**
     * @description Create a new task
     * @param {Task} data - The task data
     * @returns {Promise<AppResponse>}
     */
    public async create(data: any | Task): Promise<AppResponse> {
        const response = await this.instance.post(`servers/${this.server}/scheduler/tasks`, data);
        return this.generateResponse(response.status, response.data);
    }

    /**
     * @description Update a task
     * @param {string} Id - The task ID
     * @param {Task} data - The task data
     * @returns {Promise<AppResponse>}
     */
    public async update(Id: string, data: any | Task): Promise<AppResponse> {
        const response = await this.instance.put(`servers/${this.server}/scheduler/tasks/${Id}`, data);
        return this.generateResponse(response.status, response.data);
    }

    /**
     * @description Delete a task
     * @param {string} Id - The task ID
     * @returns {Promise<AppResponse>}
     */
    public async delete(Id: string): Promise<AppResponse> {
        const response = await this.instance.delete(`servers/${this.server}/scheduler/tasks/${Id}`);
        return this.generateResponse(response.status, response.data);
    }

    /**
     * @description Execute a task
     * @param {string} Id - The task ID
     * @returns {Promise<AppResponse>}
     */
    public async run(Id: string): Promise<AppResponse> {
        const response = await this.instance.post(`servers/${this.server}/scheduler/tasks/${Id}/`);
        return this.generateResponse(response.status, response.data);
    }

}