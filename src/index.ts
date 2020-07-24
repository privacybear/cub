namespace Wrapper {
  //#region BatteryAPI
  Object.defineProperty(navigator, "getBattery", {
    value: async () => new BatteryManager(),
    writable: false,
  });
  //#endregion BatteryAPI

  //#region GeolocationAPI
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
  }
  //#endregion GeolocationAPI

  console.log("Cub is loaded 🐾");
}
