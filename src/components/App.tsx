import React, { useCallback, useState } from 'react';
import { orderBy } from 'lodash'

import { Table } from './Table/Table'
import { Info } from './Info/Info'
import { RowData, Inputs } from '../common/types';
import { API_URL, createQueryParams } from '../common/request';
import { useRequest } from '../common/hooks';

export const App: React.FC = () => {
  const [items, setItems] = useState<Array<RowData>>([]);
  const [selectedData, setSelectedData] = useState<RowData>()
  const [isLoading, error] = useRequest<RowData[]>(`${API_URL}/?${createQueryParams(110)}`, setItems);

  const handleRowClick = useCallback((data: RowData) => {
    setSelectedData(data)
  }, [])

  const handleSortItems = (sortable: RowData[]) => (field: any, direction: "asc" | "desc") => {
    setItems(orderBy(sortable, field, direction))
  }

  const handleAddItem = (formValues: Inputs) => {
    setItems([...items, { ...formValues }])
  }

  if (error) {
    return <div>Something went wrong</div>
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="App">
      <Table
        items={items}
        selectedId={selectedData?.id}
        handleRowClick={handleRowClick}
        handleSortItems={handleSortItems(items)}
        handleAddItem={handleAddItem}
      />
      {selectedData && <Info {...selectedData} />}
    </div>
  );
}
