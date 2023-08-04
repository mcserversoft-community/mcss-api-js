import { ServerAction } from "../servers";

export default class Task {
    name: string;
    enabled: boolean;
    playerRequirement: number;
    timing: object | null;
    job: object | null;
    constructor(name: string, enabled: boolean, playerRequirement: number) {
        this.name = name;
        this.enabled = enabled;
        this.playerRequirement = playerRequirement;
        this.timing = { repeat: false, interval: 0 };
        this.job = { action: ServerAction.InvalidOrEmpty, commands: [] };
    }

    public getName(): string { return this.name; }
    public setName(name: string): void { this.name = name; }

    public getEnabled(): boolean { return this.enabled; }
    public setEnabled(enabled: boolean): Task { this.enabled = enabled; return this; }

    public getPlayerRequirement(): number { return this.playerRequirement; }
    public setPlayerRequirement(playerRequirement: number): Task { this.playerRequirement = playerRequirement; return this; }

    public getTiming(): object | null { return this.timing; }
    public setTiming(timing: object | boolean, interval: number ): Task { 
        if(typeof timing === 'boolean') {
            this.timing = { repeat: timing, interval };
            return this;
        }
        this.timing = timing;
        return this;
    }


    public getJob(): object | null { return this.job; }
    public addJob(action: object | ServerAction | string[]): Task {
        if(Array.isArray(action)) {
            this.job = { commands: action };
            return this;
        }
        if(typeof action === 'string') {
            this.job = { commands: [action] };
            return this;
        }
        this.job = { action };
        return this;
    }

    public toJSON(): object {
        return {
            name: this.name,
            enabled: this.enabled,
            playerRequirement: this.playerRequirement,
            timing: this.timing,
            job: this.job
        }
    }

}