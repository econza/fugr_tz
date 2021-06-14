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
    const [sorting, setSorting] = useState<string>();
    const direction = useMemo(() => isAsc ? "asc" : "desc", [isAsc])
    const paginatedItems = useMemo(() => items.slice(currentIndex, endIndex), [items, currentIndex, endIndex])

    const handleFormSubmit = (formValues: Inputs) => {
        handleAddItem(formValues)
        setPage(totalPages)
    }

    const handleSelect = (field: string) => {
        handleSortItems(field, direction)
        setIsAsc(!isAsc)
        setSorting(field)
    }

    return (
        <div>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <table>
                    <thead className={styles.theader}>
                        <tr>
                            <th
                                className={classnames(styles.headerCell, {
                                [styles.sortAsc]: sorting === "id" && isAsc,
                                [styles.sortDesc]: sorting === "id" && !isAsc,
                                })}
                                onClick={() => handleSelect("id")}
                            >
                                id
                            </th>
                            <th
                                className={classnames(styles.headerCell, {
                                [styles.sortAsc]: sorting === "firstName" && isAsc,
                                [styles.sortDesc]: sorting === "firstName" && !isAsc,
                                })}
                                onClick={() => handleSelect("firstName")}
                            >
                                firstName
                            </th>
                            <th
                                className={classnames(styles.headerCell, {
                                [styles.sortAsc]: sorting === "lastName" && isAsc,
                                [styles.sortDesc]: sorting === "lastName" && !isAsc,
                                })}
                                onClick={() => handleSelect("lastName")}
                            >
                                lastName
                            </th>
                            <th
                                className={classnames(styles.headerCell, {
                                [styles.sortAsc]: sorting === "email" && isAsc,
                                [styles.sortDesc]: sorting === "email" && !isAsc,
                                })}
                                onClick={() => handleSelect("email")}
                            >
                                email
                            </th>
                            <th
                                className={classnames(styles.headerCell, {
                                [styles.sortAsc]: sorting === "phone" && isAsc,
                                [styles.sortDesc]: sorting === "phone" && !isAsc,
                                })}
                                onClick={() => handleSelect("phone")}
                            >
                                phone
                            </th>
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

                        {isExpanded &&
                            <tr>
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


                <button className={styles.customButton} onClick={(e) => {
                    e.preventDefault();
                    setIsExpanded(!isExpanded);
                }}>Add to form</button>
                <input className={styles.customButton} type="submit" />
            </form>
            <div className={styles.pagWrapper}>
                <button className={styles.customButton} onClick={() => setPage(currentPage - 1)}>prev page</button>
                <div>Page {currentPage} of {totalPages}</div>
                <button className={styles.customButton} onClick={() => setPage(currentPage + 1)}>next page</button>
            </div>
        </div>
    )
})
