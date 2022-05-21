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

export interface Response {
  success: boolean;
  status: 200 | 400 | 401 | 500;
  data: any;
}


export * from './responses';
export * from './requests';