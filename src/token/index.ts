import type { McssParamsPW, McssTokenResponse } from '../types';
import { axiosSetup } from '..';
const instance = axiosSetup();

export default async function getToken(data:McssParamsPW):Promise<McssTokenResponse|'invalid'|false> {
    const { ip, port, username, password } = data;
    const params = new URLSearchParams({ username, password });

    try {
        const token = await instance.post(`https://${ip}:${port}/api/token`, params);
        if (token.status === 200) return token.data
        if(token.status === 401) return 'invalid';
        return false;
    } catch (error) {
        return false;
    }
}