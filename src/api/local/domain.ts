import { HttpClient } from "../basic/http"

export class DomainModel extends HttpClient {
    public list(): Promise<DomainItem[]> {
        return this.get("/domain")
    }

    public detail(id: number): Promise<DomainItem> {
        return this.get("/domain/" + id)
    }

    public create(rq: DomainRequest): Promise<DomainResponse> {
        return this.post("/domain", rq)
    }

    public update(rq: DomainItem): Promise<DomainResponse> {
        return this.patch("/domain/" + rq.Id, rq)
    }

    public remove(id: number): Promise<DomainResponse> {
        return this.delete("/domain/" + id)
    }
}

export interface DomainItem {
    Id: number
    UserId: number
    VendorId: number
    Name: string
    Model: "" | "qcloud/dnspod"
    CloudId: string
    CloudMeta: Record<string, any>
    Description: string
    Status: string
    CreatedAt: string
    UpdatedAt: string
}

export interface DomainRequest {
    VendorId: number
    Name: string
    Model: "" | "qcloud/dnspod"
    CloudId: string
    CloudMeta: string
    Description: string
    Status: string
}

export interface DomainResponse {
    Message: string
}
