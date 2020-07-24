namespace Wrapper {
  export class GeolocationPosition {
    coords = {
      accuracy: 269309,
      altitude: null,
      altitudeAccuracy: null,
      heading: null,
      latitude: 51.085853,
      longitude: 10.377857,
      speed: null,
    };
    timestamp = Date.now();
    constructor() {
      console.log(
        window.location.host + " just tried to access your geolocation data"
      );
    }
  }
}
