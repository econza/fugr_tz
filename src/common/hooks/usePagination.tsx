import { useState, useMemo } from "react";

export interface PaginationParams {
    tableSize: number,
    count: number,
}

export const usePagination = ({
    tableSize,
    count,
}: PaginationParams) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(count);
    const totalPages = useMemo(() => Math.ceil(tableSize / count), [tableSize, count]);

    const setPage = (page: number) => {
        if (page < 1 || page > totalPages) {
            return null
        }

        setCurrentPage(page)
        setCurrentIndex((page - 1) * count)
        setEndIndex(page * count)
    }

    return {
        totalPages,
        currentPage,
        currentIndex,
        endIndex,
        setPage,
    }
}
