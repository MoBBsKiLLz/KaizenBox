import { Facility } from "./facilities.model";

export interface User {
    userId: number,
    username: string,
    password: string,
    created_at: Date,
    updated_at: Date,
    facilities?: Facility[]
}