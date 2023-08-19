class DeferredPromise<T = any> {
  promise: Promise<T>;
  resolve!: (value: T) => void;
  reject!: (value: T) => void;

  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
}

export default DeferredPromise;
