
/**
 * @enum Compression
 * @description Enum for compression levels
 */
export enum Compression {
    HIGH = 0,
    LOW = 1,
    NONE = 2
}

export default class Backup {
    name: string;
    destination: string;
    suspend: boolean;
    compression: Compression;
    deleteOldBackups: boolean;
    runBackupAfterCreation: boolean;
    fileBlacklist: string[];
    folderBlacklist: string[];

    /**
     * @param {string} name - The name of the backup
     * @param {string} destination - The destination of the backup
     */
    constructor(name: string, destination: string) {
        this.name = name;
        this.destination = destination;
        this.suspend = false;
        this.compression = Compression.NONE;
        this.deleteOldBackups = false;
        this.runBackupAfterCreation = false;
        this.fileBlacklist = [];
        this.folderBlacklist = [];
    }

    /**
     * @description Get the name
     * @returns {string}
     */
    public getName(): string { return this.name; }

    /**
     * @description Get the destination
     * @returns {string}
     */
    public getDestination(): string { return this.destination; }

    /**
     * @description Get the suspend status
     * @returns {boolean}
     */
    public getSuspend(): boolean { return this.suspend; }

    /**
     * @description Get the compression level
     * @returns {Compression}
     */
    public getCompression(): Compression { return this.compression; }

    /**
     * @description Get the delete old backups status
     * @returns {boolean}
     */
    public getDeleteOldBackups(): boolean { return this.deleteOldBackups; }

    /**
     * @description Get the run backup after creation status
     * @returns {boolean}
     */
    public getRunBackupAfterCreation(): boolean { return this.runBackupAfterCreation; }

    /**
     * @description Get the file blacklist
     * @returns {string[]}
     */
    public getFileBlacklist(): string[] { return this.fileBlacklist; }

    /**
     * @description Get the folder blacklist
     * @returns {string[]}
     */
    public getFolderBlacklist(): string[] { return this.folderBlacklist; }

    /**
     * @description Set the name
     * @param {string} name - The name
     * @returns {Backup}
     */
    public setName(name: string): Backup { this.name = name; return this; }

    /**
     * @description Set the destination
     * @param {string} destination - The destination
     * @returns {Backup}
     */
    public setDestination(destination: string): Backup { this.destination = destination; return this; }

    /**
     * @description Set the suspend status
     * @param {boolean} suspend - The suspend status
     * @returns {Backup}
     */
    public setSuspend(suspend: boolean): Backup { this.suspend = suspend; return this; }

    /**
     * @description Set the compression level
     * @param {Compression} compression - The compression level
     * @returns {Backup}
     */
    public setCompression(compression: Compression): Backup { this.compression = compression; return this; }

    /**
     * @description Set the delete old backups status
     * @param {boolean} deleteOldBackups - The delete old backups status
     * @returns {Backup}
     */
    public setDeleteOldBackups(deleteOldBackups: boolean): Backup { this.deleteOldBackups = deleteOldBackups; return this; }

    /**
     * @description Set the run backup after creation status
     * @param {boolean} runBackupAfterCreation - The run backup after creation status
     * @returns {Backup}
     */
    public setRunBackupAfterCreation(runBackupAfterCreation: boolean): Backup { this.runBackupAfterCreation = runBackupAfterCreation; return this; }

    /**
     * @description Set the file blacklist
     * @param {string[]} fileBlacklist - The file blacklist
     * @returns {Backup}
     */
    public setFileBlacklist(fileBlacklist: string[]): Backup { this.fileBlacklist = fileBlacklist; return this; }

    /**
     * @description Set the folder blacklist
     * @param {string[]} folderBlacklist - The folder blacklist
     * @returns {Backup}
     */
    public setFolderBlacklist(folderBlacklist: string[]): Backup { this.folderBlacklist = folderBlacklist; return this; }

    /**
     * @description Add a file to the blacklist
     * @param {string} file - The file to add to the blacklist
     * @returns {Backup}
     */
    public addFileToBlacklist(file: string): Backup {
        this.fileBlacklist.push(file);
        return this;
    }

    /**
     * @description Remove a file from the blacklist
     * @param file 
     * @returns {Backup}
     */
    public removeFileFromBlacklist(file: string): Backup {
        this.fileBlacklist = this.fileBlacklist.filter((f: string) => f !== file);
        return this;
    }

    /**
     * @description Add a folder to the blacklist
     * @param {string} folder - The folder to add to the blacklist
     * @returns {Backup}
     */
    public addFolderToBlacklist(folder: string): Backup {
        this.folderBlacklist.push(folder);
        return this;
    }

    /**
     * @description Remove a folder from the blacklist
     * @param {string} folder - The folder to remove from the blacklist
     * @returns {Backup}
     */
    public removeFolderFromBlacklist(folder: string): Backup {
        this.folderBlacklist = this.folderBlacklist.filter((f: string) => f !== folder);
        return this;
    }

    /**
     * @description Convert the backup to JSON
     * @returns {object}
     */
    public toJSON(): object {
        return {
            name: this.name,
            destination: this.destination,
            suspend: this.suspend,
            compression: this.compression,
            deleteOldBackups: this.deleteOldBackups,
            runBackupAfterCreation: this.runBackupAfterCreation,
            fileBlacklist: this.fileBlacklist,
            folderBlacklist: this.folderBlacklist
        }
    }

}
