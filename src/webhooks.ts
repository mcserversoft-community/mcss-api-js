import { AxiosInstance } from "axios";

import { AppResponse } from "./types";

/**
 * @enum WebhookTrigger
 *  The webhook trigger to use when creating or editing a webhook
 */ 
export enum WebhookTrigger {
    ALL = "All",
    SERVER_CREATED = "ServerCreated",
    SERVEREDITED = "ServerEdited",
    SERVERDELETED = "ServerDeleted",
    SERVERSTATUSCHANGED = "ServerStatusChanged"
}

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
     * @param {string} name The name of the webhook
     * @param {string} url The URL to send the webhook to
     * @param {number} messageFormat The format of the message to send (0 = JSON, 1 = XML)
     * @param {WebhookTrigger[]} webhookTriggers The triggers for the webhook
     * @param {Object[]} optionalHeaders Optional headers to include in the webhook request
     * @returns {Promise<AppResponse>} The response from the API
     */
    async create(name: string, url: string, messageFormat: number = 0, webhookTriggers: WebhookTrigger[] = [WebhookTrigger.ALL], optionalHeaders: Object[]): Promise<AppResponse> {
        const response = await this.#instance.post(`webhooks`, {
            name,
            url,
            messageFormat,
            webhookTriggers,
            optionalHeaders
        });
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
     * @param {string} name The new name of the webhook
     * @param {string} url The new URL to send the webhook to
     * @param {number} messageFormat The new format of the message to send (0 = JSON, 1 = XML)
     * @param {WebhookTrigger[]} webhookTriggers The new triggers for the webhook
     * @param {Object[]} optionalHeaders Optional headers to include in the webhook request
     * @returns {Promise<AppResponse>} The response from the API
     */
    async edit(webhookId: string, name: string, url: string, messageFormat: number = 0, webhookTriggers: WebhookTrigger[] = [WebhookTrigger.ALL], optionalHeaders: Object[]): Promise<AppResponse> {
        const response = await this.#instance.put(`webhooks/${webhookId}`, {
            name,
            url,
            messageFormat,
            webhookTriggers,
            optionalHeaders
        });
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