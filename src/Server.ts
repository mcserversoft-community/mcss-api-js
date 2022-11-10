import ServerEditor from "./ServerEditor";
import MCSS from "./MCSS";

export default class Server extends MCSS {
    private client: MCSS;
    previous: any;
    server: any;
    
    public async get(id: string) {
        let response = await this.instance.get(this.url + id);
        this.server = id;
        return this.generateResponse(response.status, response.data);
    }
    public async getStats(id: string) {
        let response = await this.instance.get(this.url + id + "/stats");
        return this.generateResponse(response.status, response.data);
    }
    public async getIcon(id: string) {
        let response = await this.instance.get(this.url + id + "/icon");
        return this.generateResponse(response.status, response.data);
    }
    public async edit(id: string, server: ServerEditor) {
        let response = await this.instance.put(this.url + id, server);
        return this.generateResponse(response.status, response.data);
    }
    public async execute(id: string, ...action: any): Promise<void> {
        if(action.length == 1) {
            switch(action[0]) {
                case 0:
                    await this.instance.post(this.url + id + "/execute/action", { action: 0 });
                    break;
                case 1:
                    await this.instance.post(this.url + id + "/execute/action", { action: 1 });
                    break;
                case 2:
                    await this.instance.post(this.url + id + "/execute/action", { action: 2 });
                    break;
                case 3:
                    await this.instance.post(this.url + id + "/execute/action", { action: 3 });
                    break;
                case 4:
                    await this.instance.post(this.url + id + "/execute/action", { action: 4 });
                    break;
                default: 
                    await this.instance.post(this.url + id + "/execute/command", { command: action[0] });
                    break;
            }
        } else {
            await this.instance.post(this.url + id + "/execute/commands", { commands: action });
        }
    }
}