import { GraphProviderService } from '@/app/flow-core/services';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-er',
  templateUrl: './er.component.html',
  styleUrls: ['./er.component.less'],
})
export class ErComponent implements AfterViewInit {
  graphData;
  graphStatus = 'NORMAL';

  //暂时将数据写死
  entity: any = {
    entityName: '测试表',
    entityType: 'FACT',
    entityProperties: [
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
      }
    ]
  };
  //数据源 暂时写死
  dataSource: Map<string, any[]> = new Map<string, any>([
    ['MySql', [{
      entityName: 'T_MYSQL_TEST_1',
      entityType: 'FACT',
      entityProperties: [
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
        }
      ]
    }]],
    ['Oracle', [{
      entityName: 'T_ORACLE_TEST_1',
      entityType: 'FACT',
      entityProperties: [
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
        }
      ]
    },
    {
      entityName: 'T_ORACLE_TEST_22',
      entityType: 'FACT',
      entityProperties: [
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
        }
      ]
    }]],
    ['SqlServe', [{
      entityName: 'T_SQLSERVER_TEST_1',
      entityType: 'FACT',
      entityProperties: [
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
        }
      ]
    },
    {
      entityName: 'T_SQLSERVER_TEST_22',
      entityType: 'FACT',
      entityProperties: [
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
        }
      ]
    },
    {
      entityName: 'T_SQLSERVER_TEST_333',
      entityType: 'FACT',
      entityProperties: [
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
        }
      ]
    }]]
  ]);
  dataSourceType = 'MySql';
  dataSourceMenu = Array.from(this.dataSource.keys());

  constructor(private graphProvider: GraphProviderService) { }

  ngAfterViewInit(): void {
    setTimeout(async () => {
      const graph = await this.graphProvider.getGraphInstance();
      graph.disposePlugins('transform');
    });
  }

  onload = app => {
    console.log('flow app>>>', app);
  };


  changeGraphStatus(status: string) {
    this.graphStatus = status;
  }
  changeDataSource(dataSource: string) {
    this.dataSourceType = dataSource;
  }
}
