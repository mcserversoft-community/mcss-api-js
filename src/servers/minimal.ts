import type { McssParamsToken, Response } from 'types';
import { axiosSetup } from '..';
const instance = axiosSetup();

export default async function getServersMinimal(data: McssParamsToken): Promise<Response> {
    const { ip, port, token } = data;
    const headers = { headers: { Authorization: `Bearer ${token}` } };
    try {
        const response = await instance.get(`https://${ip}:${port}/api/servers/minimal`, headers);
        if (response.status === 200) return { success: true, status: 200, data: response.data };
        if (response.status === 401) return { success: false, status: 401, data: { error: 'Invalid token' } };
        return { success: false, status: 400, data: { error: 'Unknown error' } };
    } catch (error) {
        return { success: false, status: 500, data: { error: error.message } };
    }
}