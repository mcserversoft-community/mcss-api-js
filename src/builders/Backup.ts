
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

    public getName(): string { return this.name; }
    public getDestination(): string { return this.destination; }
    public getSuspend(): boolean { return this.suspend; }
    public getCompression(): Compression { return this.compression; }
    public getDeleteOldBackups(): boolean { return this.deleteOldBackups; }
    public getRunBackupAfterCreation(): boolean { return this.runBackupAfterCreation; }
    public getFileBlacklist(): string[] { return this.fileBlacklist; }
    public getFolderBlacklist(): string[] { return this.folderBlacklist; }

    public setName(name: string): Backup { this.name = name; return this; }
    public setDestination(destination: string): Backup { this.destination = destination; return this; }
    public setSuspend(suspend: boolean): Backup { this.suspend = suspend; return this; }
    public setCompression(compression: Compression): Backup { this.compression = compression; return this; }
    public setDeleteOldBackups(deleteOldBackups: boolean): Backup { this.deleteOldBackups = deleteOldBackups; return this; }
    public setRunBackupAfterCreation(runBackupAfterCreation: boolean): Backup { this.runBackupAfterCreation = runBackupAfterCreation; return this; }
    public setFileBlacklist(fileBlacklist: string[]): Backup { this.fileBlacklist = fileBlacklist; return this; }
    public setFolderBlacklist(folderBlacklist: string[]): Backup { this.folderBlacklist = folderBlacklist; return this; }

    public addFileToBlacklist(file: string): Backup {
        this.fileBlacklist.push(file);
        return this;
    }

    public removeFileFromBlacklist(file: string): Backup {
        this.fileBlacklist = this.fileBlacklist.filter((f: string) => f !== file);
        return this;
    }

    public addFolderToBlacklist(folder: string): Backup {
        this.folderBlacklist.push(folder);
        return this;
    }

    public removeFolderFromBlacklist(folder: string): Backup {
        this.folderBlacklist = this.folderBlacklist.filter((f: string) => f !== folder);
        return this;
    }

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
