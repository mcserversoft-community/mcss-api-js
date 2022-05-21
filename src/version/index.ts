import type { McssParamsToken, Response } from 'types';
import { axiosSetup } from '..';
const instance = axiosSetup();

export default async function getMcssVersion(data:McssParamsToken ): Promise<Response> {
    const { ip, port, token } = data;
    const headers = { headers: { Authorization: `Bearer ${token}` } };
    try {
        const version = await instance.get(`https://${ip}:${port}/api/version`, headers);
        if(version.status === 200 && version.data.McssApiVersion >= '0.1.0') return { success: true, status: 200, data: version.data };
        if(version.status === 200 && version.data.McssApiVersion < '0.1.0') return {success: false, status: 400, data: { error: 'Unsupported API version' }};
        if(version.status === 401) return { success: false, status: 401, data: { error: 'Invalid token' }};
        return { success: false, status: 400, data: { error: 'Unknown error' }};
    } catch (error) {
        return { success: false, status: 500, data: { error: 'Unknown error' }};
    }
}