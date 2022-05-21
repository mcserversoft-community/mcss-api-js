import axios from 'axios';
import { Agent } from 'https';
import type { McssVersionResponse, McssParamsToken } from '../types';

const instance = axios.create({ httpsAgent: new Agent({ rejectUnauthorized: false }) });

export default async function getMcssVersion(data:McssParamsToken ): Promise<McssVersionResponse|false|'old'|'invalid'> {
    const { ip, port, token } = data;
    const headers = { headers: { Authorization: `Bearer ${token}` } };
    try {
        const version = await instance.get(`https://${ip}:${port}/api/version`, headers);
        if(version.status === 200 && version.data.McssApiVersion >= '0.1.0') return version.data;
        if(version.status === 200 && version.data.McssApiVersion < '0.1.0') return 'old';
        if(version.status === 401) return 'invalid';
        return false
    } catch (error) {
        return false;
    }
}