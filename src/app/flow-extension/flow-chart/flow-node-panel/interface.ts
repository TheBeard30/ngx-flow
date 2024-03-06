import { NsGraph } from "@/app/flow-core/interfaces"
import { Component } from "@angular/core"

/** 自定义节点面板 */
export interface IRegisterNode {
    title?: string
    key?: string
    hidden?: boolean
    nodes?: ICustomNode[]
}

/** 自定义节点 */
export interface ICustomNode {
    name: string
    component: any
    label?: string
    width?: number
    height?: number
    ports?: NsGraph.INodeConfig['ports']
}