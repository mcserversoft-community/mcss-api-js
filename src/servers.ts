import Client, { AppResponse, ServerFilter } from "./client";

import Server from "./builders/Server";

import Scheduler from "./scheduler";
import Backups from "./backups";

type ServerResponse = {
    status: number
    data?: any
    error?: {
        message: string
    }
    getStats?: () => Promise<AppResponse>
    getIcon?: () => Promise<AppResponse>
    execute?: (...command: any) => Promise<AppResponse>
    edit?: (obj: Server|object) => Promise<AppResponse>
    getConsole?: (AmountOfLines?: number, Reversed?: boolean, takeFromBeginning?: boolean) => Promise<AppResponse>
    isConsoleOutdated?: () => Promise<AppResponse>
    scheduler?: Scheduler
    backups?: Backups
}

export enum ServerAction {
    InvalidOrEmpty = 0,
    Stop = 1,
    Start = 2,
    Kill = 3,
    Restart = 4,
}

export default class Servers {
    instance: any;
    server: string | null;
    constructor(obj: Client) {
        this.instance = obj.instance;
        this.server = null;
    }

    private generateServerResponse(code: number, data?: any): ServerResponse {
        switch(code) {
            case 200:
                return { 
                    status: 200, 
                    data, 
                    getStats: this.getStats.bind(this), 
                    getIcon: this.getIcon.bind(this), 
                    execute: this.serverExecute.bind(this), 
                    edit: this.edit.bind(this),
                    getConsole: this.getConsole.bind(this),
                    isConsoleOutdated: this.isConsoleOutdated.bind(this),
                    scheduler: new Scheduler(this),
                    backups: new Backups(this)
                }
            case 207:
                return { status: 207, data: data.map((d: any) => ({ ...d, getStats: this.getStats.bind(this), getIcon: this.getIcon.bind(this), execute: this.serverExecute.bind(this), edit: this.edit.bind(this), getConsole: this.getConsole.bind(this), isConsoleOutdated: this.isConsoleOutdated.bind(this), scheduler: new Scheduler(this), backups: new Backups(this) })) }
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

    private generateResponse(code: number, data?: any): AppResponse {
        switch(code) {
            case 200:
                return { status: 200, data }
            case 401:
                return { status: 401, error: { message: 'Incorrect API key' } }
            case 404:
                return { status: 404, error: { message: 'Server not found' } }
            default:
                return { status: code, error: { message: 'An unexpected error occured' }, data }
        };
    }

    /**
     * @description Gets the server with the specified ID
     * @param {string} Id - The server ID
     * @param {ServerFilter|number} filter - The filter to apply
     * @returns {Promise<ServerResponse>}
     */
    public async get(Id: string, filter: ServerFilter|number = 0): Promise<ServerResponse> {
        if(!Id) throw new Error("No server ID specified");
        const response = await this.instance.get(`servers/${Id}?filter=${filter}`);
        if(response.status == 200) this.server = Id;
        return this.generateServerResponse(response.status, response.data);
    }

    /**
     * @description Executes a command on the specified servers
     * @param {string[]} servers - The servers to execute the command on
     * @param {ServerAction|number|string[]} command - The command to execute
     * @returns {Promise<ServerResponse>}
     */
    public async execute(servers: string[], ...command: any): Promise<AppResponse> {
        let response;
        if(!servers.length) throw new Error("No servers selected");
        if(typeof command[0] == "number") {
            response = await this.instance.post(`servers/execute/action`, { serverIds: servers, action: command[0] });
            return this.generateResponse(response.status, response.data);
        }
        if(command.length == 1) {
            response = await this.instance.post(`servers/execute/command`, { serverIds: servers, command: command[0] })
            return this.generateResponse(response.status, response.data);
        }
        response = await this.instance.post(`servers/execute/commands`, { serverIds: servers, commands: command });
        return this.generateResponse(response.status, response.data);
    }

    /**
     * @description Gets the server's stats
     * @returns {Promise<ServerResponse>}
     */
    private async getStats(): Promise<AppResponse> {
        if(!this.server) throw new Error("No server selected");
        const response = await this.instance.get(`servers/${this.server}/stats`);
        return this.generateResponse(response.status, response.data);
    }

    /**
     * @description Gets the server's icon
     * @returns {Promise<ServerResponse>}
     */
    private async getIcon(): Promise<AppResponse> {
        if(!this.server) throw new Error("No server selected");
        const response = await this.instance.get(`servers/${this.server}/icon`);
        return this.generateResponse(response.status, response.data);
    }

    /**
     * @description Executes a command on the server
     * @param {ServerAction|number|string[]} command - The command to execute
     * @returns {Promise<ServerResponse>}
     */
    private async serverExecute(...command: any): Promise<AppResponse> {
        let response;
        if(!this.server) throw new Error("No server selected");
        if(typeof command[0] == "number") {
            response = await this.instance.post(`servers/${this.server}/execute/action`, { action: command[0] });
            return this.generateResponse(response.status, response.data);
        }
        if(command.length == 1) {
            response = await this.instance.post(`servers/${this.server}/execute/command`, { command: command[0] })
            return this.generateResponse(response.status, response.data);
        }
        response = await this.instance.post(`servers/${this.server}/execute/commands`, { commands: command });
        return this.generateResponse(response.status, response.data);
    }

    /**
     * @description Edits the server
     * @param {Server|object} obj - The object to edit
     * @returns {Promise<ServerResponse>}
     */
    private async edit(obj: Server|object): Promise<AppResponse> {
        if(!this.server) throw new Error("No server selected");
        const response = await this.instance.put(`servers/${this.server}`, obj);
        return this.generateResponse(response.status, response.data);
    }

    /**
     * @description Gets the server's console
     * @param {number} AmountOfLines - The amount of lines to get
     * @param {boolean} Reversed - Whether to reverse the output
     * @param {boolean} takeFromBeginning - Whether to take the output from the beginning
     * @returns {Promise<ServerResponse>}
     */
    private async getConsole(AmountOfLines: number = 5, Reversed: boolean = false, takeFromBeginning: boolean = false): Promise<AppResponse> {
        if(!this.server) throw new Error("No server selected");
        const response = await this.instance.get(`servers/${this.server}/console`, { params: { AmountOfLines, Reversed, takeFromBeginning } });
        return this.generateResponse(response.status, response.data);
    }

    /**
     * @description Checks whether the console is outdated
     * @param {string} secondLastLine - The second last line of the console (required)
     * @param {string} lastLine - The last line of the console (required)
     * @returns {Promise<ServerResponse>}
     */
    private async isConsoleOutdated(secondLastLine: string, lastLine: string): Promise<AppResponse> {
        if(!this.server) throw new Error("No server selected");
        if(!secondLastLine || !lastLine) throw new Error("No second last line or last line specified");
        const response = await this.instance.get(`servers/${this.server}/console/outdated${secondLastLine && lastLine ? `?secondLastLine=${secondLastLine}&lastLine=${lastLine}` : ''}`);
        return this.generateResponse(response.status, response.data);
    }

}