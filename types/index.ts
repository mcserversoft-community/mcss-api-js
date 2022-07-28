enum getServersFilter { None = 0, Minimal = 1, Status = 2 }
enum getServerCountFilter { None = 0, Online = 1, Offline = 2, ByServerType = 3 }
enum executeServerActionFilter { InvalidOrEmpty = 0, Stop = 1, Start = 2, Kill = 3, Restart = 4 }

interface mcssServerData {
    guid: string;
    status: number,
    name: string,
    description: string,
    pahtToFolder: string,
    folderName: string,
    creationDate: string,
    isSetToAutoStart: boolean,
    keepOnline: number,
    javaAllocatedMemory: number,
    javaStartupLine: string,
}

export interface getServerCountRequest { filter?: getServerCountFilter }
export interface getServerCountApiResponse { count: number }
export interface getServerCountResponse { status: number, data?: getServerCountApiResponse, error?: { message: string } }

export interface getServersRequest { filter?: getServersFilter }
export interface getServersApiResponse {}
export interface getServersResponse { status: number, data?: getServersApiResponse, error?: { message: string } }

export interface getServerDetailsRequest { serverGuid: string, filter?: getServersFilter }
export interface getServerDetailsApiResponse {}
export interface getServerDetailsResponse { status: number, data?: getServerDetailsApiResponse, error?: { message: string } }
