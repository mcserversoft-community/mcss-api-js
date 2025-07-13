import axios, { AxiosInstance } from 'axios';

import { AppResponse } from './types';

import Servers, { ServerObject } from './servers';
import Users from './users';
import Webhooks from './webhooks';
import APIKeys from './keys';

/**
 * @enum ServerFilter
 *   The filter to use when getting servers
 */
export enum ServerFilter {
    NONE = 0,
    MINIMAL = 1,
    STATUS = 2
}

/**
 * @enum ServerCountFilter
 *   The filter to use when getting server count
 */
export enum ServerCountFilter {
    NONE = 0,
    ONLINE = 1,
    OFFLINE = 2,
    BYSERVERTYPE = 3
}

/**
 * @enum ServerType
 *   The server type to use when getting server count
 */
export enum ServerType {
    VANILLA = "349bf6c7-2d19-4e42-bcee-592fa862bcee",
    CRAFTBUKKIT = "afa8b9d6-592d-4016-9dd7-eed4185ca8b8",
    SPIGOT = "de188054-f3ac-472d-81d6-c57f0412bfa6",
    PAPER = "f738fb40-223e-4010-bd07-af4caabdf3dd",
    BUNGEECORD = "1a1bb7be-219f-4dc8-9a6a-4a10dc725391",
    WATERFALL = "f49ad4bf-7900-45a4-940b-c97468fbba1f",
    FORGE = "8e3aecd7-b81b-4827-a3e2-93a701cdd3b4",
    FABRIC = "c45acfcf-b4a1-4733-aab0-f78e1091ae16",
    BEDROCK = "87c2620f-48a0-47e6-97c1-ff5fbbc128f3",
    PURPUR = "984ed3d3-636d-4535-82b2-7c1048782c64"
}


/**
 * @class Client
 * The main class for interacting with the MCSS API
 * @example
 * ```js
 * const client = new Client("127.0.0.1", 8080, "API_KEY", true);
 * ```
 */

export default class Client {
    #instance: AxiosInstance;
    #ip: string;
    #port: string | number | null;
    #https: boolean;

    /**
     * The server class
     * @type {Servers}
     */
    servers: Servers;

    /**
     * The users class
     * @type {Users}
     */
    users: Users;

    /**
     * The webhooks class
     * @type {Webhooks}
     */
    webhooks: Webhooks;

    apikeys: APIKeys;

    constructor(ip: string, port: string|number|null, apiKey: string, https: boolean = true) {

        if(!ip || !port || !apiKey) throw new Error("Missing parameters");

        this.#ip = ip;
        this.#port = port;
        this.#https = https;

        this.#instance = axios.create({
            validateStatus: () => true,
            baseURL: `${https ? "https" : "http"}://${ip}:${port ? port : ""}/api/v2/`,
            headers: {
                apiKey
            }
        });

        this.servers = new Servers(this.#instance);
        this.users = new Users(this.#instance);
        this.webhooks = new Webhooks(this.#instance);
        this.apikeys = new APIKeys(this.#instance);
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
     * Get the stats of the panel
     * @returns {Promise<AppResponse>}
     */
    public async getStats(): Promise<AppResponse> {
        const response = await this.#instance.get("/");
        return this.generateResponse(response.status, response.data);
    }

    /**
     * Get all servers
     * @param {ServerFilter|number} filter - The filter to use
     * @returns {Promise<ServerObject[]|AppResponse>}
     */
    public async getServers(filter: ServerFilter|number = 0): Promise<ServerObject[]|AppResponse> {
        const response = await this.#instance.get(`servers?filter=${filter}`);
        let appResponse = this.generateResponse(response.status, response.data);
        if(appResponse.status === 200) return appResponse.data?.map((server: any) => new ServerObject(this.#instance, 200, server));
        return appResponse;
    }

    /**
     * Get a server by id
     * @param {ServerCountFilter|number} filter - The filter to use
     * @param {ServerType|string} serverType - The server type to use
     * @returns {Promise<AppResponse>}
     */
    public async getServerCount(filter: ServerCountFilter|number = 0, serverType: ServerType|string): Promise<AppResponse> {
        if(filter === ServerCountFilter.BYSERVERTYPE && !serverType) throw new Error("Missing serverType parameter");
        const response = await this.#instance.get(`servers/count?filter=${filter}${serverType ? `&serverType=${serverType}` : ""}`);
        return this.generateResponse(response.status, response.data);
    }

    /**
     * Set MCSS settings
     * @returns {Promise<AppResponse>}
     */
    public async getSettings(): Promise<AppResponse> {
        const response = await this.#instance.get(`mcss/settings/All`);
        return this.generateResponse(response.status, response.data);
    }

    /**
     * Update the MCSS settings
     * @param {number} deleteOldBackupsThreshold - The number of backups to keep
     * @returns {Promise<AppResponse>}
     */
    public async updateSettings(deleteOldBackupsThreshold: number): Promise<AppResponse> {
        if(!deleteOldBackupsThreshold) throw new Error("Missing deleteOldBackupsThreshold parameter");
        const settings = {
            deleteOldBackupsThreshold
        }
        const response = await this.#instance.patch(`mcss/settings`, settings);
        return this.generateResponse(response.status, response.data);
    }

    /**
     * Sets the API key
     * @returns {void}
     */
    public setApiKey(apiKey: string): void { this.#instance.defaults.headers.apiKey = apiKey; }

    /**
     * Sets the IP
     * @returns {void}
     */
    public setIp(ip: string): void {
        this.#ip = ip;
        this.#instance.defaults.baseURL = `${this.#https ? "https" : "http"}://${ip}:${this.#port ? this.#port : ""}/api/v2/`;
    }

    /**
     * Sets the Port
     * @returns {void}
     */
    public setPort(port: string|number): void {
        this.#port = port;
        this.#instance.defaults.baseURL = `${this.#https ? "https" : "http"}://${this.#ip}:${port ? port : ""}/api/v2/`;
    }

    /**
     * Sets the Http protocol
     * @returns {void}
     */
    public setHttps(https: boolean): void {
        this.#https = https;
        this.#instance.defaults.baseURL = `${https ? "https" : "http"}://${this.#ip}:${this.#port ? this.#port : ""}/api/v2/`;
    }

}