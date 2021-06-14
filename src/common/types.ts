type OneOnly<Obj, Key extends keyof Obj> = { [key in Exclude<keyof Obj, Key>]: null } & Pick<Obj, Key>;
type OneOfByKey<T> = { [key in keyof T]: OneOnly<T, key> };
type ValueOf<Obj> = Obj[keyof Obj];
export type OneOf<T> = ValueOf<OneOfByKey<T>>;


export type Address = {
    streetAddress: string,
    city: string,
    state: string,
    zip: string,
}

export type Inputs = Omit<RowData, "description" | "address">

export interface RowData {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    description?: string,
    address?: Address,
}

export interface TableProps {
    items: Array<RowData>,
    selectedId? : number
    handleRowClick: (data: RowData) => void
    handleAddItem: (formValues: Inputs) => void
    handleSortItems: (field: any, direction: "asc" | "desc") => void
}
