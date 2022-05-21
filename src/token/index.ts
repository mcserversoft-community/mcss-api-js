import type { McssParamsPW, Response } from 'types';
import { axiosSetup } from '..';
const instance = axiosSetup();

export default async function getToken(data:McssParamsPW):Promise<Response> {
    const { ip, port, username, password } = data;
    const params = new URLSearchParams({ username, password });

    try {
        const token = await instance.post(`https://${ip}:${port}/api/token`, params);
        if (token.status === 200) return { success: true, status: 200, data: token.data };
        if(token.status === 401) return { success: false, status: 401, data: { error: 'Invalid token' } };
        return { success: false, status: 400, data: { error: 'Unknown error' }};
    } catch (error) {
        return { success: false, status: 500, data: { error: 'Unknown error' }};
    }
}