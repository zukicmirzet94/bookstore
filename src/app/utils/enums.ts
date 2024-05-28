export enum BookType {
    KIDS = 'Kids',
    SCHOOL = 'School',
    UNIVERSITY = 'University',
    ROMANCE = 'Romance',
    FANTASY = 'Fantasy'
}

export enum SearchType {
    NAME = 'name',
    AUTHOR = 'author'
}

export enum Role {
    ADMIN = 'admin',
    USER = 'user',
    UNAUTHORIZED = 'unauthorized'
}


export function mapRoleToEnum(role: string): Role {
    switch (role.toLowerCase()) {
        case 'admin':
            return Role.ADMIN;
        case 'user':
            return Role.USER;
        default:
            return Role.UNAUTHORIZED;
    }
}