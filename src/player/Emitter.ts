export type Listener<T> = (event: T) => void;

/**
 * A simple pub/sub emitter
 */
export class Emitter<T> {
  private readonly listeners: Array<Listener<T>> = [];
  public emit(event: T) {
    this.listeners.forEach(listen => listen(event));
  }
  public on(listener: Listener<T>) {
    this.listeners.push(listener);
    return () => this.off(listener);
  }
  public off(listener: Listener<T>) {
    const index = this.listeners.indexOf(listener);
    if (index > -1) {
      this.listeners.splice(index, 1);
    }
  }
}
