import { HttpClient } from "@/api/basic/http"
import { TaskScriptOrig } from "./task_script"

export class WorkhubModel extends HttpClient {
    public list(): Promise<WorkerItem[]> {
        return this.get("/workhub")
    }

    public exec(rq: WorkerExecRequest): Promise<[]> {
        return this.post("/workhub/exec", rq)
    }
}

export interface WorkerStat {
    HostName: string
    Uptime: number
    OS: string
    CpuCore: number
    CpuPercent: number
    MemoryTotal: number
    MemoryUsed: number
    DiskTotal: number
    DiskUsed: number
    NetBytesRecv: number
    NetBytesSent: number
}

export interface WorkerOrig {
    OSType: string
    HostId: string
    HostName: string
    RemoteAddr: string
    SystemStat: WorkerStat
}

export interface WorkerItem extends WorkerOrig {
    Id: number
    UserId?: number
    CreatedAt?: number
    UpdatedAt?: number
}

export interface WorkerExecRequest {
    HostId: string
    Payload: TaskScriptOrig
}
