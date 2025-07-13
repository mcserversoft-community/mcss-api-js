
/**
 * @interface AppResponse
 *   The response from the API
 */
export type AppResponse = {
    status: number
    data?: any
    error?: {
        message: string
    }
}

/**
 * @enum ServerFilter
 *   The filter to use when getting servers
 */
export enum ServerFilter {
    NONE = 0,
    MINIMAL = 1,
    STATUS = 2
}

/**
 * @enum ServerCountFilter
 *   The filter to use when getting server count
 */
export enum ServerCountFilter {
    NONE = 0,
    ONLINE = 1,
    OFFLINE = 2,
    BYSERVERTYPE = 3
}

/**
 * @enum ServerType
 *   The server type to use when getting server count
 */
export enum ServerType {
    VANILLA = "349bf6c7-2d19-4e42-bcee-592fa862bcee",
    CRAFTBUKKIT = "afa8b9d6-592d-4016-9dd7-eed4185ca8b8",
    SPIGOT = "de188054-f3ac-472d-81d6-c57f0412bfa6",
    PAPER = "f738fb40-223e-4010-bd07-af4caabdf3dd",
    BUNGEECORD = "1a1bb7be-219f-4dc8-9a6a-4a10dc725391",
    WATERFALL = "f49ad4bf-7900-45a4-940b-c97468fbba1f",
    FORGE = "8e3aecd7-b81b-4827-a3e2-93a701cdd3b4",
    FABRIC = "c45acfcf-b4a1-4733-aab0-f78e1091ae16",
    BEDROCK = "87c2620f-48a0-47e6-97c1-ff5fbbc128f3",
    PURPUR = "984ed3d3-636d-4535-82b2-7c1048782c64"
}

/**
 * @enum TaskFilter
 *   The scheduler response object
 */
export enum TaskFilter {
    None = 0,
    FixedTime = 1,
    Interval = 2,
    Timeless = 3
}

/**
 * @enum ServerAction
 *   The server action enum
 */
export enum ServerAction {
    InvalidOrEmpty = 0,
    Stop = 1,
    Start = 2,
    Kill = 3,
    Restart = 4,
}

