namespace Wrapper {
  export interface ICoords {
    accuracy: null | number;
    altitude: null | number;
    altitudeAccuracy: null | number;
    heading: null | string;
    latitude: null | number;
    longitude: null | number;
    speed: null | number;
  }
  export class GeolocationPosition {
    timestamp = Date.now();
    constructor(public coords: ICoords) {
      console.log(
        window.location.host + " just tried to access your geolocation data"
      );
    }
  }
}
