import { uuidv4 } from '@/app/models';

/**
 * 保存组件上的配置
 */
export class ExtensionRegistry {
  private instanceId: string;
  readonly extensions: any;
  readonly containerClassNames: Set<string> = new Set();

  constructor() {
    this.instanceId = uuidv4();
  }
}

/** 获取Xflow extension，用于收集组件的配置 */
export const createExtensionRegistry = () => {
  return new ExtensionRegistry();
};
