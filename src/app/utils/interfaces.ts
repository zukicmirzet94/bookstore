import { BookType, Role } from "./enums";

export interface Book {
    id?: string | null;
    name?: string | null;
    description?: string | null;
    author?: string | null;
    year?: number | null;
    type?: BookType | null;
    image?: string | null;
}

export interface User {
    id?: string;
    name?: string;
    username?: string;
    password?: string;
    role?: string;
}

export interface LoginRequest {
    username: string;
    password: string;
}

export interface RegisterRequest {
    id: string;
    username: string;
    password: string;
    name: string;
    role: Role;
}