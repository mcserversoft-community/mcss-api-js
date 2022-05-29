import { axiosSetup } from ".";
const instance = axiosSetup()


export default class MCSS {
    username: string;
    password: string;
    ip: string;
    port: number|string;
    private token: string;


    constructor(username: string, password: string, ip: string, port: string|number){
        this.username = username
        this.password = password
        this.ip = ip
        this.port = port
        this.token = ''
    }

    private async getToken() {
        const params = new URLSearchParams({username: this.username, password: this.password})
        const token = await instance.post(`http://${this.ip}:${this.port}/api/token`, params)
        if(token.status === 200) this.token = token.data.access_token
    }

    public async getVersion() {
        const headers = { headers: { Authorization: `Bearer ${this.token}` } }
        const version = await instance.get(`https://${this.ip}:${this.port}/api/version`, headers)
        if(version.status === 200 && version.data.McssApiVersion >= '0.1.0') return { success: true, code: 200, data: version.data }
        if(version.status === 200 && version.data.McssApiVersion < '0.1.0') return { success: false, code: 406, data: { error: 'Unsupported API version' } }
        if(version.status === 401) //TODO: Add a function that refreshed the token - if that fails, send the error
        return false
    }

    public async getServers() {
        
    }
}