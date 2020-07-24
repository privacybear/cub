namespace Wrapper {
  interface IConfig {
    location?: ICoords;
    webgl_fingerprint?: boolean;
    cookie?: string;
    referrer: string;
    battery?: IBattery;
  }
  export const config = {
    location: {
      accuracy: 269309,
      altitude: null,
      altitudeAccuracy: null,
      heading: null,
      latitude: 51.085853,
      longitude: 10.377857,
      speed: null,
    },
    webgl_fingerprint: false,
    cookie: "",
    referrer: "",
    battery: {},
  } as IConfig;
  //#region BatteryAPI
  if (config.battery != null)
    Object.defineProperty(navigator, "getBattery", {
      value: async () => new BatteryManager(),
      writable: false,
    });
  //#endregion BatteryAPI

  //#region GeolocationAPI
  if (config.location != null && "geolocation" in navigator) {
    let geolocationWatchersCount = 0;

    Object.defineProperty(navigator.geolocation, "getCurrentPosition", {
      value: (func) => func(new GeolocationPosition(config.location)),
      writable: false,
    });

    Object.defineProperty(navigator.geolocation, "watchPosition", {
      value: (func) => {
        func(new GeolocationPosition(config.location));
        setTimeout(() => new GeolocationPosition(config.location), 1000);
        return ++geolocationWatchersCount;
      },
      writable: false,
    });

    Object.defineProperty(navigator.geolocation, "clearWatch", {
      value: () => {},
      writable: false,
    });
  }
  //#endregion GeolocationAPI

  //#region DocumentAPI
  if (config.referrer != null) {
    Object.defineProperty(document, "referrer", {
      value: config.referrer,
      writable: false,
    });
  }
  if (config.cookie != null) {
    Object.defineProperty(document, "cookie", {
      value: config.cookie,
      writable: false,
    });
  }
  //#endregion DocumentAPI
  console.log("Cub is loaded 🐾");
}
