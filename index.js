Object.defineProperty(navigator, "getBattery", {
  value: async () => new BatteryManager(),
  writable: false,
});

//#region Mocks
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
    this.addEventListener = () => {};
    console.log(
      window.location.host + " just tried to access your battery stats"
    );
  }
}
//#endregion Mocks
console.log("Injected script loaded");
