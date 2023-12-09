import { NsModel } from '@/app/flow-core/interfaces/model.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { Disposable, DisposableCollection } from '@/app/flow-core/common/disposable';

export class RxModel<T = any> implements NsModel.IModel<T> {
  private subject$: BehaviorSubject<T | NsModel.EmptyType>;

  private toDispose = new DisposableCollection();

  constructor(initValue: T | NsModel.EmptyType = NsModel.EMPTY_VALUE) {
    this.subject$ = new BehaviorSubject<NsModel.EmptyType | T>(initValue || NsModel.EMPTY_VALUE);
    this.toDispose.push(
      Disposable.create(() => {
        this.subject$.complete();
        this.subject$.unsubscribe();
        this.subject$ = null;
      })
    );
  }

  async getValidValue(): Promise<T> {
    return this.getValue() as T;
  }

  getValue(): NsModel.EmptyType | T {
    return this.subject$.getValue();
  }

  hasValidValue(): boolean {
    const value = this.getValue();
    return NsModel.isValidValue<T>(value);
  }

  setValue: NsModel.ISetValue<T> = value => {
    this.subject$.next(value);
  };
  watch: NsModel.IWatch<T> = (
    cb: (value: T) => void,
    pipeFunction: (observable: Observable<T | NsModel.EmptyType>) => Observable<T> = NsModel.defaultPipeFunction
  ) => {
    const observable = pipeFunction ? pipeFunction(this.subject$) : this.subject$;
    const subscription = observable.subscribe(cb);
    return Disposable.create(() => {
      subscription.unsubscribe();
    });
  };

  dispose = () => {
    this.toDispose.dispose();
  };
}
