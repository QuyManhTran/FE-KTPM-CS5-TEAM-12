import { Metadata } from "./pagination";

export interface Commit {
    id: number;
    hash: string;
    message: string;
    releaseID: number;
}

export interface CommitResponse {
    data: Commit[];
    meta: Metadata;
}
