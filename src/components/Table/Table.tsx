import React, { useState, memo, useMemo } from 'react';
import { useForm } from "react-hook-form";

import { TableProps, RowData } from '../../common/types';

import classnames from 'classnames';
import styles from './Table.module.css';
import { usePagination } from '../../common/hooks';

type Inputs = Omit<RowData, "ascription" | "address">

const PAGINATION_COUNT: number = 20;

export const Table: React.FC<TableProps> = memo(({
    items,
    handleRowClick,
    selectedId,
    handleAddItem,
    handleSortItems
}) => {
    const { totalPages, currentPage, currentIndex, endIndex, setPage } = usePagination({ tableSize: items.length, count: PAGINATION_COUNT })
    const { register, handleSubmit, formState: { errors, touchedFields } } = useForm<Inputs>();
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const [isAsc, setIsAsc] = useState<boolean>(true);
    const direction = useMemo(() => isAsc ? "asc" : "desc", [isAsc])
    const paginatedItems = useMemo(() => items.slice(currentIndex, endIndex), [items, currentIndex, endIndex])

    const handleFormSubmit = (formValues: Inputs) => {
        handleAddItem(formValues)
        setPage(totalPages)
    }

    const handleSelect = (field: string) => {
        handleSortItems(field, direction)
        setIsAsc(!isAsc)
    }

    return (
        <div>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <table>
                    <thead>
                        <tr>
                            <th className={styles.headerCell} onClick={() => handleSelect("id")}>id</th>
                            <th className={styles.headerCell} onClick={() => handleSelect("firstName")}>firstName</th>
                            <th className={styles.headerCell} onClick={() => handleSelect("lastName")}>lastName</th>
                            <th className={styles.headerCell} onClick={() => handleSelect("email")}>email</th>
                            <th className={styles.headerCell} onClick={() => handleSelect("phone")}>phone</th>
                        </tr>
                    </thead>

                    <tbody>
                        {paginatedItems.map((row) => (
                            <tr className={classnames(styles.tableRow, { [styles.selected]: row.id === selectedId })} key={row.id} onClick={() => handleRowClick(row)}>
                                <td>{row.id}</td>
                                <td>{row.firstName}</td>
                                <td>{row.lastName}</td>
                                <td>{row.email}</td>
                                <td>{row.phone}</td>
                            </tr>
                        ))}

                        {isExpanded && <tr>
                            <td>
                                <input placeholder="id" {...register("id", { required: true })} />
                                {touchedFields.id && errors.id?.type === 'required' && <div>обязательное поле</div>}
                            </td>
                            <td>
                                <input placeholder="firstName" {...register("firstName", { required: true, minLength: 2 })} />
                                {touchedFields.firstName && errors.firstName?.type === 'required' && <div>обязательное поле</div>}
                                {errors.firstName?.type === "minLength" && <div>Минимальная длина имени 2 буквы</div>}
                            </td>
                            <td>
                                <input placeholder="lastName" {...register("lastName", { required: true, minLength: 2 })} />
                                {touchedFields.lastName && errors.lastName?.type === 'required' && <div>обязательное поле</div>}
                                {errors.lastName?.type === "minLength" && <div>Минимальная длина фамилии 2 буквы</div>}
                            </td>
                            <td>
                                <input placeholder="email" {...register("email", { required: true })} />
                                {touchedFields.email && errors.email?.type === 'required' && <div>обязательное поле</div>}
                            </td>
                            <td>
                                <input placeholder="phone" {...register("phone", { required: true })} />
                                {touchedFields.phone && errors.phone?.type === 'required' && <div>обязательное поле</div>}
                            </td>
                        </tr>
                        }
                    </tbody>
                </table>

                <input type="submit" />
                <button onClick={() => setIsExpanded(!isExpanded)}>Add to form</button>
            </form>
            <div>
                <div>Page {currentPage} of {totalPages}</div>
                <button onClick={() => setPage(currentPage - 1)}>prev page</button>
                <button onClick={() => setPage(currentPage + 1)}>next page</button>
            </div>
        </div>
    )
})
