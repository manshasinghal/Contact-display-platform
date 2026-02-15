import { useEffect, useState } from "react";
export const useDebouncedValue = (value, delayMs) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const timer = window.setTimeout(() => {
            setDebouncedValue(value);
        }, delayMs);
        return () => window.clearTimeout(timer);
    }, [value, delayMs]);
    return debouncedValue;
};
