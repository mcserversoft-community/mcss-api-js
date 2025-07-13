import { AxiosInstance } from "axios";
import { AppResponse } from "./types";

import { ServerFilter } from "./client";

import Server from "./builders/Server";
import Scheduler from "./scheduler";
import Backups from "./backups";

/**
 * @enum ServerAction
 *   The server action enum
 */
export enum ServerAction {
    InvalidOrEmpty = 0,
    Stop = 1,
    Start = 2,
    Kill = 3,
    Restart = 4,
}

/**
 * @class ServerObject
 * The server interface
 * @hideconstructor
 */
export class ServerObject {
    #instance: AxiosInstance;
    statusCode: number;
    raw: any;
    id: string;
    name: string;
    type: string;
    ip: string;
    port: number;
    players: number;
    maxPlayers: number;
    status: string;
    version: string;

    /**
     * Scheduler  of server object
     * @type {Scheduler}
     */
    scheduler: Scheduler;

    /**
     * Backups  of server object
     * @type {Backups}
     */
    backups: Backups;

    constructor(instance: AxiosInstance, statusCode:number, obj: any) {
        this.#instance = instance;
        this.statusCode = statusCode;
        this.raw = obj;
        this.id = obj.id;
        this.name = obj.name;
        this.type = obj.type;
        this.ip = obj.ip;
        this.port = obj.port;
        this.players = obj.players;
        this.maxPlayers = obj.maxPlayers;
        this.status = obj.status;
        this.version = obj.version;

        if(!this.id) throw new Error("No server ID specified");

        this.scheduler = new Scheduler(this.#instance, this.id);
        this.backups = new Backups(this.#instance, this.id);
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
     *   Gets the server's stats
     * @returns {Promise<AppResponse>}
     */
    async getStats(): Promise<AppResponse> {
        const response = await this.#instance.get(`servers/${this.id}/stats`);
        return this.generateResponse(response.status, response.data);
    }

    /**
     *   Gets the server's icon
     * @returns {Promise<AppResponse>}
     */
    async getIcon(): Promise<AppResponse> {
        const response = await this.#instance.get(`servers/${this.id}/icon`);
        return this.generateResponse(response.status, response.data);
    }

    /**
     * Executes a command on the server
     * @param {ServerAction|number|string[]} command - The command to execute
     * @returns {Promise<AppResponse>}
     */
    async execute(...command: any): Promise<AppResponse> {
        let response;
        if(!this.id) throw new Error("No server selected");
        if(typeof command[0] == "number") {
            response = await this.#instance.post(`servers/${this.id}/execute/action`, { action: command[0] });
            return this.generateResponse(response.status, response.data);
        }
        if(command.length == 1) {
            response = await this.#instance.post(`servers/${this.id}/execute/command`, { command: command[0] })
            return this.generateResponse(response.status, response.data);
        }
        response = await this.#instance.post(`servers/${this.id}/execute/commands`, { commands: command });
        return this.generateResponse(response.status, response.data);
    }

    /**
     *   Edits the server
     * @param {Server|object} obj - The object to edit
     * @returns {Promise<AppResponse>}
     */
    async edit(obj: Server|object): Promise<AppResponse> {
        const response = await this.#instance.put(`servers/${this.id}`, obj);
        return this.generateResponse(response.status, response.data);
    }
    /**
     *   Gets the server's console
     * @param {number} AmountOfLines - The amount of lines to get
     * @param {boolean} Reversed - Whether to reverse the output
     * @param {boolean} takeFromBeginning - Whether to take the output from the beginning
     * @returns {Promise<AppResponse>}
    */
    async getConsole(AmountOfLines: number = 5, Reversed: boolean = false, takeFromBeginning: boolean = false): Promise<AppResponse> {
        const response = await this.#instance.get(`servers/${this.id}/console`, { params: { AmountOfLines, Reversed, takeFromBeginning } });
        return this.generateResponse(response.status, response.data);
    }

    /**
     *   Checks whether the console is outdated
     * @param {string} secondLastLine - The second last line of the console (required)
     * @param {string} lastLine - The last line of the console (required)
     * @returns {Promise<AppResponse>}
    */
    async isConsoleOutdated(secondLastLine: string, lastLine: string): Promise<AppResponse> {
        if(!secondLastLine || !lastLine) throw new Error("No second last line or last line specified");
        const response = await this.#instance.get(`servers/${this.id}/console/outdated${secondLastLine && lastLine ? `?secondLastLine=${secondLastLine}&lastLine=${lastLine}` : ''}`);
        return this.generateResponse(response.status, response.data);
    }
    
}

/**
 * @class Servers
 *   The servers class
 * @example
 * ```js
 * let servers = client.servers; 
 * ```
 */
export default class Servers {
    #instance: any;
    server: string | null;
    constructor(instance: AxiosInstance) {
        this.#instance = instance;
        this.server = null;
    }

    private generateResponse(code: number, data?: any): ServerObject|AppResponse {
        switch(code) {
            case 200:
                return new ServerObject(this.#instance, 200, data);
            case 204:
                return { status: 204, data: {} }
            case 207:
                return { status: 207, data: data.map((d: any) => new ServerObject(this.#instance, 207, d)) }
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
     *   Gets the server with the specified ID
     * @param {string} Id - The server ID
     * @param {ServerFilter|number} filter - The filter to apply
     * @returns {Promise<ServerObject|AppResponse>}
     */
    public async get(Id: string, filter: ServerFilter|number = 0): Promise<ServerObject|AppResponse> {
        if(!Id) throw new Error("No server ID specified");
        const response = await this.#instance.get(`servers/${Id}?filter=${filter}`);
        if(response.status == 200) this.server = Id;
        return this.generateResponse(response.status, response.data);
    }

    /**
     *   Executes a command on the specified servers
     * @param {string[]} servers - The servers to execute the command on
     * @param {ServerAction|number|string[]} command - The command to execute
     * @returns {Promise<ServerObject|AppResponse>}
     */
    public async execute(servers: string[], ...command: any): Promise<ServerObject|AppResponse> {
        let response;
        if(!servers.length) throw new Error("No servers selected");
        if(typeof command[0] == "number") {
            response = await this.#instance.post(`servers/execute/action`, { serverIds: servers, action: command[0] });
            return this.generateResponse(response.status, response.data);
        }
        if(command.length == 1) {
            response = await this.#instance.post(`servers/execute/command`, { serverIds: servers, command: command[0] })
            return this.generateResponse(response.status, response.data);
        }
        response = await this.#instance.post(`servers/execute/commands`, { serverIds: servers, commands: command });
        return this.generateResponse(response.status, response.data);
    }

}