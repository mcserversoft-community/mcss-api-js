import { McssIconRequest } from "../types";
import { axiosSetup } from "..";
const instance = axiosSetup();

export async function getIcon(data: McssIconRequest):Promise<string|false> {
    const { mcss, guid } = data;
    const { token, ip, port } = mcss;
    if(!mcss || !guid || !token || !ip || !port) return false;
    const headers = { Authorization: `Bearer ${token}` };
    const params = new URLSearchParams({ guid });

    const response = await instance.get(`https://${ip}:${port}/api/server/icon`, { headers, params });
    if (response.status === 200) return response.data;
    return false;
}