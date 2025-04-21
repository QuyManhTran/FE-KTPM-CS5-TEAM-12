import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import useRepository from "@/hooks/useRepositoy";
import { useMemo } from "react";
import star from "@/assets/star.png";

const ReleasePage = () => {
    const { currentPage, meta, data, setCurrentPage } = useRepository();

    // const onNavigateToRelease

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

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-row items-center justify-between">
                <div className="flex-1">
                    <h2 className="text-[40px] font-extralight">
                        Repositories Ranking
                    </h2>
                </div>
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
            </div>
            <div className="grid grid-cols-2 gap-9">
                <div>
                    {data
                        .filter((_, index) => index < data.length / 2)
                        .map((repo, index) => (
                            <div
                                className="py-4 px-4 border border-[#ddd] bg-white flex flex-row justify-between cursor-pointer hover:bg-[#f5f5f5]"
                                key={index}
                            >
                                <span>
                                    {(currentPage - 1) *
                                        (meta?.pageSize as number) +
                                        index +
                                        1 +
                                        ". " +
                                        repo.user +
                                        "/" +
                                        repo.name}
                                </span>
                                <div className="flex flex-row items-center gap-2">
                                    <img src={star} className="w-6 h-6"></img>
                                    <span>{repo.star}</span>
                                </div>
                            </div>
                        ))}
                </div>
                <div>
                    {data
                        .filter((_, index) => index >= data.length / 2)
                        .map((repo, index) => (
                            <div
                                className="py-4 px-4 border border-[#ddd] bg-white flex flex-row justify-between cursor-pointer hover:bg-[#f5f5f5]"
                                key={index}
                            >
                                <span>
                                    {(currentPage - 1) *
                                        (meta?.pageSize as number) +
                                        Math.floor(data.length / 2) +
                                        index +
                                        1 +
                                        ". " +
                                        repo.user +
                                        "/" +
                                        repo.name}
                                </span>
                                <div className="flex flex-row items-center gap-2">
                                    <img src={star} className="w-6 h-6"></img>
                                    <span>{repo.star}</span>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default ReleasePage;
