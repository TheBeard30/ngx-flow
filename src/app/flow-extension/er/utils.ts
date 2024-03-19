import { Graph } from "@antv/x6";

/**
 * @description 注册连接桩的布局方式
 */
export const registerPortLayout = () => {
    Graph.registerPortLayout('portPosition', (args): any => {
        return args.map((_, index) => {
            return {
                position: {
                    x: 0,
                    y: 40 + index * 28,
                },
                angle: 0,
            }
        })
    }, true);
}

/**
 * @description 获取节点的连接桩
 * @param table
 */
export const getNodePorts = (field: any[]): any => {
    const groups = {} as any;
    groups[`group-left`] = {
        markup: [
            {
                tagName: 'rect',
                selector: 'left',
            }
        ],
        zIndex: 1,
        attrs: {
            left: {
                x: 8,
                width: 30,
                height: 28,
                fillOpacity: 0,
                stroke: 'rgba(255,255,255,0)',
                magnet: true,
                fill: 'rgba(255,255,255,0)',
            }
        },
        position: 'portPosition'
    };
    groups[`group-right`] = {
        markup: [
            {
                tagName: 'rect',
                selector: 'right',
            }
        ],
        zIndex: 1,
        attrs: {
            right: {
                x: 131,
                width: 30,
                height: 28,
                fillOpacity: 0,
                stroke: 'rgba(255,255,255,0)',
                magnet: true,
                fill: 'rgba(255,255,255,0)',
            }
        },
        position: 'portPosition'
    };
    const items = [];
    field.forEach((f, i) => {
        const item_left = {
            id: `port-left-${f.propertyName}`,
            group: `group-left`
        };
        items.push(item_left);
        const item_right = {
            id: `port-right-${f.propertyName}`,
            group: `group-right`
        };
        items.push(item_right);
    });
    return { groups, items };
}