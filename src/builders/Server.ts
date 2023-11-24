
/**
 * @enum GB
 * @description Enum for the amount of memory to allocate to the server
 */
export enum GB { 
    ONE = 1024,
    TWO = 2048,
    THREE = 3072,
    FOUR = 4096,
    FIVE = 5120
}

/**
 * @enum KeepOnline
 * @description Enum for the keep online setting
 */
export enum KeepOnline {
    None = 0,
    Elevated = 1,
    Agressive = 2
}

export default class Server {
    name: string;
    description: string;
    isSetToAutoStart: boolean;
    forceSaveOnStop: boolean;
    javaAllocatedMemory: number;
    keepOnline: number | KeepOnline;

    /**
     * @param {string} name - The name of the server
     * @param {string} description - The description of the server
     * @param {boolean} isSetToAutoStart - The auto start setting
     * @param {boolean} forceSaveOnStop - The force save on stop setting
     * @param {number|GB} javaAllocatedMemory - The amount of memory to allocate to the server
     * @param {number|KeepOnline} keepOnline - The keep online setting
     */
    constructor(name: string, description: string, isSetToAutoStart: boolean = false, forceSaveOnStop: boolean = false, javaAllocatedMemory: number|GB, keepOnline: number|KeepOnline = KeepOnline.None) {
        this.name = name;
        this.description = description;
        this.isSetToAutoStart = isSetToAutoStart;
        this.forceSaveOnStop = forceSaveOnStop;
        this.javaAllocatedMemory = javaAllocatedMemory;
    }

    /**
     * @description Get the name
     * @returns {string}
     */
    public getName(): string { return this.name; }

    /**
     * @description Get the description
     * @returns {string}
     */
    public getDescription(): string { return this.description; }

    /**
     * @description Get the auto start setting
     * @returns {boolean}
     */
    public getIsSetToAutoStart(): boolean { return this.isSetToAutoStart; }

    /**
     * @description Get the force save on stop setting
     * @returns {boolean}
     */
    public getForceSaveOnStop(): boolean { return this.forceSaveOnStop; }

    /**
     * @description Get the amount of memory allocated to the server
     * @returns {number}
     */
    public getJavaAllocatedMemory(): number { return this.javaAllocatedMemory; }

    /**
     * @description Get the keep online setting
     * @returns {number|KeepOnline}
     */
    public getKeepOnline(): object|KeepOnline { return this.keepOnline; }

    /**
     * @description Set the name
     * @param {string} name - The name
     */
    public setName(name: string): Server { this.name = name; return this; }

    /**
     * @description Set the description
     * @param {string} description - The description
     */
    public setDescription(description: string): Server { this.description = description; return this; }

    /**
     * @description Set the auto start setting
     * @param {boolean} isSetToAutoStart - The auto start setting
     */
    public setAutoStart(isSetToAutoStart: boolean): Server { this.isSetToAutoStart = isSetToAutoStart; return this; }

    /**
     * @description Set the force save on stop setting
     * @param {boolean} forceSaveOnStop - The force save on stop setting
     */
    public setForceSaveOnStop(forceSaveOnStop: boolean): Server { this.forceSaveOnStop = forceSaveOnStop; return this; }

    /**
     * @description Set the amount of memory allocated to the server
     * @param {number|GB} javaAllocatedMemory - The amount of memory allocated to the server
     */
    public setAllocatedMemory(javaAllocatedMemory: number|GB): Server { this.javaAllocatedMemory = javaAllocatedMemory; return this; }

    /**
     * @description Set the keep online setting
     * @param {number|KeepOnline} keepOnline - The keep online setting
     */
    public setKeepOnline(keepOnline: number|KeepOnline): Server { this.keepOnline = keepOnline; return this; }

    /**
     * @description Convert the object to JSON
     * @returns {object}
     */
    public toJSON(): object {
        return {
            name: this.name,
            description: this.description,
            isSetToAutoStart: this.isSetToAutoStart,
            forceSaveOnStop: this.forceSaveOnStop,
            javaAllocatedMemory: this.javaAllocatedMemory,
            keepOnline: this.keepOnline
        }
    }

    /**
     * @description Convert the object to a string
     * @returns {string}
     */
    public static fromJSON(json: any): Server {
        return new Server(json.name, json.description, json.isSetToAutoStart, json.forceSaveOnStop, json.javaAllocatedMemory, json.keepOnline);
    }

}