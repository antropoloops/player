// TODO: abstract (LoadPending, LoadProgress, LoadReady, LoadError)
interface LoadPending {
  readonly stage: "pending";
}
interface LoadProgress<T> {
  readonly stage: "loading";
  readonly payload: T;
}
interface LoadReady<T> {
  readonly stage: "ready";
  readonly payload: T;
}
interface LoadError {
  readonly stage: "error";
  readonly error: any;
}

export type LoadStatus<Value, Progress> =
  | LoadPending
  | LoadProgress<Progress>
  | LoadReady<Value>
  | LoadError;
