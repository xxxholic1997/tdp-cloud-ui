import { HttpClient } from "../basic/http"

export class ConfigModel extends HttpClient {
    public list(): Promise<ConfigItem[]> {
        return this.get("/config")
    }

    public detail(key: string): Promise<ConfigItem> {
        return this.get("/config/" + key)
    }

    public create(data: ConfigRequest): Promise<ConfigResponse> {
        return this.post("/config", data)
    }

    public update(data: ConfigItem): Promise<ConfigResponse> {
        return this.patch("/config/" + data.Key, data)
    }

    public remove(key: string): Promise<ConfigResponse> {
        return this.delete("/config/" + key)
    }
}

export interface ConfigRequest {
    Key: string
    Value: string
}

export interface ConfigResponse {
    Message: string
}

export interface ConfigItem {
    Id: number
    Key: string
    Value: string
    CreatedAt: string
    UpdatedAt: string
}
