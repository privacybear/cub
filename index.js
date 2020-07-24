console.log("Injected script loaded");

//#region BatteryMock
Object.defineProperty(navigator, "getBattery", {
  value: async () => new BatteryManager(),
  writable: false,
});

class BatteryManager {
  constructor() {
    this.charging = true;
    this.chargingTime = 0;
    this.dischargingTime = Infinity;
    this.level = 1;
    this.onchargingchange = null;
    this.onchargingtimechange = null;
    this.ondischargingtimechange = null;
    this.onlevelchange = null;
    console.log(
      window.location.host + " just tried to access your battery stats"
    );
  }
  addEventListener() {}
}
//#endregion BatteryMock
//#region GeolocationMock
if ("geolocation" in navigator) {
  let geolocationWatchersCount = 0;

  Object.defineProperty(navigator.geolocation, "getCurrentPosition", {
    value: (func) => func(new GeolocationPosition()),
    writable: false,
  });

  Object.defineProperty(navigator.geolocation, "watchPosition", {
    value: (func) => {
      func(new GeolocationPosition());
      setTimeout(() => new GeolocationPosition(), 1000);
      return ++geolocationWatchersCount;
    },
    writable: false,
  });

  Object.defineProperty(navigator.geolocation, "clearWatch", {
    value: () => {},
    writable: false,
  });

  class GeolocationPosition {
    constructor() {
      this.coords = {
        accuracy: 269309,
        altitude: null,
        altitudeAccuracy: null,
        heading: null,
        latitude: 51.085853,
        longitude: 10.377857,
        speed: null,
      };
      this.timestamp = Date.now();
      console.log(
        window.location.host + " just tried to access your geolocation data"
      );
    }
  }
}
//#endregion GeolocationMock
