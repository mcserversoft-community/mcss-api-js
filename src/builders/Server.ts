
export enum GB { 
    ONE = 1024,
    TWO = 2048,
    THREE = 3072,
    FOUR = 4096,
    FIVE = 5120
}


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
    constructor(name: string, description: string, isSetToAutoStart: boolean = false, forceSaveOnStop: boolean = false, javaAllocatedMemory: number|GB, keepOnline: number|KeepOnline = KeepOnline.None) {
        this.name = name;
        this.description = description;
        this.isSetToAutoStart = isSetToAutoStart;
        this.forceSaveOnStop = forceSaveOnStop;
        this.javaAllocatedMemory = javaAllocatedMemory;
    }

    public getName(): string { return this.name; }
    public getDescription(): string { return this.description; }
    public getIsSetToAutoStart(): boolean { return this.isSetToAutoStart; }
    public getForceSaveOnStop(): boolean { return this.forceSaveOnStop; }
    public getJavaAllocatedMemory(): number { return this.javaAllocatedMemory; }
    public getKeepOnline(): object|KeepOnline { return this.keepOnline; }

    public setName(name: string): Server { this.name = name; return this; }
    public setDescription(description: string): Server { this.description = description; return this; }
    public setAutoStart(isSetToAutoStart: boolean): Server { this.isSetToAutoStart = isSetToAutoStart; return this; }
    public setForceSaveOnStop(forceSaveOnStop: boolean): Server { this.forceSaveOnStop = forceSaveOnStop; return this; }
    public setAllocatedMemory(javaAllocatedMemory: number|GB): Server { this.javaAllocatedMemory = javaAllocatedMemory; return this; }
    public setKeepOnline(keepOnline: number|KeepOnline): Server { this.keepOnline = keepOnline; return this; }

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

    public static fromJSON(json: any): Server {
        return new Server(json.name, json.description, json.isSetToAutoStart, json.forceSaveOnStop, json.javaAllocatedMemory, json.keepOnline);
    }

}