<script lang="ts">
import { Ref, Component, Vue } from "vue-facing-decorator"

import { ElMessage, FormRules, FormInstance } from "element-plus"

import { TcApi } from "@/api"
import * as TC from "@/api/tencent/typings"

@Component({
    emits: ["submit"],
    expose: ["open"],
})
export default class DnspodRecordUpdate extends Vue {
    public domainInfo!: TC.Dnspod.DomainInfo

    // 创建表单

    @Ref
    public formRef!: FormInstance

    public formModel!: TC.Dnspod.RecordListItem

    public formRules: FormRules = {
        Name: [{ required: true, message: "主机记录 不能为空" }],
        Type: [{ required: true, message: "记录类型 不能为空" }],
        Line: [{ required: true, message: "线路类型 不能为空" }],
        Value: [{ required: true, message: "别名 不能为空" }],
        MX: [{ required: true, message: "记录值 不能为空" }],
        TTL: [{ required: true, message: "TTL 不能为空" }],
        Weight: [{ required: true, message: "权重 不能为空" }],
        Status: [{ required: true, message: "状态 不能为空" }],
    }

    // 提交表单

    public formSubmit(form: FormInstance | undefined) {
        form && form.validate(async valid => {
            if (!valid) {
                ElMessage.error("请检查表单")
                return false
            }
            const query: TC.Dnspod.ModifyRecordRequest = {
                Domain: this.domainInfo.Domain,
                SubDomain: this.formModel.Name,
                RecordType: this.formModel.Type,
                RecordLine: this.formModel.Line,
                Value: this.formModel.Value,
                MX: +this.formModel.MX || 0,
                TTL: +this.formModel.TTL || 600,
                Weight: +this.formModel.Weight || 0,
                RecordId: this.formModel.RecordId || 0
            }
            await TcApi.dnspod.modifyRecord(query)
            this.close()
        })
    }

    // 记录类型及线路

    public recordType: string[] = []
    public recordLineList: TC.Dnspod.LineInfo[] = []

    async getRecordType() {
        const res = await TcApi.dnspod.describeRecordType({
            DomainGrade: this.domainInfo.Grade
        })
        this.recordType = res.TypeList || []
    }

    async getRecordLine() {
        const res = await TcApi.dnspod.describeRecordLineList({
            DomainGrade: this.domainInfo.Grade,
            Domain: this.domainInfo.Domain
        })
        this.recordLineList = res.LineList || []
    }

    // 对话框管理

    public dailog = false

    public close() {
        this.dailog = false
        this.$emit("submit")
    }

    public open(info: TC.Dnspod.DomainInfo, record: TC.Dnspod.RecordListItem) {
        this.dailog = true
        this.domainInfo = info
        this.formModel = record
        this.formModel.Weight = record.Weight || 0
        // 加载数据
        this.recordType.length == 0 && this.getRecordType()
        this.recordLineList.length == 0 && this.getRecordLine()
    }
}
</script>

<template>
    <el-dialog v-model="dailog" destroy-on-close title="更新记录" width="400px">
        <el-form ref="formRef" :model="formModel" :rules="formRules" label-width="80px">
            <el-form-item prop="Name" label="主机记录">
                <el-input v-model="formModel.Name" />
            </el-form-item>
            <el-form-item prop="Type" label="记录类型">
                <el-select v-model="formModel.Type">
                    <el-option v-for="v in recordType" :key="v" :label="v" :value="v" />
                </el-select>
            </el-form-item>
            <el-form-item prop="Line" label="线路类型">
                <el-select v-model="formModel.Line">
                    <el-option v-for="v in recordLineList" :key="v.LineId" :label="v.Name" :value="v.Name" />
                </el-select>
            </el-form-item>
            <el-form-item prop="Value" label="记录值">
                <el-input v-model="formModel.Value" type="textarea" autosize />
            </el-form-item>
            <el-form-item prop="Weight" label="权重">
                <el-input-number v-model="formModel.Weight" />
            </el-form-item>
            <el-form-item prop="MX" label="MX">
                <el-input-number v-model="formModel.MX" />
            </el-form-item>
            <el-form-item prop="TTL" label="TTL">
                <el-input-number v-model="formModel.TTL" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dailog = false">取消</el-button>
                <el-button type="primary" @click="formSubmit(formRef)">
                    保存
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>