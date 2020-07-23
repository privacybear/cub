namespace Wrapper {

  Object.defineProperty(navigator, "getBattery", {
    value: async () => new BatteryManager(),
    writable: false,
  });

  console.log("Cub is loaded 🐾");
}