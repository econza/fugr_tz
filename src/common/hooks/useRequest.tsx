import { useState, useEffect } from "react";
import { uniqBy } from "lodash";
import { RowData } from '../types';

export const useRequest = <T, >(url: string, setter?: (data: T) => void) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>();

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        let response = await fetch(url);
        let data = await response.json();
        if (!data.length) {
            setError("Something went wrong")
        }
    
        const uniqData = uniqBy<RowData[]>(data, "id") as any

        setter && setter(uniqData)
        setData(uniqData);
      } catch (e) {
        setError(e);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  return [isLoading, error, data];
}
