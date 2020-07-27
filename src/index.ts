namespace Wrapper {
  interface IConfig {
    items?: string[];
    location?: ICoords;
    webgl_fingerprint?: boolean;
    cookie?: string;
    referrer: string;
    battery?: IBattery;
  }
  export const config = {
    items: [`ITEMS_PLACEHOLDER`],
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
    battery: {
      level: 1,
    },
  } as IConfig;

  //#region BatteryAPI
  if (config.items.includes("BATTERY"))
    Object.defineProperty(navigator, "getBattery", {
      value: async () => new BatteryManager(),
      writable: false,
    });
  //#endregion BatteryAPI

  //#region GeolocationAPI
  if (config.items.includes("GEOLOCATION") && "geolocation" in navigator) {
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
  if (config.items.includes("REFERRER")) {
    Object.defineProperty(document, "referrer", {
      value: config.referrer,
      writable: false,
    });
  }
  //#endregion DocumentAPI

  //#region sendBeacon
  if (config.items.includes("BEACON")) {
    Object.defineProperty(navigator, "sendBeacon", {
      value: console.log,
      writable: true,
    });
  }
  //#endregion sendBeacon
  console.log("Cub is loaded 🐾");
}
