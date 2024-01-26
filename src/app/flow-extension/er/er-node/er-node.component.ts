import { Component } from '@angular/core';

@Component({
  selector: 'app-er-node',
  templateUrl: './er-node.component.html',
  styleUrls: ['./er-node.component.less']
})
export class ErNodeComponent {
  entity: any = {
    entityName: '测试表',
    entityType: 'FACT',
    properties: []
  };
  entityProperties = [
    {
      propertyName: "姓名",
      propertyType: "string",
      isPK: true,
      isFK: false
    },
    {
      propertyName: "年龄",
      propertyType: "int",
      isPK: false,
      isFK: false
    },
    {
      propertyName: "性别",
      propertyType: "string",
      isPK: false,
      isFK: false
    },
    {
      propertyName: "身份",
      propertyType: "string",
      isPK: false,
      isFK: true
    },
    {
      propertyName: "性别",
      propertyType: "string",
      isPK: false,
      isFK: false
    },
    {
      propertyName: "性别",
      propertyType: "string",
      isPK: false,
      isFK: false
    },
    {
      propertyName: "性别",
      propertyType: "string",
      isPK: false,
      isFK: false
    },
    {
      propertyName: "性别",
      propertyType: "string",
      isPK: false,
      isFK: false
    },
    {
      propertyName: "性别",
      propertyType: "string",
      isPK: false,
      isFK: false
    },
  ]

  getCls() {
    if (this.entity?.entityType === 'FACT') {
      return 'fact'
    }
    if (this.entity?.entityType === 'DIM') {
      return 'dim'
    }
    if (this.entity?.entityType === 'OTHER') {
      return 'other'
    }
    return ''
  }
}
