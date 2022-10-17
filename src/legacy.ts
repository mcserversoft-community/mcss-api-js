import axios, { AxiosResponse } from 'axios'
import { Agent } from 'https'

enum getServersFilter { None = 0, Minimal = 1, Status = 2 }
enum getServerCountFilter { None = 0, Online = 1, Offline = 2, ByServerType = 3 }
enum executeServerActionFilter { InvalidOrEmpty = 0, Stop = 1, Start = 2, Kill = 3, Restart = 4 }
enum getTaskListFilter { None = 0, FixedTime = 1, Interval = 2, Timeless = 3 }

interface AppResponse {
    status: number,
    data?: any,
    error?: {
        message: string,
    } 
}

const instance = axios.create({
    httpsAgent: new Agent({ rejectUnauthorized: false}),
    validateStatus: () => true
});

export default class MCSS {
    ip: string;
    port: number|string;
    apiKey: string;
    headers: { headers: { ApiKey: string } }


    constructor(ip: string, port: string|number, apiKey: string) {
        this.ip = ip
        this.port = port
        this.apiKey = apiKey
        this.headers = { headers: { ApiKey: this.apiKey } }
    }

    private generateResponse(code: number, data?: any): AppResponse {
        switch(code) {
            case 200:
                return { status: 200, data };
            case 401:
                return { status: 401, error: { message: 'Incorrect API key' } }
            case 404:
                return { status: 404, error: { message: 'Server not found' } }
            default: 
                return { status: code, error: { message: 'An unexpected error occured' } }
        }
    }

    public async getServers( filter?: getServersFilter): Promise<AppResponse> {
        let response: AxiosResponse<any, any>
        const url = `https://${this.ip}:${this.port}/api/v1/servers`

        if (filter) response = await instance.get(url, { params: { filter }, headers: { ApiKey: this.apiKey } })
        else response = await instance.get(url, this.headers)
        return this.generateResponse(response.status, response.data!)
        // if( response.status === 200 ) return { status: response.status, data: response.data }
        // if( response.status === 401 ) return { status: response.status, error: { message: 'Incorrect Apikey' } }
        // return { status: response.status, error: { message: 'A unexpected error occured' } }
    }

    public async getServerCount( filter?: getServerCountFilter): Promise<AppResponse> {
        let response: AxiosResponse<any, any>
        const url = `https://${this.ip}:${this.port}/api/v1/servers/count`

        if (filter) response = await instance.get(url, { params: { filter }, headers: this.headers.headers })
        else response = await instance.get(url, this.headers)
        if(response.status === 200) return { status: response.status, data: response.data }
        if(response.status === 401) return { status: response.status, error: { message: 'Incorrect Apikey' } }
        return { status: response.status, error: { message: 'A unexpected error occured' } }
    }

    public async getServerDetails( serverGuid: string, filter?: getServersFilter ): Promise<AppResponse> {
        let response: AxiosResponse<any, any>
        const url = `https://${this.ip}:${this.port}/api/v1/servers/${serverGuid}`

        if(filter) response = await instance.get(url, { params: { filter }, headers: this.headers.headers })
        else response = await instance.get(url, this.headers)

        if(response.status === 200) return { status: response.status, data: response.data }
        if(response.status === 401) return { status: response.status, error: { message: 'Incorrect Apikey' } }
        if(response.status === 404) return { status: response.status, error: { message: 'Server not found' } }
        return { status: response.status, error: { message: 'A unexpected error occured' } }
    }

    public async getServerStats( serverGuid: string ): Promise<AppResponse> {
        let response: AxiosResponse<any, any>
        const url = `https://${this.ip}:${this.port}/api/v1/servers/${serverGuid}/stats`

        response = await instance.get(url, this.headers)
        if(response.status === 200) return { status: response.status, data: response.data }
        if(response.status === 401) return { status: response.status, error: { message: 'Incorrect Apikey' } }
        if(response.status === 404) return { status: response.status, error: { message: 'Server not found' } }
        return { status: response.status, error: { message: 'A unexpected error occured' } }
    }

    public async getServerIcon( serverGuid: string ): Promise<AppResponse> {
        let response: AxiosResponse<any, any>
        const url = `https://${this.ip}:${this.port}/api/v1/servers/${serverGuid}/icon`

        response = await instance.get(url, this.headers)
        if(response.status === 200) return { status: response.status, data: response.data }
        if(response.status === 401) return { status: response.status, error: { message: 'Incorrect Apikey' } }
        if(response.status === 404) return { status: response.status, error: { message: 'Server not found' } }
        return { status: response.status, error: { message: 'A unexpected error occured' } }
    }

