import { useEffect, useState, useRef } from 'react';
import { serverURI } from './global-variables';

const useInterval = (callback, delay) => {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    const tick = () => {
      savedCallback.current();
    }

    if (delay) {
      const intervalId = setInterval(tick, delay);
      return () => clearInterval(intervalId);
    }
  }, [delay]);
}

const useMonitoredDestinationData = () => {
  const [destination, setDestination] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(serverURI + '/monitored-destination/get/all');
        if (!response.ok) {
          const err = new Error(`Something wrong occurred. Status: ${response.status}.`);
          err.status = response.status;
          throw err;
        }
  
        const { destination } = await response.json();
        setDestination(destination);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return { destination, error, loading };
}

const useAlertsData = (username) => {
  const [alert, setAlert] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(serverURI + `/${username}/alerts/get/all`);
        if (!response.ok) {
          const err = new Error(`Something wrong occurred. Status: ${response.status}.`);
          err.status = response.status;
          throw err;
        }

        const { alert } = await response.json();
        setAlert(alert);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  return { alert, error, loading };
}

const useProfileData = (username) => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(serverURI + `/${username}/profile/get`);
        if (!response.ok) {
          const err = new Error(`Something wrong occurred. Status: ${response.status}.`);
          err.status = response.status;
          throw err;
        }

        const { profile } = await response.json();
        setProfile(profile);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  return { profile, error, loading };
}

export { useInterval, useAlertsData, useMonitoredDestinationData, useProfileData };