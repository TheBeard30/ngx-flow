import { ISchema } from '@/app/flow-extension/editor-panel/interface';
import { group } from '@angular/animations';

export const defaultFormSchemaService = async args => {
  const { targetType } = args;
  const isGroup = args.targetData?.isGroup;

  const groupSchema: ISchema = {
    tabs: [
      {
        name: '设置',
        groups: [
          {
            name: 'groupName',
            controls: [
              {
                label: '分组名',
                name: 'group-service',
                shape: 'group-service',
                placeholder: '分组名称'
              }
            ]
          }
        ]
      }
    ]
  };

  const nodeSchema: ISchema = {
    tabs: [
      {
        name: '设置',
        groups: [
          {
            name: 'groupName',
            controls: [
              {
                label: '节点名',
                name: 'node-service',
                shape: 'node-service',
                placeholder: '节点名称'
              }
            ]
          }
        ]
      }
    ]
  };
  const edgeSchema: ISchema = {
    tabs: [
      {
        name: '设置',
        groups: [
          {
            name: 'groupName',
            controls: [
              {
                label: '边',
                name: 'edge-service',
                shape: 'edge-service',
                placeholder: '边名称'
              }
            ]
          }
        ]
      }
    ]
  };
  const erSchema: ISchema = {
    tabs: [
      {
        name: '设置',
        groups: [
          {
            name: 'groupName',
            controls: [
              {
                label: '表名',
                name: 'er-service',
                shape: 'er-service',
                placeholder: '表名称'
              }
            ]
          }
        ]
      }
    ]
  }

  if (isGroup) {
    return groupSchema;
  }

  if (targetType === 'node') {
    return nodeSchema;
  }

  if (targetType === 'edge') {
    return edgeSchema;
  }
  if (targetType === 'er') {
    return erSchema;
  }
  return {
    tabs: [
      {
        name: '设置',
        groups: [
          {
            name: 'groupName',
            controls: [
              {
                label: '',
                name: 'canvas-service',
                shape: 'canvas-service'
              }
            ]
          }
        ]
      }
    ]
  };
};
