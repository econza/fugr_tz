export const API_URL: string = "http://www.filltext.com";

export const createQueryParams = (quantity: number): string => `rows=${quantity}&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}`