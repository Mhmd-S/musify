import { useEffect, useState, useCallback } from "react";
import isBrowser from "@utils/isBrowser";

type ResponsiveConfig = {
  [key: string]: number;
};

type ResponsiveInfo = {
  [key: string]: boolean;
};

// Default responsive configuration
const defaultResponsiveConfig: ResponsiveConfig = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
};

// Subscribers set to handle updates
const subscribers = new Set<() => void>();
let info: ResponsiveInfo = {};
let responsiveConfig: ResponsiveConfig = defaultResponsiveConfig;
let listening = false;

// Calculate the current responsive state based on window width
const calculate = () => {
  const width = window.innerWidth;
  const newInfo: ResponsiveInfo = {};
  let shouldUpdate = false;

  for (const key of Object.keys(responsiveConfig)) {
    newInfo[key] = width >= responsiveConfig[key];
    if (newInfo[key] !== info[key]) {
      shouldUpdate = true;
    }
  }

  if (shouldUpdate) {
    info = newInfo; // Update the global info
  }
};

// Handle window resize events
const handleResize = () => {
  const oldInfo = { ...info };
  calculate(); // Recalculate the responsive state
  if (JSON.stringify(oldInfo) === JSON.stringify(info)) return; // No change
  for (const subscriber of subscribers) {
    subscriber(); // Notify subscribers of the change
  }
};

// Function to configure responsive breakpoints
export const configResponsive = (config: ResponsiveConfig) => {
  responsiveConfig = config;
  calculate(); // Recalculate based on new config
};

// Custom hook for responsive design
export default function useResponsive() {
  const [state, setState] = useState<ResponsiveInfo>({});

  const subscriber = useCallback(() => {
    setState({ ...info }); // Update state when notified
  }, []);

  useEffect(() => {
    if (isBrowser && !listening) {
      calculate(); // Calculate initial responsive state
      window.addEventListener("resize", handleResize); // Listen for resize events
      listening = true;
    }

    // Set initial state on first render
    setState({ ...info });

    // Add subscriber to the set
    subscribers.add(subscriber);

    // Cleanup function to remove the subscriber and event listener
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0) {
        window.removeEventListener("resize", handleResize); // Clean up listener
        listening = false;
      }
    };
  }, [subscriber]);

  return { screenSize: state, isMobile: state.md === undefined ? false : !state.md }; // Return current screen size and isMobile flag
}
