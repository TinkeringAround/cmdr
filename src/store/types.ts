export enum Route {
  OVERVIEW = 'OVERVIEW',
  EDITOR = 'EDITOR',
  RUNNER = 'RUNNER'
}

export interface Scripts {
  [key: string]: Script;
}

export interface Script {
  data?: string;
  error?: string;
  status: string;
  title?: string;
  exec?: string;
}

export interface ActiveRoute {
  route: Route,
  id: string
}

export interface HasId {
  id: string;
}

export interface ScriptPayload extends Partial<Script>, HasId {
}

export interface Config {
  [key: string]: Script;
}

export interface ConfigPayload {
  status: string
  config: Config
  error?: string
}
