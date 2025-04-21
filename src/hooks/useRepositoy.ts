import { getRepositories } from "@/services";
import { Metadata } from "@/types/pagination";
import { Repository } from "@/types/repo";
import { useCallback, useEffect, useState } from "react";

const useRepository = () => {
    const [meta, setMeta] = useState<Metadata | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [data, setData] = useState<Repository[]>([]);

    const fetchRepositories = useCallback(async () => {
        try {
            setLoading(true);
            const { data } = await getRepositories(currentPage);
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
        fetchRepositories();
    }, [currentPage, fetchRepositories]);

    return { loading, meta, data, currentPage, setCurrentPage };
};

export default useRepository;
