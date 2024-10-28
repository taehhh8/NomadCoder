interface IStorage<T> {
    setItem(key: string, value: T): void;
    getItem(key: string): T | null;
    removeItem(key: string): void;
    clear(): void;
  }
  
  abstract class SimpleStorage<T> implements IStorage<T> {
    protected items: { [key: string]: T } = {};
  
    abstract setItem(key: string, value: T): void;
    abstract getItem(key: string): T | null;
    abstract removeItem(key: string): void;
    abstract clear(): void;
  }
  
  class SimpleLocalStorage<T> extends SimpleStorage<T> {
    setItem(key: string, value: T): void {
      this.items[key] = value;
    }
  
    getItem(key: string): T | null {
      return this.items[key] || null;
    }
  
    removeItem(key: string): void {
      delete this.items[key];
    }
  
    clear(): void {
      this.items = {};
    }
  }
  
  // SimpleLocalStorage 인스턴스 생성
  const localStorage = new SimpleLocalStorage<string>();
  
  // 사용 예시
  localStorage.setItem("username", "John");
  console.log(localStorage.getItem("username"));  // "John"
  localStorage.removeItem("username");
  console.log(localStorage.getItem("username"));  // null
  localStorage.clear();

  interface SuccessCallback {
    (position: GeolocationPosition): void;
  }
  
  interface ErrorCallback {
    (error: GeolocationPositionError): void;
  }
  
  abstract class SimpleGeolocation<T> {
    abstract getCurrentPosition(successFn: SuccessCallback): void;
    abstract getCurrentPosition(successFn: SuccessCallback, errorFn: ErrorCallback): void;
    abstract getCurrentPosition(successFn: SuccessCallback, errorFn: ErrorCallback, optionsObj: PositionOptions): void;
  
    abstract watchPosition(success: SuccessCallback): T;
    abstract watchPosition(success: SuccessCallback, error: ErrorCallback): T;
    abstract watchPosition(success: SuccessCallback, error: ErrorCallback, options: PositionOptions): T;
  
    abstract clearWatch(id: T): void;
  }
  
  class BrowserGeolocation extends SimpleGeolocation<number> {
    getCurrentPosition(successFn: SuccessCallback, errorFn?: ErrorCallback, optionsObj?: PositionOptions): void {
      navigator.geolocation.getCurrentPosition(successFn, errorFn, optionsObj);
    }
  
    watchPosition(success: SuccessCallback, error?: ErrorCallback, options?: PositionOptions): number {
      return navigator.geolocation.watchPosition(success, error, options);
    }
  
    clearWatch(id: number): void {
      navigator.geolocation.clearWatch(id);
    }
  }
  
  // 사용 예시
  const geolocation = new BrowserGeolocation();
  
  // getCurrentPosition 사용
  geolocation.getCurrentPosition((position) => {
    console.log(position.coords.latitude, position.coords.longitude);
  });
  
  geolocation.getCurrentPosition(
    (position) => console.log(position),
    (error) => console.error(error)
  );
  
  geolocation.getCurrentPosition(
    (position) => console.log(position),
    (error) => console.error(error),
    { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
  );
  
  // watchPosition 사용
  const watchId1 = geolocation.watchPosition((position) => {
    console.log(position.coords.latitude, position.coords.longitude);
  });
  
  const watchId2 = geolocation.watchPosition(
    (position) => console.log(position),
    (error) => console.error(error)
  );
  
  const watchId3 = geolocation.watchPosition(
    (position) => console.log(position),
    (error) => console.error(error),
    { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
  );
  
  // clearWatch 사용
  geolocation.clearWatch(watchId1);