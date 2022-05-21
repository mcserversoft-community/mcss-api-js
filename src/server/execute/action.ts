import axios from 'axios';
import { Agent } from 'https';
import type { McssServerActionRequest } from '../../types';

const instance = axios.create({httpsAgent: new Agent({rejectUnauthorized: false})});

export async function doServerAction(data: McssServerActionRequest):Promise<boolean> {
    const { mcss, guid, action } = data;
    const { ip, port, token } = mcss;
    if(!mcss || !guid || !action || !ip || !port || !token) return false;
    const params = new URLSearchParams({ Guid: guid, Action: JSON.stringify(action) });
    const headers = { Authorization: `Bearer ${token}` };
    const response = await instance.post(`https://${ip}:${port}/api/server/execute/action`, params, { headers });
    if(response.status === 200) return true
    return false
}

export default doServerAction;