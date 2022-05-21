export interface McssTokenResponse {
    access_token: string;
    token_type: string;
    expires_in: number;
    userName: string;
  }

export interface McssVersionResponse {
    IsDevBuild: boolean,
    McssVersion: string,
    McssApiVersion: string,
    UniqueIdentifier: string,
    YouAreAwesome: boolean
}

export interface McssStatisticsResponse {
    Cpu: number;
    MemoryUsed: number;
    MemoryLimit: number;
    PlayersOnline: number;
    PlayerLimit: number;
    StartDate: number;
  }
  
  export interface McssServerResponse {
    Guid: string;
    Status: number;
    Name: string;
    Description: string;
    PathToFolder: string;
    FolderName: string;
    CreationDate: string;
    IsSetToAutoStart: boolean;
    KeepOnline: number;
    JavaAllocatedMemory: number;
    JavaStartupLine: string;
    Statistic: McssStatisticsResponse;
  }