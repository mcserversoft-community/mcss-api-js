import axios from 'axios';
import { Agent } from 'https';
import type { McssServerActionRequest, Response } from 'types';

const instance = axios.create({httpsAgent: new Agent({rejectUnauthorized: false})});

export async function doServerAction(data: McssServerActionRequest):Promise<Response> {
    const { mcss, guid, action } = data;
    const { ip, port, token } = mcss;
    if(!mcss || !guid || !action || !ip || !port || !token) return { success: false, status: 400, data: { error: 'Missing parameters' }};
    const params = new URLSearchParams({ Guid: guid, Action: JSON.stringify(action) });
    const headers = { Authorization: `Bearer ${token}` };
    const response = await instance.post(`https://${ip}:${port}/api/server/execute/action`, params, { headers });
    if(response.status === 200) return { success: true, status: 200, data: response.data };
    return { success: false, status: 500, data: { error: 'Unknown error' }};
}

export default doServerAction;