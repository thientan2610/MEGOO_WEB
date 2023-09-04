import { useState, useEffect } from "react";

function useGeolocation() {
  const [location, setLocation] = useState({
    loaded: false,
    coordinate: {
      lat: "",
      lng: "",
    },
  });
  const onSuccess = (location) => {
    setLocation({
      loaded: true,
      coordinate: {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      },
    });
  };

  const onError = (error) => {
    setLocation({
      loaded: true,
      error,
    });
  };

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      onError({
        code: 0,
        message: "Geolocation not supported",
      });
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, []);

  return location;
}

export default useGeolocation;
