/**
 * @enum WebhookMessageFormat
 *  The message format to use when creating or editing a webhook
 */
export enum WebhookMessageFormat {
    GENERAL = 0,
    DISCORD = 1
}

/**
 * @enum WebhookTrigger
 *  The webhook trigger to use when creating or editing a webhook
 */ 
export enum WebhookTrigger {
    ALL = "All",
    SERVER_CREATED = "ServerCreated",
    SERVEREDITED = "ServerEdited",
    SERVERDELETED = "ServerDeleted",
    SERVERSTATUSCHANGED = "ServerStatusChanged"
}

export default class Webhook {
    name: string;
    url: string;
    enabled: boolean;
    messageFormat: number;
    webhookTriggers: string[];
    optionalHeaders: object[];

    /**
     * @param {string} name - The name of the webhook.
     * @param {string} url - The URL of the webhook.
     */
    constructor(name: string, url: string) {
        if (!name || !url) throw new Error("Webhook name and URL are required.");
        this.name = name;
        this.url = url;
        this.enabled = true;
        this.messageFormat = 0;
        this.webhookTriggers = [WebhookTrigger.ALL];
        this.optionalHeaders = [];
    }

    /**
     * Sets the name of the webhook.
     * @param {string} name - The new name.
     * @returns {Webhook} The current Webhook instance for method chaining.
     */
    setName(name: string): Webhook {
        this.name = name;
        return this;
    }

    /**
     * Sets the URL of the webhook.
     * @param {string} url - The new URL.
     * @returns {Webhook} The current Webhook instance for method chaining.
     */
    setUrl(url: string): Webhook {
        this.url = url;
        return this;
    }

    /**
     * Sets whether the webhook is enabled.
     * @param {boolean} enabled - The enabled state.
     * @returns {Webhook} The current Webhook instance for method chaining.
     */
    setEnabled(enabled: boolean): Webhook {
        this.enabled = enabled;
        return this;
    }

    /**
     * Sets the message format.
     * @param {number} format - The message format (0 for JSON, 1 for XML).
     * @returns {Webhook} The current Webhook instance for method chaining.
     */
    setMessageFormat(format: WebhookMessageFormat|number): Webhook {
        this.messageFormat = format;
        return this;
    }

    /**
     * Sets the triggers for the webhook.
     * @param {WebhookTrigger[]} triggers - The list of triggers.
     * @returns {Webhook} The current Webhook instance for method chaining.
     */
    setWebhookTriggers(triggers: WebhookTrigger[]): Webhook {
        this.webhookTriggers = triggers;
        return this;
    }

    /**
     * Adds an optional header to the webhook.
     * @param {string} name - The header name.
     * @param {string} value - The header value.
     * @returns {Webhook} The current Webhook instance for method chaining.
     */
    addOptionalHeader(name: string, value: string): Webhook {
        this.optionalHeaders.push({ name, value });
        return this;
    }

    /**
     * Converts the Webhook instance to a JSON object for the API.
     * @returns {object} The JSON representation of the Webhook.
     */
    toJSON(): object {
        return {
            name: this.name,
            url: this.url,
            enabled: this.enabled,
            messageFormat: this.messageFormat,
            webhookTriggers: this.webhookTriggers,
            optionalHeaders: this.optionalHeaders,
        };
    }
}