
export type Server = {
    guid: string;
    status: number;
    name: string;
    description: string;
    pathToFolder: string;
    folderName: string;
    creationDate: string;
    isSetToAutoStart: boolean;
    forceSaveOnStop: boolean;
    keepOnline: number;
    javaAllocatedMemory: number;
    javaStartupLine: string;
}