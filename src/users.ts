import Client, { AppResponse } from "./client";

import User from "./builders/User";

export default class Users {
    instance: any;
    constructor(obj: Client) {
        this.instance = obj.instance; 
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
        const response = await this.instance.get(`users`);
        return this.generateResponse(response.status, response.data);
    }

    public async getUser(id: string): Promise<AppResponse> {
        const response = await this.instance.get(`users/${id}`);
        return this.generateResponse(response.status, response.data);
    }

    public async createUser(user: object | User): Promise<AppResponse> {
        const response = await this.instance.post(`users`, user);
        return this.generateResponse(response.status, response.data);
    }

    public async updateUser(id: string, user: object | User): Promise<AppResponse> {
        const response = await this.instance.put(`users/${id}`, user);
        return this.generateResponse(response.status, response.data);
    }

    public async deleteUser(id: string): Promise<AppResponse> {
        const response = await this.instance.delete(`users/${id}`);
        return this.generateResponse(response.status, response.data);
    }

    public async wipeSessions(): Promise<AppResponse> {
        const response = await this.instance.post(`users/wipe/sessions`);
        return this.generateResponse(response.status, response.data);
    }

}