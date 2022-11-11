

export class ServerEditor {
    name: string
    description: string
    autoStartWithMcss: boolean
    forceSaveOnStop: boolean
    allocatedMemoryInMegabytes: number
    constructor() {
        this.name
        this.description
        this.autoStartWithMcss
        this.forceSaveOnStop
        this.allocatedMemoryInMegabytes
    }
    setName(name: string) {
        this.name = name
        return this
    }
    setDescription(description: string) {
        this.description = description
        return this
    }
    setAutoStartWithMcss(condition: boolean) {
        this.autoStartWithMcss = condition
        return this
    }
    setForceSaveOnStop(condition: boolean) {
        this.forceSaveOnStop = condition
        return this
    }
    setAllocatedMemoryInMegabytes(amount: number) {
        this.allocatedMemoryInMegabytes = amount
        return this
    }
}

export default ServerEditor