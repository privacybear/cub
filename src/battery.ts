namespace Wrapper{
  export class BatteryManager {
    charging: boolean;
    chargingTime: number;
    dischargingTime: number;
    level: number;
    onchargingchange: any;
    onchargingtimechange: any;
    ondischargingtimechange: any;
    onlevelchange: any;
    protected addEventListener: EventListener;
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
  
}