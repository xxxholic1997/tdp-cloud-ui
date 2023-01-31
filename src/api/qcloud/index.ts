import { QcloudVendor } from "./base"

import { CamModel } from "./cam"
import { CvmModel } from "./cvm"
import { DnspodModel } from "./dnspod"
import { LighthouseModel } from "./lighthouse"
import { MonitorModel } from "./monitor"
import { TatModel } from "./tat"

export default {
    vendor: QcloudVendor,

    cam: new CamModel(),
    cvm: new CvmModel(),
    dnspod: new DnspodModel(),
    lighthouse: new LighthouseModel(),
    monitor: new MonitorModel(),
    tat: new TatModel(),
}
