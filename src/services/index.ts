import request from "@/config/axios";
import { CommitResponse } from "@/types/commit";
import { ReleaseResponse } from "@/types/release";
import { RepositoryResponse } from "@/types/repo";
import { BaseResponse } from "@/types/response";

export const getRepositories = async (
    page: number = 1,
    limit: number = 100
) => {
    return request.get<BaseResponse<RepositoryResponse>>("/repos", {
        params: {
            page,
            limit,
        },
    });
};

export const getReleasesByRepoId = async (
    repoId: number,
    page: number = 1,
    limit: number = 100
) => {
    return request.get<BaseResponse<ReleaseResponse>>(
        `/repos/${repoId}/releases`,
        {
            params: {
                page,
                limit,
            },
        }
    );
};

export const getCommitsByReleaseId = async (
    releaseId: number,
    page: number = 1,
    limit: number = 100
) => {
    return request.get<BaseResponse<CommitResponse>>(
        `/releases/${releaseId}/commits`,
        {
            params: {
                page,
                limit,
            },
        }
    );
};
