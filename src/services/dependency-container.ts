export default class DependencyContainer {
  private static instance: DependencyContainer;
  private services: { [key: string]: any } = {};

  private constructor() {}

  static getInstance(): DependencyContainer {
    if (!DependencyContainer.instance) {
      DependencyContainer.instance = new DependencyContainer();
    }
    return DependencyContainer.instance;
  }

  register(key: string, service: any): void {
    this.services[key] = service;
  }

  resolve(key: string): any {
    if (!(key in this.services)) {
      throw new Error(`Service "${key}" is not registered.`);
    }

    return this.services[key];
  }
}
