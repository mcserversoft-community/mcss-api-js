
/**
 * - name (required) : string
- url(required) : string
- enabled (optional) : boolean
- messageFormat (optional) : integer
- webhookTriggers (optional) : string[]
- optionalHeaders (optional) : object[]
 */

export default class Webhook {
    name: string;
    url: string;
    enabled: boolean;
    messageFormat: number;
    webhookTriggers: string[];
    optionalHeaders: any[];

    constructor(name: string, url: string) {
        if(!name && !url) throw new Error("")
    }
}