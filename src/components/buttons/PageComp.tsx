import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationComponentProps {
    currentPage: number;
    totalPageCount: number;
    onPageChange: (page: number) => void;
}

export default function PageComp({
    currentPage,
    totalPageCount,
    onPageChange,
}: PaginationComponentProps) {
    const handlePageClick = (page: number) => (e: React.MouseEvent) => {
        e.preventDefault();
        if (page >= 1 && page <= totalPageCount) {
            onPageChange(page);
        }
    };

    return (
        <Pagination className="w-fit">
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        href="#"
                        onClick={handlePageClick(currentPage - 1)}
                        aria-disabled={currentPage === 1}
                        tabIndex={currentPage === 1 ? -1 : 0}
                        className={currentPage === 1 ? 'opacity-50 pointer-events-none' : ''}
                    />
                </PaginationItem>

                <PaginationItem>
                    <PaginationLink href="#" onClick={handlePageClick(1)} >
                        1
                    </PaginationLink>
                </PaginationItem>

                {totalPageCount > 3 && currentPage > 3 && (
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                )}

                {(function renderPageNumbers() {
                    let items = [];
                    // Render pages from currentPage-1 to currentPage+1, within bounds
                    for (
                        let i = Math.max(2, currentPage - 1);
                        i <= Math.min(totalPageCount - 1, currentPage + 1);
                        i++
                    ) {
                        items.push(
                            <PaginationItem key={i}>
                                <PaginationLink
                                    href="#"
                                    onClick={handlePageClick(i)}
                                    aria-current={currentPage === i ? "page" : undefined}
                                >
                                    {i}
                                </PaginationLink>
                            </PaginationItem>
                        );
                    }
                    return items;
                })()}

                {totalPageCount > 3 && currentPage < totalPageCount - 2 && (
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                )}

                {totalPageCount > 1 && (
                    <PaginationItem>
                        <PaginationLink
                            href="#"
                            onClick={handlePageClick(totalPageCount)}
                            aria-current={currentPage === totalPageCount ? "page" : undefined}
                        >
                            {totalPageCount}
                        </PaginationLink>
                    </PaginationItem>
                )}

                <PaginationItem>
                    <PaginationNext
                        href="#"
                        onClick={handlePageClick(currentPage + 1)}
                        aria-disabled={currentPage === totalPageCount}
                        tabIndex={currentPage === totalPageCount ? -1 : 0}
                        className={currentPage === totalPageCount ? 'opacity-50 pointer-events-none' : ''}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
