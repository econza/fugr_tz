import React from 'react';
import styles from './Info.module.css';
import { RowData } from '../../common/types';

export const Info: React.FC<RowData> = ({
    firstName,
    lastName,
    description,
    address
}) => {
    return (
        <div className={styles.infoWrapper}>
            <div>Выбран пользователь <strong>{firstName} {lastName}</strong></div>
            <div className={styles.description} >{description}</div>
            {address &&
                <div>
                    <div>Адрес проживания: <strong>{address.streetAddress}</strong></div>
                    <div>Город: <strong>{address.city}</strong></div>
                    <div>Провинция/штат: <strong>{address.state}</strong></div>
                    <div>Индекс: <strong>{address.zip}</strong></div>
                </div>
            }
        </div>
    )
}
