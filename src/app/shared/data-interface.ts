import { FormControl } from "@angular/forms";

FormControl
export interface UserRegister {
    name: string,
    lastname: string,
    username: string,
    role_id: number | null,
    mobile: number | null,
    password: string,
    company_id: number,
    warehouse_id: number | null
}
export interface Company {
    company_name: string,
    address: string,
    mobile: number,
    password: string,
    name: string,
    lastname: string,
    username: string,
    email: string
}
export interface LoginModel {
    username: string,
    password: string
}
export interface LoginResponse {
    id: number,
    username: string,
    role: string,
    token: string
}
export interface User {
    id: number,
    name: string,
    lastname: string,
    username: string,
    role_id: number,
    mobile: number,
    role?: string | null
}
export interface Product extends TabInfo {
    id: number,
    barcode: string;
    product_name: string;
    quantity: number;
    entry_date: string | null;
    exit_date: string | null;
    operator_id: number;
    warehouse_name: string;
    name: string | null,
    lastname: string | null,
    unit?: string | null;
}
interface TabInfo {
    tab: string;
}
export interface CurrentAllBalance extends TabInfo {
    barcode: string,
    product_name: string,
    current_balance: number,
    warehouse_name: string
}

export interface CurrentBalance extends TabInfo {
    id: number,
    barcode: string,
    product_name: string,
    current_balance: number,
    warehouse_name: string,
    name: string,
    lastname: string
}
export interface Warehouse extends TabInfo {
    id: number,
    warehouse: string,
    address: string
}