export interface Repository {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  owner?: { avatar_url: string };
}

export enum FetchState {
  DEFAULT = " DEFAULT",
  LOADING = "LOADING",
  SUCCESS = "SUCESS",
  ERROR = "ERROR",
}
