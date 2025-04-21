import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import useCommit from "@/hooks/useCommit";
import newTab from "@/assets/icons8-new-tab.svg";
const CommitPage = () => {
    const { state } = useLocation();
    const { currentPage, meta, data, loading, setCurrentPage, setReleaseId } =
        useCommit();
    const [isOpen, setIsOpen] = useState<boolean>(false);
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
        if (state && state.release) {
            setReleaseId(state.release.id);
        }
    }, [setReleaseId, state]);

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-row items-center justify-between">
                <div className="flex-1">
                    <h2 className="text-[40px] font-extralight">Commits</h2>
                </div>
                {data.length > 0 && (
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
                <h2 className="text-[24px] font-light">
                    Tags:{" "}
                    <a
                        href={`https://github.com/${state.repo.user}/${state.repo.name}/releases/tag/${state.release.tag}`}
                        target="_blank"
                        className="text-blue-500"
                    >
                        {state.release.tag}
                    </a>
                </h2>
                <p className={isOpen ? "" : "line-clamp-3"}>
                    Content: {state.release.content}
                </p>
                <span
                    className="text-red-400 cursor-pointer"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? "See less" : "See more"}
                </span>
            </div>
            <div className="grid grid-cols-2 gap-9 mb-6">
                <div>
                    {data
                        .filter((_, index) => index < data.length / 2)
                        .map((commit, index) => (
                            <div
                                className="py-4 px-4 border border-[#ddd] bg-white flex flex-col hover:bg-[#f5f5f5]"
                                key={index}
                            >
                                <div className="flex flex-1 justify-between items-center">
                                    <span>
                                        {(currentPage - 1) *
                                            (meta?.pageSize as number) +
                                            index +
                                            1 +
                                            ". " +
                                            commit.hash}
                                    </span>
                                    <a
                                        href={`https://github.com/${state.repo.user}/${state.repo.name}/commit/${commit.hash}`}
                                        className="text-blue-500 flex items-center gap-2"
                                        target="_blank"
                                    >
                                        View Github{" "}
                                        <img
                                            src={newTab}
                                            className="h-6 w-6 text-blue-500"
                                        ></img>
                                    </a>
                                </div>
                                <p className="line-clamp-1 mt-2">
                                    Message: {commit.message}
                                </p>
                            </div>
                        ))}
                </div>
                <div>
                    {data
                        .filter((_, index) => index >= data.length / 2)
                        .map((commit, index) => (
                            <div
                                className="py-4 px-4 border border-[#ddd] bg-white flex flex-col hover:bg-[#f5f5f5]"
                                key={index}
                            >
                                <div className="flex flex-1 justify-between items-center">
                                    <span>
                                        {" "}
                                        {(currentPage - 1) *
                                            (meta?.pageSize as number) +
                                            Math.ceil(data.length / 2) +
                                            index +
                                            1 +
                                            ". " +
                                            commit.hash}{" "}
                                    </span>
                                    <a
                                        href={`https://github.com/${state.repo.user}/${state.repo.name}/commit/${commit.hash}`}
                                        className="text-blue-500 flex items-center gap-2"
                                        target="_blank"
                                    >
                                        View Github{" "}
                                        <img
                                            src={newTab}
                                            className="h-6 w-6 text-blue-500"
                                        ></img>
                                    </a>
                                </div>
                                <p className="line-clamp-1 mt-2">
                                    Message: {commit.message}
                                </p>
                            </div>
                        ))}
                </div>
            </div>
            {!data.length && !loading && (
                <p className="text-center">There isn't any commits </p>
            )}
            {data.length > 0 && (
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

export default CommitPage;
