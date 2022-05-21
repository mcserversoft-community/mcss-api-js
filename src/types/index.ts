export interface McssParamsPW {
  ip: string;
  port: number|string;
  username: string;
  password: string;
}

export interface McssParamsToken {
  ip: string;
  port: number|string;
  token: string;
}


export * from './responses';
export * from './requests';