    public async executeServerAction( serverGuid: string, action: executeServerActionFilter ): Promise<AppResponse> {
        let response: AxiosResponse<any, any>
        const url = `https://${this.ip}:${this.port}/api/v1/servers/${serverGuid}/execute/action`

        response = await instance.post(url, { action }, this.headers)
        if(response.status === 200) return { status: response.status, data: response.data }
        if(response.status === 401) return { status: response.status, error: { message: 'Incorrect Apikey' } }
        if(response.status === 404) return { status: response.status, error: { message: 'Server not found' } }
        return { status: response.status, error: { message: 'A unexpected error occured' } }
    }

    public async executeServerCommand( serverGuid: string, command: string ): Promise<AppResponse> {
        let response: AxiosResponse<any, any>
        const url = `https://${this.ip}:${this.port}/api/v1/servers/${serverGuid}/execute/command`

        response = await instance.post(url, { command }, this.headers)
        if(response.status === 200) return { status: response.status, data: response.data }
        if(response.status === 401) return { status: response.status, error: { message: 'Incorrect Apikey' } }
        if(response.status === 404) return { status: response.status, error: { message: 'Server not found' } }
        return { status: response.status, error: { message: 'A unexpected error occured' } }
    }

    public async executeServerCommands( serverGuid: string, commands: string[] ): Promise<AppResponse> {
        let response: AxiosResponse<any, any>
        const url = `https://${this.ip}:${this.port}/api/v1/servers/${serverGuid}/execute/commands`

        response = await instance.post(url, { commands }, this.headers)
        if(response.status === 200) return { status: response.status, data: response.data }
        if(response.status === 401) return { status: response.status, error: { message: 'Incorrect Apikey' } }
        if(response.status === 404) return { status: response.status, error: { message: 'Server not found' } }
        return { status: response.status, error: { message: 'A unexpected error occured' } }
    }

    // public async getServerConsole( serverGuid: string ):Promise<{status:number, data?:any, error?:{message:string}}> {
    //     let response: AxiosResponse<any, any>
    //     const url = `https://${this.ip}:${this.port}/api/v1/servers/${serverGuid}/console`

    //     response = await instance.get(url, this.headers)
    //     if(response.status === 200) return { status: response.status, data: response.data }
    //     if(response.status === 401) return { status: response.status, error: { message: 'Incorrect Apikey' } }
    //     if(response.status === 404) return { status: response.status, error: { message: 'Server not found' } }
    //     return { status: response.status, error: { message: 'A unexpected error occured' } }
    // }

    // public async isConsoleOutdated( serverGuid: string ): Promise<boolean> {

    // }

    // public async getSchedulerDetails( serverGuid: string ):Promise<{status:number, data?:any, error?:{message:string}}> {
    //     let response: AxiosResponse<any, any>
    //     const url = `https://${this.ip}:${this.port}/api/v1/servers/${serverGuid}/scheduler`

    //     response = await instance.get(url, this.headers)
    //     if(response.status === 200) return { status: response.status, data: response.data }
    //     if(response.status === 401) return { status: response.status, error: { message: 'Incorrect Apikey' } }
    //     if(response.status === 404) return { status: response.status, error: { message: 'Server not found' } }
    //     return { status: response.status, error: { message: 'A unexpected error occured' } }
    // }

    // public async getSchedulerTaskList( serverGuid: string, filter?:getTaskListFilter ):Promise<{status:number, data?:any, error?:{message:string}}>{
    //     let response: AxiosResponse<any, any>
    //     const url = `https://${this.ip}:${this.port}/api/v1/servers/${serverGuid}/scheduler/tasks`

    //     if(filter) response = await instance.get(url, { ...this.headers, params: filter })
    //     else response = await instance.get(url, this.headers)
    //     if(response.status === 200) return { status: response.status, data: response.data }
    //     if(response.status === 401) return { status: response.status, error: { message: 'Incorrect Apikey' } }
    //     if(response.status === 404) return { status: response.status, error: { message: 'Server not found' } }
    //     return { status: response.status, error: { message: 'A unexpected error occured' } }
    // }

    // public async createTask()


}

// DtY6HWI2csbnQ3JjeXaBtT5eudKVGDQxHzCPJ1aOznzo70OwgiRsXXv0VaDZQoUmGwyPPjbN5OFKPwainjKgU7xsSH9rfuKsFHo5u6SSqegwARHQzQQIygDp
const mcss = new MCSS('192.168.0.24', 25560, 'rWx2ReZYc2tA2ShzIVcYqSl2XS7PvrLOwg36IGlOJNkO2HuQZE9J0sXn48C16PNDROuVqWYUMrrJ4TmLualtxVeBLxPfwAjxUPGxohASNwOKR2cgMC464Z8x')

async function tester() {
    let count = await mcss.getServerCount()
    let servers = await mcss.getServers()
    console.log( `Server count: `, count.data.count )
    console.log( `Servers: `, servers.data )
}

tester()

