import { HttpClient, HttpMessage } from "@/api/basic/http"

export class DomainModel extends HttpClient {
    public list(): Promise<DomainItem[]> {
        return this.get("/domain")
    }

    public detail(id: number): Promise<DomainItem> {
        return this.get("/domain/" + id)
    }

    public create(rq: DomainOrig): Promise<HttpMessage> {
        return this.post("/domain", rq)
    }

    public update(rq: DomainItem): Promise<HttpMessage> {
        return this.patch("/domain/" + rq.Id, rq)
    }

    public remove(id: number): Promise<HttpMessage> {
        return this.delete("/domain/" + id)
    }
}

export interface DomainOrig {
    VendorId: number
    Name: string
    NSList: string
    Model: "" | "qcloud/dnspod"
    CloudId: string
    CloudMeta: string | Record<string, unknown>
    Description: string
    Status: string
}

export interface DomainItem extends DomainOrig {
    Id: number
    UserId?: number
    CreatedAt?: string
    UpdatedAt?: string
}
