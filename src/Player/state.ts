export type Listener<T> = (event: T) => any;

export class State<T> {
  private listeners: Array<Listener<T>> = [];
  constructor(private value: T) {}

  public on(listener: Listener<T>, immediate = false): () => void {
    this.listeners.push(listener);
    if (immediate) {
      listener(this.value);
    }
    return () => this.off(listener);
  }

  public off(listener: Listener<T>): void {
    const index = this.listeners.indexOf(listener);
    if (index > -1) {
      this.listeners.splice(index, 1);
    }
  }

  public set(value: T): T {
    if (this.value !== value) {
      this.value = value;
      this.listeners.forEach(listener => listener(value));
    }
    return value;
  }

  public get(): T {
    return this.value;
  }
}
