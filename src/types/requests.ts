import { McssParamsToken } from ".";

export interface McssConsoleRequest {
    Mcss: McssParamsToken;
    Guid: string;
    AmountOfLines: number;
    Reversed: boolean;
  }
  
  export interface McssConsoleOutdatedRequest {
    mcss: McssParamsToken;
    guid: string;
    secondLastLine: string;
    lastLine: string;
  }
  
  export interface McssServerRequest {
    mcss: McssParamsToken;
    guid: string;
  }
  
  export interface McssIconRequest {
    mcss: McssParamsToken;
    guid: string;
  }
  
  export interface McssServerActionRequest {
    mcss: McssParamsToken;
    guid: string;
    action: string|number;
  }
  
  export interface McssServerCommandRequest {
    mcss: McssParamsToken;
    guid: string;
    command: string;
  }
  
  export interface McssServerCommandsRequest {
    mcss: McssParamsToken;
    guid: string;
    commands: string[];
  }