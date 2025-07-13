
/**
 * @enum ServerPermissions
 * Enum representing the permissions that can be granted to a server.
 * Each permission corresponds to a specific action that can be performed on the server.
 */

export enum ServerPermissions {
    VIEW_STATS = "viewStats",
    VIEW_CONSOLE = "viewConsole",
    USE_CONSOLE = "useConsole",
    USE_SERVER_ACTIONS = "useServerActions",
    EDIT_SERVER = "editServer",
    VIEW_BACKUPS = "viewBackups",
    CREATE_BACKUP = "createBackup",
    EDIT_BACKUP = "editBackup",
    DELETE_BACKUPS = "deleteBackups",
    TRIGGER_BACKUP = "triggerBackup",
    VIEW_SCHEDULER_TASKS = "viewSchedulerTasks",
}

export default class Key {
    name: string;
    isAdmin?: boolean;
    hasAccessToAllServers?: boolean;
    customServerPermissions?: Record<string, Record<ServerPermissions, boolean>>;
    
    /**
     * Creates a new Key instance.
     * @param {string} name - The name of the key.
     * @param {boolean} [isAdmin] - Whether the key has admin privileges.
     * @param {boolean} [hasAccessToAllServers] - Whether the key has access to all servers.
     */

    constructor(name: string, isAdmin?: boolean, hasAccessToAllServers?: boolean) {
        this.name = name;
        this.isAdmin = isAdmin;
        this.hasAccessToAllServers = hasAccessToAllServers;
        this.customServerPermissions = {};
    }

    /**
     * Sets the name of the key.
     * @param {string} name - The new name for the key.
     * @returns {Key} The current Key instance for method chaining.
     */
    setName(name: string): Key { 
        this.name = name;
        return this;
    }

    /**
     * Sets whether the key has admin privileges.
     * @param {boolean} isAdmin - Whether the key has admin privileges.
     * @returns {Key} The current Key instance for method chaining.
     */
    setIsAdmin(isAdmin: boolean): Key {
        this.isAdmin = isAdmin;
        return this;
    }

    /**
     * Sets whether the key has access to all servers.
     * @param {boolean} hasAccessToAllServers - Whether the key has access to all servers.
     * @returns {Key} The current Key instance for method chaining.
     */
    setHasAccessToAllServers(hasAccessToAllServers: boolean): Key {
        this.hasAccessToAllServers = hasAccessToAllServers;
        return this;
    }

    /**
     * Adds custom server permissions for a specific server.
     * @param {string} serverId - The ID of the server.
     * @param {Record<ServerPermissions, boolean>} permissions - The permissions to set for the server.
     * @returns {Key} The current Key instance for method chaining.
     */
    addCustomServerPermission(serverId: string, permissions: Record<ServerPermissions, boolean>): Key {
        if (!this.customServerPermissions) {
            this.customServerPermissions = {};
        }
        this.customServerPermissions[serverId] = permissions;
        return this;
    }

    /**
     * Removes custom server permissions for a specific server.
     * @param {string} serverId - The ID of the server.
     * @returns {Key} The current Key instance for method chaining.
     */
    removeCustomServerPermission(serverId: string): Key {
        if (this.customServerPermissions && this.customServerPermissions[serverId]) {
            delete this.customServerPermissions[serverId];
        }
        return this;
    }

    /**
     * Converts the Key instance to a JSON object.
     * @returns {Record<string, any>} The JSON representation of the Key instance.
     */
    toJSON(): Record<string, any> {
        return {
            name: this.name,
            isAdmin: this.isAdmin,
            hasAccessToAllServers: this.hasAccessToAllServers,
            customServerPermissions: this.customServerPermissions
        };
    }
}