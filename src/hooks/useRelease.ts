import { getReleasesByRepoId } from "@/services";
import { Metadata } from "@/types/pagination";
import { Release } from "@/types/release";
import { useCallback, useEffect, useState } from "react";

const useRelease = () => {
    const [meta, setMeta] = useState<Metadata | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [data, setData] = useState<Release[]>([]);
    const [repoId, setRepoId] = useState<number>(0);

    const fetchRepositories = useCallback(async () => {
        try {
            setLoading(true);
            const { data } = await getReleasesByRepoId(currentPage);
            if (data.status === "success" && data.data) {
                setMeta(data.data?.meta);
                setData(data.data.data);
            }
        } catch (error) {
            console.error("Error fetching repositories:", error);
        } finally {
            setLoading(false);
        }
    }, [currentPage]);

    useEffect(() => {
        if (repoId) {
            fetchRepositories();
        }
    }, [repoId, currentPage, fetchRepositories]);

    return { loading, meta, data, currentPage, setCurrentPage, setRepoId };
};

export default useRelease;
