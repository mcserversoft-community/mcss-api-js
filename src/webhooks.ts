import { AxiosInstance } from "axios";

import { AppResponse } from "./types";
import Webhook from "./builders/Webhook";

export default class Webhooks {
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
     * Create a webhook
     * @param {Webhook} webhook The webhook to create
     * @returns {Promise<AppResponse>} The response from the API
     */
    async create(webhook: Webhook): Promise<AppResponse> {
        const response = await this.#instance.post(`webhooks`, webhook.toJSON());
        return this.generateResponse(response.status, response.data);
    }

    /**
     * Get a webhook by its ID
     * @param {string|null} webhookId The ID of the webhook to get, or null to get all webhooks
     * @returns {Promise<AppResponse>} The response from the API
     */
    async get(webhookId: string|null): Promise<AppResponse> {
        const response = await this.#instance.get(`webhooks/${webhookId}`);
        return this.generateResponse(response.status, response.data);
    }

    /**
     * Edit a webhook
     * @param {string} webhookId The ID of the webhook to edit
     * @param {Webhook} webhook The webhook to edit
     * @returns {Promise<AppResponse>} The response from the API
     */
    async edit(webhookId: string, webhook: Webhook): Promise<AppResponse> {
        const response = await this.#instance.put(`webhooks/${webhookId}`, webhook.toJSON());
        return this.generateResponse(response.status, response.data);
    }

    /**
     * Delete a webhook
     * @param {string} webhookId The ID of the webhook to delete
     * @returns {Promise<AppResponse>} The response from the API
     */
    async delete(webhookId: string): Promise<AppResponse> {
        const response = await this.#instance.delete(`webhooks/${webhookId}`);
        return this.generateResponse(response.status, response.data);
    }
}