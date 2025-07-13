import { ServerAction } from "../servers";

export default class Task {
    name: string;
    enabled: boolean;
    playerRequirement: number;
    timing: object | null;
    job: object | null;

    /** 
     * @param name
     * @param enabled 
     * @param playerRequirement 
     */
    constructor(name: string, enabled: boolean, playerRequirement: number) {
        this.name = name;
        this.enabled = enabled;
        this.playerRequirement = playerRequirement;
        this.timing = { repeat: false, interval: 0 };
        this.job = { action: ServerAction.InvalidOrEmpty, commands: [] };
    }


    /**
     *   Get the name
     * @returns {string}
     */
    public getName(): string { return this.name; }

    /**
     *   Set the name
     * @param {string} name - The name
     */
    public setName(name: string): void { this.name = name; }

    /**
     *   Get the enabled status
     * @returns {boolean}
     */
    public getEnabled(): boolean { return this.enabled; }

    /**
     *   Set the enabled status
     * @param {boolean} enabled - The enabled status
     */
    public setEnabled(enabled: boolean): Task { this.enabled = enabled; return this; }

    /**
     *   Get the player requirement
     * @returns {number}
     */
    public getPlayerRequirement(): number { return this.playerRequirement; }

    /**
     *   Set the player requirement
     * @param {number} playerRequirement - The player requirement
     */
    public setPlayerRequirement(playerRequirement: number): Task { this.playerRequirement = playerRequirement; return this; }

    /**
     *   Get the timing
     * @returns {object}
     */
    public getTiming(): object | null { return this.timing; }

    /**
     *   Set the timing
     * @param {object|boolean} timing - The timing
     * @param {number} interval - The interval
     */
    public setTiming(timing: object | boolean, interval: number ): Task { 
        if(typeof timing === 'boolean') {
            this.timing = { repeat: timing, interval };
            return this;
        }
        this.timing = timing;
        return this;
    }

    /**
     *   Get the job
     * @returns {object}
     */
    public getJob(): object | null { return this.job; }

    /**
     *   Set the job
     * @param {object|ServerAction|string[]} action - The job
     */
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

    /**
     *   Convert the task to JSON
     * @returns {object}
     */
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