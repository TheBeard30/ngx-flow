export interface Disposable {
  dispose: () => void;
}

export namespace Disposable {
  export function create(func: () => void): Disposable {
    return {
      dispose: func
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  export const NULL = create(() => {});
}

export class DisposableCollection implements Disposable {
  protected readonly disposables: Disposable[] = [];

  constructor(...toDispose: Disposable[]) {
    toDispose.forEach(d => this.push(d));
  }

  push(disposable: Disposable): Disposable {
    const { disposables } = this;
    disposables.push(disposable);
    const originalDispose = disposable.dispose.bind(disposable);
    const toRemove = Disposable.create(() => {
      const index = disposables.indexOf(disposable);
      if (index !== -1) {
        disposables.splice(index, 1);
      }
    });
    disposable.dispose = () => {
      toRemove.dispose();
      originalDispose();
    };
    return toRemove;
  }
  dispose(): void {
    if (this.disposed) {
      return;
    }
    while (!this.disposed) {
      try {
        const d = this.disposables.pop();
        d!.dispose();
      } catch (e) {
        console.error(e);
      }
    }
  }

  get disposed(): boolean {
    return this.disposables.length === 0;
  }

  pushAll(disposables: Disposable[]): Disposable[] {
    return disposables.map(disposable => this.push(disposable));
  }
}
