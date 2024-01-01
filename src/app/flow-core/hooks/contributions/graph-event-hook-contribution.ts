import { IHookContribution, IHooks } from '@/app/flow-core/hooks/interface';
import { Injectable, Injector } from '@angular/core';
import { Disposable, DisposableCollection } from '@/app/flow-core/common/disposable';
import { GraphProviderService } from '@/app/flow-core/services';
import { XFlowGraphCommands } from '@/app/flow-core/commands';
import { throttle } from '@/app/flow-core/common/util';

@Injectable({
  providedIn: 'root'
})
export class GraphEventHookContribution implements IHookContribution<IHooks> {
  constructor(public injector: Injector) {}
  registerHook = async (hooks: IHooks) => {
    const toDispose = new DisposableCollection();
    const disposables = [
      hooks.x6Events.registerHook({
        name: NsGraphEventPlugin.pluginId,
        handler: async args => {
          const { events } = await this.injector.get(GraphProviderService).getGraphOptions();
          events.forEach(event => {
            args.push(event);
          });
        }
      }),

      hooks.afterGraphInit.registerHook({
        name: NsGraphEventPlugin.pluginId,
        handler: async args => {
          const { commandService, modelService, graph } = args;
          /** 注册事件 */
          const todo = await hooks.x6Events.call([], async mergedEvents => {
            return mergedEvents.map(e => {
              const handler = handlerArgs => {
                e.callback(handlerArgs, commandService, modelService, graph);
              };
              graph.on(e.eventName, handler);
              return {
                dispose: () => {
                  graph.off(e.eventName, handler);
                }
              };
            });
          });
          toDispose.pushAll(todo);
        }
      }),

      hooks.afterGraphInit.registerHook({
        name: 'add auto resize event',
        handler: async args => {
          const { commandService, options, graph } = args;
          const resizeHandler = throttle(() => {
            commandService.executeCommand(XFlowGraphCommands.GRAPH_RESIZE.id, {});
          });

          window.addEventListener('resize', resizeHandler);

          const { rootContainer } = options;
          const resizeObserver = new ResizeObserver(() => graph.resize(rootContainer.clientWidth));
          rootContainer && resizeObserver.observe(rootContainer);

          toDispose.push(
            Disposable.create(() => {
              window.removeEventListener('resize', resizeHandler);
            })
          );
        }
      })
    ];
    toDispose.pushAll(disposables);
    return toDispose;
  };

  registerHookHub = async () => {
    return Disposable.create(() => {});
  };
}

export namespace NsGraphEventPlugin {
  export const pluginId = 'base-graph-events';
}
