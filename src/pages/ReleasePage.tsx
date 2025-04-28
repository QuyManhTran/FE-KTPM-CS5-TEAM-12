import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useRelease from "@/hooks/useRelease";
import { Release } from "@/types/release";

const ReleasePage = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const { currentPage, meta, data, loading, setCurrentPage, setRepoId } =
        useRelease();

    const onNavigateToCommits = (release: Release) => {
        navigate(
            `/repositories/${state.repo.user}/${state.repo.name}/${release.tag}/commits`,
            {
                state: {
                    repo: state.repo,
                    release: release,
                },
            }
        );
    };

    const pages = useMemo(() => {
        if (meta && meta.totalPage <= 5)
            return Array.from({ length: meta.totalPage }, (_, i) => i + 1);
        if (meta && meta.totalPage > 5) {
            const pages = [];
            const startPage = Math.min(
                meta.totalPage - 4,
                Math.max(1, currentPage - 2)
            );
            const endPage = Math.max(
                5,
                Math.min(meta.totalPage, currentPage + 2)
            );
            for (let i = startPage; i <= endPage; i++) {
                pages.push(i);
            }
            return pages;
        }
        return [];
    }, [currentPage, meta]);

    useEffect(() => {
        if (state && state.repo) {
            setRepoId(state.repo.id);
        }
    }, [setRepoId, state]);

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-row items-center justify-between">
                <div className="flex-1">
                    <h2 className="text-[40px] font-extralight">Releases</h2>
                </div>
                {data.length > 0 && !loading && (
                    <div>
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem
                                    className={`${
                                        currentPage === 1
                                            ? "pointer-events-none"
                                            : ""
                                    }`}
                                    onClick={() => {
                                        if (currentPage > 1) {
                                            setCurrentPage(currentPage - 1);
                                        }
                                    }}
                                >
                                    <PaginationPrevious />
                                </PaginationItem>
                                {pages.map((page) => (
                                    <PaginationItem
                                        key={page}
                                        onClick={() => setCurrentPage(page)}
                                    >
                                        <PaginationLink
                                            isActive={currentPage === page}
                                        >
                                            {page}
                                        </PaginationLink>
                                    </PaginationItem>
                                ))}
                                <PaginationItem
                                    className={`${
                                        currentPage === meta?.totalPage
                                            ? "pointer-events-none"
                                            : ""
                                    }`}
                                    onClick={() => {
                                        if (
                                            meta?.totalPage &&
                                            currentPage < meta?.totalPage
                                        ) {
                                            setCurrentPage(currentPage + 1);
                                        }
                                    }}
                                >
                                    <PaginationNext />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                )}
            </div>

            <div className="bg-[#fafafa] px-4 py-4 rounded-2xl">
                <h2 className="text-[24px] font-light">
                    Repo:{" "}
                    <a
                        href={`https://github.com/${state.repo.user}/${state.repo.name}`}
                        target="_blank"
                        className="text-blue-500"
                    >
                        {state.repo.user + "/" + state.repo.name}
                    </a>
                </h2>
                {!data.length && !loading && (
                    <p className="text-center my-6">There isn't any Releases</p>
                )}
            </div>

            <div className="grid grid-cols-2 gap-9 mb-6">
                <div>
                    {data
                        .filter((_, index) => index < data.length / 2)
                        .map((release, index) => (
                            <div
                                className="py-4 px-4 border border-[#ddd] bg-white flex flex-row justify-between cursor-pointer hover:bg-[#f5f5f5]"
                                key={index}
                                onClick={() => onNavigateToCommits(release)}
                            >
                                <span>
                                    {(currentPage - 1) *
                                        (meta?.pageSize as number) +
                                        index +
                                        1 +
                                        ". " +
                                        release.tag}
                                </span>
                            </div>
                        ))}
                </div>
                <div>
                    {data
                        .filter((_, index) => index >= data.length / 2)
                        .map((release, index) => (
                            <div
                                className="py-4 px-4 border border-[#ddd] bg-white flex flex-row justify-between cursor-pointer hover:bg-[#f5f5f5]"
                                key={index}
                                onClick={() => onNavigateToCommits(release)}
                            >
                                <span>
                                    {(currentPage - 1) *
                                        (meta?.pageSize as number) +
                                        Math.ceil(data.length / 2) +
                                        index +
                                        1 +
                                        ". " +
                                        release.tag}
                                </span>
                            </div>
                        ))}
                </div>
            </div>
            {data.length > 0 && !loading && (
                <div className="mb-6">
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem
                                className={`${
                                    currentPage === 1
                                        ? "pointer-events-none"
                                        : ""
                                }`}
                                onClick={() => {
                                    if (currentPage > 1) {
                                        setCurrentPage(currentPage - 1);
                                    }
                                }}
                            >
                                <PaginationPrevious />
                            </PaginationItem>
                            {pages.map((page) => (
                                <PaginationItem
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                >
                                    <PaginationLink
                                        isActive={currentPage === page}
                                    >
                                        {page}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}
                            <PaginationItem
                                className={`${
                                    currentPage === meta?.totalPage
                                        ? "pointer-events-none"
                                        : ""
                                }`}
                                onClick={() => {
                                    if (
                                        meta?.totalPage &&
                                        currentPage < meta?.totalPage
                                    ) {
                                        setCurrentPage(currentPage + 1);
                                    }
                                }}
                            >
                                <PaginationNext />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            )}
        </div>
    );
};

export default ReleasePage;
