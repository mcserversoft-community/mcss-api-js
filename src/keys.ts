import { AxiosInstance } from "axios";

import { AppResponse } from "./types";

import Key from "./builders/Key";

export default class APIKeys {
    #instance: any;
    constructor(instance: AxiosInstance) {
        this.#instance = instance;
    }

    private generateResponse(code: number, data?: any): AppResponse {
        switch(code) {
            case 200:
                return { status: 200, data };
            case 204:
                return { status: 204, data: {} }
            case 400:
                return { status: 400, error: { message: 'Invalid API key' } }
            case 401:
                return { status: 401, error: { message: 'Incorrect API key' } }
            case 403:
                return { status: 403, error: { message: 'You do not have permission to access this resource' } }
            default: 
                return { status: code, error: { message: 'An unexpected error occurred' } }
        }
    }

    /**
     * Gets a list of all API keys.
     * @returns {Promise<AppResponse>} A promise that resolves to an AppResponse containing the list of keys.
     */
    async get(): Promise<AppResponse> {
        const response = await this.#instance.get(`keys`);
        return this.generateResponse(response.status, response.data);
    }

    /**
     * Creates a new API key.
     * @param {Key} key - The Key instance to create.
     * @returns {Promise<AppResponse>} A promise that resolves to an AppResponse containing the created key.
     */
    async create(key: Key): Promise<AppResponse> {
        const response = await this.#instance.post(`keys`, key.toJSON());
        return this.generateResponse(response.status, response.data);
    }

    /**
     * Deletes an API key by its ID.
     * @param {string} keyId - The ID of the key to delete.
     * @returns {Promise<AppResponse>} A promise that resolves to an AppResponse indicating the result of the deletion.
     */
    async delete(keyId: string): Promise<AppResponse> {
        const response = await this.#instance.delete(`keys/${keyId}`);
        return this.generateResponse(response.status, response.data);
    }
}