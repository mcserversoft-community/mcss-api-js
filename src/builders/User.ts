
/**
 *   The permissions
 */
export enum Permissions {
    viewStats = "viewStats",
    viewConsole = "viewConsole",
    useConsole = "useConsole",
    useServerActions = "useServerActions",
    editServer = "editServer",
    viewBackups = "viewBackups",
    createBackup = "createBackup",
    editBackup = "editBackup",
    deleteBackups = "deleteBackups",
    triggerBackup = "triggerBackup",
    viewSchedulerTasks = "viewSchedulerTasks",
    createSchedulerTasks = "createSchedulerTasks",
    editSchedulerTask = "editSchedulerTask",
    deleteSchedulerTasks = "deleteSchedulerTasks",
    triggerSchedulerTask = "triggerSchedulerTask",
}

export default class User {
    username: string;
    password: string;
    enabled: boolean;
    isAdmin: boolean;
    hasAccessToAllServers: boolean;
    customServerPermissions: object[] | null;

    /**
     * 
     * @param username 
     * @param password 
     * @param enabled 
     * @param isAdmin 
     * @param hasAccessToAllServers 
     * @param customServerPermissions 
     */
    constructor(username: string, password: string, enabled: boolean, isAdmin: boolean, hasAccessToAllServers: boolean, customServerPermissions?: object[]) {
        this.username = username;
        this.password = password;
        this.enabled = enabled;
        this.isAdmin = isAdmin;
        this.hasAccessToAllServers = hasAccessToAllServers;
        this.customServerPermissions = customServerPermissions || [];
    }

    /**
     *   Get the username
     * @returns {string}
     */
    public getUsername(): string { return this.username; }

    /**
     *   Get the password
     * @returns {string}
     */
    public getPassword(): string { return this.password; }

    /**
     *   Get the enabled status
     * @returns {boolean}
     */
    public getEnabled(): boolean { return this.enabled; }

    /**
     *   Get the isAdmin status
     * @returns {boolean}
     */
    public getIsAdmin(): boolean { return this.isAdmin; }

    /**
     *   Get the hasAccessToAllServers status
     * @returns {boolean}
     */
    public HasAccessToAllServers(): boolean { return this.hasAccessToAllServers; }

    /**
     *   Get the customServerPermissions
     * @returns {object[]}
     */
    public getCustomServerPermissions(): object[] | null { return this.customServerPermissions; }

    /**
     *   Set the username
     * @param {string} username - The username
     * @returns {User}
     */
    public setUsername(username: string): User { this.username = username; return this; }

    /**
     *   Set the password
     * @param {string} password - The password
     * @returns {User}
     */
    public setPassword(password: string): User { this.password = password; return this; }

    /**
     *   Set the enabled status
     * @param {boolean} enabled - The enabled status
     * @returns {User}
     */
    public setEnabled(enabled: boolean): User { this.enabled = enabled; return this; }

    /**
     *   Set the isAdmin status
     * @param {boolean} isAdmin - The isAdmin status
     * @returns {User}
     */
    public setIsAdmin(isAdmin: boolean): User { this.isAdmin = isAdmin; return this; }

    /**
     *   Set the hasAccessToAllServers status
     * @param {boolean} hasAccessToAllServers - The hasAccessToAllServers status
     * @returns {User}
     */
    public setHasAccessToAllServers(hasAccessToAllServers: boolean): User { this.hasAccessToAllServers = hasAccessToAllServers; return this; }
    
    /**
     *   Set the customServerPermissions
     * @param {object[]} customServerPermissions - The customServerPermissions
     * @returns {User}
     */
    public setCustomServerPermissions(customServerPermissions: object[]): User {
        this.customServerPermissions = customServerPermissions;
        return this;
    } 

    /**
     *   Add a custom server permission
     * @param {string} serverId - The server ID
     * @param {Permissions|string} permissions - The permissions
     * @param {boolean} value - The value
     * @returns {User}
     */
    public addCustomServerPermission(serverId: any, permissions: Permissions|string, value: boolean): User {
        if(!this.customServerPermissions) this.customServerPermissions = [];
        this.customServerPermissions[serverId][permissions] = value;
        return this;
    }

    /**
     *   Remove a custom server permission
     * @param {string} serverId - The server ID
     * @returns {User}
     */
    public removeCustomServerPermission(serverId: string): User {
        if(!this.customServerPermissions) return this;
        delete this.customServerPermissions[serverId];
        return this;
    }

    /**
     *   Convert the user to JSON
     * @returns {object}
     */
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