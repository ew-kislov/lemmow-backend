export interface JwtRole {
    id: number;
    companyPermissions: number[];
}

export interface JwtPayload {
    id: number;
    companyId: number;
    role: JwtRole;
}