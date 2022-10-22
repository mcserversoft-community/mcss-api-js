"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var axios_1 = require("axios");
var https_1 = require("https");
module.exports = /** @class */ (function () {
    function MCSS(_ip, _port, _key) {
        if (!_ip || !_port || !_key)
            throw new Error("Must Provide a valid Info");
        this.instance = axios_1["default"].create({
            httpsAgent: new https_1.Agent({ rejectUnauthorized: false }),
            validateStatus: function () { return true; },
            headers: {
                apikey: _key
            }
        });
        this.ip = _ip;
        this.port = _port;
        this.apiKey = _key;
        this.server = new Server(this);
    }
    MCSS.prototype.getURL = function () {
        return "http://".concat(this.ip, ":").concat(this.port, "/api/v1/");
    };
    MCSS.prototype.generateResponse = function (code, data) {
        switch (code) {
            case 200:
                return { status: 200, data: data };
            case 201:
                return { status: 201, data: data };
            case 401:
                return { status: 401, error: { message: 'Incorrect API key' } };
            case 404:
                return { status: 404, error: { message: 'Server not found' } };
            default:
                return { status: code, error: { message: 'An unexpected error occured' } };
        }
    };
    MCSS.prototype.getVersion = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.instance.get(this.getURL())];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, this.generateResponse(response.status, response.data)];
                }
            });
        });
    };
    MCSS.prototype.getServers = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.instance.get(this.getURL() + "servers")];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, this.generateResponse(response.status, response.data)];
                }
            });
        });
    };
    MCSS.prototype.getServerCount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.instance.get(this.getURL() + "servers/count")];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, this.generateResponse(response.status, response.data)];
                }
            });
        });
    };
    return MCSS;
}());
var Server = /** @class */ (function () {
    function Server(client) {
        this.client = client;
    }
    Server.prototype.getURL = function () {
        return "http://".concat(this.client.ip, ":").concat(this.client.port, "/api/v1/servers/");
    };
    Server.prototype.fetch = function (_id) {
        this.server = _id;
        this.scheduler = new Scheduler(this.client, _id);
        return this;
    };
    Server.prototype.getTasks = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.instance.get(this.getURL() + "".concat(this.server, "/scheduler/tasks"))];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, this.client.generateResponse(response.status, response.data)];
                }
            });
        });
    };
    Server.prototype.get = function (_id) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.instance.get(this.getURL() + _id)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, this.client.generateResponse(response.status, response.data)];
                }
            });
        });
    };
    Server.prototype.getStats = function (_id) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.instance.get(this.getURL() + _id + "/stats")];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, this.client.generateResponse(response.status, response.data)];
                }
            });
        });
    };
    Server.prototype.getIcon = function (_id) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.instance.get(this.getURL() + _id + "/icon")];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, this.client.generateResponse(response.status, response.data)];
                }
            });
        });
    };
    Server.prototype.edit = function (_id, server) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.instance.put(this.getURL() + _id, server)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, this.client.generateResponse(response.status, response.data)];
                }
            });
        });
    };
    Server.prototype.execute = function (_id) {
        var action = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            action[_i - 1] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(action.length == 1)) return [3 /*break*/, 14];
                        _a = action[0];
                        switch (_a) {
                            case 0: return [3 /*break*/, 1];
                            case 1: return [3 /*break*/, 3];
                            case 2: return [3 /*break*/, 5];
                            case 3: return [3 /*break*/, 7];
                            case 4: return [3 /*break*/, 9];
                        }
                        return [3 /*break*/, 11];
                    case 1: return [4 /*yield*/, this.client.instance.post(this.getURL() + _id + "/execute/action", { action: 0 })];
                    case 2:
                        _b.sent();
                        return [3 /*break*/, 13];
                    case 3: return [4 /*yield*/, this.client.instance.post(this.getURL() + _id + "/execute/action", { action: 1 })];
                    case 4:
                        _b.sent();
                        return [3 /*break*/, 13];
                    case 5: return [4 /*yield*/, this.client.instance.post(this.getURL() + _id + "/execute/action", { action: 2 })];
                    case 6:
                        _b.sent();
                        return [3 /*break*/, 13];
                    case 7: return [4 /*yield*/, this.client.instance.post(this.getURL() + _id + "/execute/action", { action: 3 })];
                    case 8:
                        _b.sent();
                        return [3 /*break*/, 13];
                    case 9: return [4 /*yield*/, this.client.instance.post(this.getURL() + _id + "/execute/action", { action: 4 })];
                    case 10:
                        _b.sent();
                        return [3 /*break*/, 13];
                    case 11: return [4 /*yield*/, this.client.instance.post(this.getURL() + _id + "/execute/command", { command: action[0] })];
                    case 12:
                        _b.sent();
                        return [3 /*break*/, 13];
                    case 13: return [3 /*break*/, 16];
                    case 14: return [4 /*yield*/, this.client.instance.post(this.getURL() + _id + "/execute/commands", { commands: action })];
                    case 15:
                        _b.sent();
                        _b.label = 16;
                    case 16: return [2 /*return*/];
                }
            });
        });
    };
    return Server;
}());
var ServerEditor = /** @class */ (function () {
    function ServerEditor() {
        this.name;
        this.description;
        this.autoStartWithMcss;
        this.forceSaveOnStop;
        this.allocatedMemoryInMegabytes;
    }
    ServerEditor.prototype.setName = function (name) {
        this.name = name;
        return this;
    };
    ServerEditor.prototype.setDescription = function (description) {
        this.description = description;
        return this;
    };
    ServerEditor.prototype.setAutoStartWithMcss = function (condition) {
        this.autoStartWithMcss = condition;
        return this;
    };
    ServerEditor.prototype.setForceSaveOnStop = function (condition) {
        this.forceSaveOnStop = condition;
        return this;
    };
    ServerEditor.prototype.setAllocatedMemoryInMegabytes = function (amount) {
        this.allocatedMemoryInMegabytes = amount;
        return this;
    };
    return ServerEditor;
}());
module.exports.ServerEditor = ServerEditor;
var Scheduler = /** @class */ (function () {
    function Scheduler(client, args) {
        this.client = client;
        this.server = args;
    }
    Scheduler.prototype.getURL = function (_id) {
        return "http://".concat(this.client.ip, ":").concat(this.client.port, "/api/v1/servers/").concat(_id, "/scheduler");
    };
    Scheduler.prototype.create = function (task) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!task.name || !task.timing || !task.job)
                            throw new Error("You are missing required Arguments for creating a task.");
                        return [4 /*yield*/, this.client.instance.request({
                                method: 'POST',
                                url: this.getURL(this.server) + "/tasks",
                                data: JSON.stringify(task)
                            })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, this.client.generateResponse(response.status, response.data)];
                }
            });
        });
    };
    Scheduler.prototype.edit = function (_id, task) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!task.name || !task.timing || !task.job)
                            throw new Error("You are missing required Arguments for creating a task.");
                        return [4 /*yield*/, this.client.instance.request({
                                method: 'PUT',
                                url: this.getURL(this.server) + "/tasks/" + _id,
                                data: JSON.stringify(task)
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Scheduler.prototype["delete"] = function (_id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.instance["delete"](this.getURL(this.server) + "/tasks/" + _id)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Scheduler.prototype.run = function (_id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.instance.post(this.getURL(this.server) + "/tasks/" + _id)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Scheduler.prototype.get = function (_id) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.instance.get(this.getURL(this.server) + "/tasks/" + _id)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, this.client.generateResponse(response.status, response.data)];
                }
            });
        });
    };
    Scheduler.prototype.details = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.instance.get(this.getURL(this.server))];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, this.client.generateResponse(response.status, response.data)];
                }
            });
        });
    };
    return Scheduler;
}());
var ServerTask = /** @class */ (function () {
    function ServerTask() {
        this.name;
        this.enabled;
        this.playerRequirement;
        this.timing;
        this.job;
    }
    ServerTask.prototype.setName = function (name) {
        this.name = name;
        return this;
    };
    ServerTask.prototype.setEnabled = function (condition) {
        this.enabled = condition;
        return this;
    };
    ServerTask.prototype.setPlayerRequirement = function (value) {
        this.playerRequirement = value;
        return this;
    };
    ServerTask.prototype.setTiming = function (interval, repeat) {
        this.timing = { repeat: repeat, interval: interval };
        return this;
    };
    ServerTask.prototype.setJobs = function (commands) {
        this.job = { commands: commands };
        return this;
    };
    return ServerTask;
}());
module.exports.ServerTask = ServerTask;
/*
class Backups {
    client: any;
    constructor(client) {
        this.client = client;
    }
}
*/ 
