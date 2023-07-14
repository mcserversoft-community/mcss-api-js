

export default class User {
    username: string;
    password: string;
    enabled: boolean;
    isAdmin: boolean;
    hasAccessToAllServers: boolean;
    customServerPermissions: object[] | null;
    constructor(username: string, password: string, enabled: boolean, isAdmin: boolean, hasAccessToAllServers: boolean, customServerPermissions?: object[]) {
        this.username = username;
        this.password = password;
        this.enabled = enabled;
        this.isAdmin = isAdmin;
        this.hasAccessToAllServers = hasAccessToAllServers;
        this.customServerPermissions = customServerPermissions || [];
    }

    public getUsername(): string { return this.username; }
    public getPassword(): string { return this.password; }
    public getEnabled(): boolean { return this.enabled; }
    public getIsAdmin(): boolean { return this.isAdmin; }
    public HasAccessToAllServers(): boolean { return this.hasAccessToAllServers; }
    public getCustomServerPermissions(): object[] | null { return this.customServerPermissions; }

    public setUsername(username: string): User { this.username = username; return this; }
    public setPassword(password: string): User { this.password = password; return this; }
    public setEnabled(enabled: boolean): User { this.enabled = enabled; return this; }
    public setIsAdmin(isAdmin: boolean): User { this.isAdmin = isAdmin; return this; }
    public setHasAccessToAllServers(hasAccessToAllServers: boolean): User { this.hasAccessToAllServers = hasAccessToAllServers; return this; }
    
    public setCustomServerPermissions(customServerPermissions: object[]): User {
        this.customServerPermissions = customServerPermissions;
        return this;
    } 

    public addCustomServerPermission(serverId: any, viewStats: boolean, viewConsole: boolean, useConsole: boolean, useServerActions: boolean): User {
        if(!this.customServerPermissions) this.customServerPermissions = [];
        this.customServerPermissions[serverId] = {
            serverId,
            viewStats,
            viewConsole,
            useConsole,
            useServerActions
        }
        return this;
    }

    public removeCustomServerPermission(serverId: string): User {
        if(!this.customServerPermissions) return this;
        this.customServerPermissions = this.customServerPermissions.filter((permission: any) => permission.serverId !== serverId);
        return this;
    }

    public toJSON(): object {
        return {
            username: this.username,
            password: this.password,
            passwordRepeat: this.password,
            email: this.enabled,
            isAdmin: this.isAdmin,
            hasAccessToAllServers: this.hasAccessToAllServers,
            customServerPermissions: this.customServerPermissions
        }
    }

}