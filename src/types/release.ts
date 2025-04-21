import { Metadata } from "./pagination";

export interface Release {
    id: number;
    content: string;
    tag: string;
    repoId: number;
}

export interface ReleaseResponse {
    data: Release[];
    meta: Metadata;
}
