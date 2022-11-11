import axios, { AxiosInstance } from 'axios'
import { Agent } from 'https'
import Server from './Server'
import type { Server as ServerType } from './types'

type AppResponse = {
    status: number
    data?: any
    error?: {
        message: string
    } 
}

enum getServerCountFilter { None = 0, Online = 1, Offline = 2, ByServerType = 3 }
enum getServersFilter { None = 0, Minimal = 1, Status = 2 }


export class MCSS {
    private ip: string
    private port: number|string
    private instance: AxiosInstance
    protected servers: Server[]
    private url: string
    constructor(ip: string, port: string|number, apiKey: string, https: boolean = true) {

        if(!ip || !port || !apiKey) throw new Error('Must Provide a valid Info')

        
        this.ip = ip
        this.port = port
        this.url = https ? `https://${this.ip}:${this.port}/api/v1/` : `http://${this.ip}:${this.port}/api/v1/`
        this.instance = axios.create({
            httpsAgent: new Agent({ rejectUnauthorized: false }),
            validateStatus: () => true,
            headers: {
                apiKey
            }
        })
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
        }
    }

    public async saveServers(): Promise<MCSS> {
        const hostServers =await this.getServers()
        if(hostServers.status !== 200) throw new Error('Failed to get servers')
        this.servers = hostServers.data.map((server: ServerType) => new Server(this, server))
        return this
    }

    public async startServers() {
        this.servers.forEach(async server => {
            const start = await server.executePowerAction('start')
        })
    }


    public async getServers( filter?: getServersFilter ): Promise<AppResponse> {
            const { data, status } = await this.instance.get(`${this.url}servers?filter=${filter ||0}`)
            return this.generateResponse(status, data)
    }
    
    public async getServerCount(filter?: getServerCountFilter): Promise<AppResponse> {
        const { data, status } = await this.instance.get(`${this.url}server/count?filter=${filter || 0}`)
        return this.generateResponse(status, data)
    }

    public getInstance(): AxiosInstance {
        return this.instance
    }

    public getUrl(): string {
        return this.url
    }
}

export default MCSS