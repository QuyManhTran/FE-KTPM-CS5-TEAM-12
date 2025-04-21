import { Metadata } from "./pagination";

export interface Repository {
    id: number;
    user: string;
    name: string;
    star: number;
}

export interface RepositoryResponse {
    data: Repository[];
    meta: Metadata;
}
