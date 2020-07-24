var Wrapper;
(function (Wrapper) {
    class BatteryManager {
        constructor() {
            this.charging = Wrapper.config.battery.charging;
            this.chargingTime = Wrapper.config.battery.chargingTime;
            this.dischargingTime = Wrapper.config.battery.dischargingTime;
            this.level = Wrapper.config.battery.level;
            this.onchargingchange = null;
            this.onchargingtimechange = null;
            this.ondischargingtimechange = null;
            this.onlevelchange = null;
            console.log(`${window.location.host} just tried to access your battery stats`);
        }
        addEventListener() { }
    }
    Wrapper.BatteryManager = BatteryManager;
})(Wrapper || (Wrapper = {}));
var Wrapper;
(function (Wrapper) {
    class GeolocationPosition {
        constructor(coords) {
            this.coords = coords;
            this.timestamp = Date.now();
            console.log(window.location.host + " just tried to access your geolocation data");
        }
    }
    Wrapper.GeolocationPosition = GeolocationPosition;
})(Wrapper || (Wrapper = {}));
var Wrapper;
(function (Wrapper) {
    Wrapper.config = {
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
    };
    //#region BatteryAPI
    if (Wrapper.config.battery != null)
        Object.defineProperty(navigator, "getBattery", {
            value: async () => new Wrapper.BatteryManager(),
            writable: false,
        });
    //#endregion BatteryAPI
    //#region GeolocationAPI
    if (Wrapper.config.location != null && "geolocation" in navigator) {
        let geolocationWatchersCount = 0;
        Object.defineProperty(navigator.geolocation, "getCurrentPosition", {
            value: (func) => func(new Wrapper.GeolocationPosition(Wrapper.config.location)),
            writable: false,
        });
        Object.defineProperty(navigator.geolocation, "watchPosition", {
            value: (func) => {
                func(new Wrapper.GeolocationPosition(Wrapper.config.location));
                setTimeout(() => new Wrapper.GeolocationPosition(Wrapper.config.location), 1000);
                return ++geolocationWatchersCount;
            },
            writable: false,
        });
        Object.defineProperty(navigator.geolocation, "clearWatch", {
            value: () => { },
            writable: false,
        });
    }
    //#endregion GeolocationAPI
    //#region DocumentAPI
    if (Wrapper.config.referrer != null) {
        Object.defineProperty(document, "referrer", {
            value: Wrapper.config.referrer,
            writable: false,
        });
    }
    if (Wrapper.config.cookie != null) {
        Object.defineProperty(document, "cookie", {
            value: Wrapper.config.cookie,
            writable: false,
        });
    }
    //#endregion DocumentAPI
    console.log("Cub is loaded 🐾");
})(Wrapper || (Wrapper = {}));
