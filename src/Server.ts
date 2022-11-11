import MCSS from './MCSS'
import { Server as ServerType } from './types'
import { AxiosInstance } from 'axios'

enum executePowerActionFilter { 'stop' = 1, 'start' = 2, 'kill' = 3, 'restart' = 4 }
type PowerActions = 'stop' | 'start' | 'kill' | 'restart'

export class Server  {
    private guid: string
    private status: number
    private name: string
    private description: string
    private pathToFolder: string
    private folderName: string
    private creationDate: string
    private isSetToAutoStart: boolean
    private forceSaveOnStop: boolean
    private keepOnline: number
    private javaAllocatedMemory: number
    private javaStartupLine: string
    private hostUrl: string
    private instance: AxiosInstance

    constructor(host: MCSS, server: ServerType) {
        this.hostUrl = host.getUrl()
        this.instance = host.getInstance()
        this.guid = server.guid
        this.status = server.status
        this.name = server.name
        this.description = server.description
        this.pathToFolder = server.pathToFolder
        this.folderName = server.folderName
        this.creationDate = server.creationDate
        this.isSetToAutoStart = server.isSetToAutoStart
        this.forceSaveOnStop = server.forceSaveOnStop
        this.keepOnline = server.keepOnline
        this.javaAllocatedMemory = server.javaAllocatedMemory
        this.javaStartupLine = server.javaStartupLine
    }
    
    public getGuid(): string {
        return this.guid
    }

    public getStatus(): number {
        return this.status
    }

    public getName(): string {
        return this.name
    }

    public getDescription(): string {
        return this.description
    }

    public getPathToFolder(): string {
        return this.pathToFolder
    }

    public getFolderName(): string {
        return this.folderName
    }

    public getCreationDate(): string {
        return this.creationDate
    }

    public getIsSetToAutoStart(): boolean {
        return this.isSetToAutoStart
    }

    public getForceSaveOnStop(): boolean {
        return this.forceSaveOnStop
    }

    public getKeepOnline(): number {
        return this.keepOnline
    }

    public getJavaAllocatedMemory(): number {
        return this.javaAllocatedMemory
    }

    public getJavaStartupLine(): string {
        return this.javaStartupLine
    }

    // public setForceSaveOnStop(value: boolean): void {
    //     this.forceSaveOnStop = value;
    // }

    // public setKeepOnline(value: number): void {
    //     this.keepOnline = value;
    // }

    // public setJavaAllocatedMemory(value: number): void {
    //     this.javaAllocatedMemory = value;
    // }

    // public setJavaStartupLine(value: string): void {
    //     this.javaStartupLine = value;
    // }

    public async executePowerAction(action: PowerActions): Promise<number> {
        const actionValue = executePowerActionFilter[action]
        const request = await this.instance.post( `${this.hostUrl}servers/${this.guid}/execute/action`, { 'action': actionValue })
        return request.status
    }
}


export default Server