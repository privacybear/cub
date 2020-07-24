namespace Wrapper {
  export interface IBattery {
    charging: boolean;
    chargingTime: number;
    dischargingTime: number;
    level: number;
  }
  export class BatteryManager {
    charging = config.battery.charging;
    chargingTime = config.battery.chargingTime;
    dischargingTime = config.battery.dischargingTime;
    level = config.battery.level;
    onchargingchange = null;
    onchargingtimechange = null;
    ondischargingtimechange = null;
    onlevelchange = null;
    constructor() {
      console.log(
        window.location.host + " just tried to access your battery stats"
      );
    }
    protected addEventListener() {}
  }
}
