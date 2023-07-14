import Client, { AppResponse } from "./client";

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
                    execute: this.execute.bind(this), 
                    edit: this.edit.bind(this),
                    getConsole: this.getConsole.bind(this),
                    isConsoleOutdated: this.isConsoleOutdated.bind(this),
                    scheduler: new Scheduler(this),
                    backups: new Backups(this)
                }
            case 401:
                return { status: 401, error: { message: 'Incorrect API key' } }
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
                return { status: code, error: { message: 'An unexpected error occured' } }
        };
    }

    public async get(Id: string): Promise<ServerResponse> {
        const response = await this.instance.get(`servers${Id ? `/${Id}` : ""}`);
        if(response.status == 200) this.server = Id;
        return this.generateServerResponse(response.status, response.data);
    }

    private async getStats(): Promise<AppResponse> {
        if(!this.server) throw new Error("No server selected");
        const response = await this.instance.get(`servers/${this.server}/stats`);
        return this.generateResponse(response.status, response.data);
    }

    private async getIcon(): Promise<AppResponse> {
        if(!this.server) throw new Error("No server selected");
        const response = await this.instance.get(`servers/${this.server}/icon`);
        return this.generateResponse(response.status, response.data);
    }

    private async execute(...command: any): Promise<AppResponse> {
        let response;
        if(!this.server) throw new Error("No server selected");
        if(typeof command == "number") {
            let action = 0;
            switch(command) {
                case ServerAction.Stop:
                    action = 1;
                    break;
                case ServerAction.Start:
                    action = 2;
                    break;
                case ServerAction.Kill:
                    action = 3;
                    break;
                case ServerAction.Restart:
                    action = 4;
                    break;
                default:
                    throw new Error("Invalid action");
            }
            response = await this.instance.post(`servers/${this.server}/execute/action`, { action });
            return this.generateResponse(response.status, response.data);
        }
        if(command.length == 1) {
            response = await this.instance.post(`servers/${this.server}/execute/command`, { command: command[0] })
            return this.generateResponse(response.status, response.data);
        }
        response = await this.instance.post(`servers/${this.server}/execute/commands`, { commands: command });
        return this.generateResponse(response.status, response.data);
    }

    private async edit(obj: Server|object): Promise<AppResponse> {
        if(!this.server) throw new Error("No server selected");
        const response = await this.instance.put(`servers/${this.server}`, obj);
        return this.generateResponse(response.status, response.data);
    }

    private async getConsole(AmountOfLines: number = 5, Reversed: boolean = false, takeFromBeginning: boolean = false): Promise<AppResponse> {
        if(!this.server) throw new Error("No server selected");
        const response = await this.instance.get(`servers/${this.server}/console`, { params: { AmountOfLines, Reversed, takeFromBeginning } });
        return this.generateResponse(response.status, response.data);
    }

    private async isConsoleOutdated(): Promise<AppResponse> {
        if(!this.server) throw new Error("No server selected");
        const response = await this.instance.get(`servers/${this.server}/console/outdated`);
        return this.generateResponse(response.status, response.data);
    }

}