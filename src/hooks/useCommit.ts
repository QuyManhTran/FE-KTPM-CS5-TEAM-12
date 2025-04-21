import { getCommitsByReleaseId } from "@/services";
import { Commit } from "@/types/commit";
import { Metadata } from "@/types/pagination";
import { useCallback, useEffect, useState } from "react";

const useCommit = () => {
    const [meta, setMeta] = useState<Metadata | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [data, setData] = useState<Commit[]>([]);
    const [releaseId, setReleaseId] = useState<number>(0);

    const fetchRepositories = useCallback(async () => {
        try {
            setLoading(true);
            const { data } = await getCommitsByReleaseId(
                releaseId,
                currentPage
            );
            if (data.status === "success" && data.data) {
                setMeta(data.data?.meta);
                setData(data.data.data);
            }
        } catch (error) {
            console.error("Error fetching repositories:", error);
        } finally {
            setLoading(false);
        }
    }, [currentPage, releaseId]);

    useEffect(() => {
        if (releaseId) {
            fetchRepositories();
        }
    }, [releaseId, currentPage, fetchRepositories]);

    return { loading, meta, data, currentPage, setCurrentPage, setReleaseId };
};

export default useCommit;
