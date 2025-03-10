import { HttpClient } from "@/api/basic/http"

export class VendorModel extends HttpClient {
    public list(): Promise<VendorPaged> {
        return this.get("/vendor")
    }

    public detail(id: number): Promise<VendorItem> {
        return this.get("/vendor/" + id)
    }

    public create(rq: VendorOrig): Promise<{ Id: number }> {
        return this.post("/vendor", rq)
    }

    public update(rq: Partial<VendorItem>): Promise<null> {
        return this.patch("/vendor/" + rq.Id, rq)
    }

    public remove(id: number): Promise<null> {
        return this.delete("/vendor/" + id)
    }
}

export const ProviderList: Record<string, string> = {
    "cloudflare": "Cloudflare",
    "tencent": "腾讯云",
}

export interface VendorOrig {
    SecretId: string
    SecretKey: string
    Provider: string
    Description: string
}

export interface VendorItem extends VendorOrig {
    Id: number
    UserId: number
    CreatedAt: number
    UpdatedAt: number
}

export interface VendorPaged {
    Datasets: VendorItem[]
    Datainfo?: unknown
}
