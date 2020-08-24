import React from 'react';
import { DomUtils } from '@etsoo/shared';

/**
 * Calculate element dimensions watch
 */
export interface useDimensionsWatch {
    /**
     * Check callback
     */
    (dimensions: DOMRect): boolean;
}

/**
 * Calculate element dimensions
 * @param observeResize Is observing resize event
 */
export function useDimensions<E extends Element>(
    observeResize: boolean = false,
    watch?: useDimensionsWatch
) {
    // References for a HTML elements passed to its 'ref' property
    const ref = React.useRef<E>(null);

    // Dimensions and update state
    const [dimensions, updateDimensions] = React.useState<DOMRect>();

    // Resize event timeout seed
    // Readonly object data, hold Class similar properties
    const [data] = React.useState<{ seed: number }>({ seed: 0 });

    // Clear resize timeout
    function clearResizeTimeout() {
        if (data.seed > 0) {
            window.clearTimeout(data.seed);
            data.seed = 0;
        }
    }

    // Setup resize timeout
    function setResizeTimeout(handler: TimerHandler) {
        // Clear first
        clearResizeTimeout();

        // Start a new timeout
        data.seed = window.setTimeout(handler, 250);
    }

    // Check for update
    const checkUpdate = () => {
        if (ref.current) {
            const d = ref.current.getBoundingClientRect();
            if (!DomUtils.dimensionEqual(dimensions, d)) {
                if (watch && watch(d) === false) {
                    // Return false from watch will setTimeout for later update
                    setResizeTimeout(checkUpdate);
                } else {
                    updateDimensions(d);
                }
            }
        }
    };

    // Calcuate when layout is ready
    React.useEffect(() => {
        // Init update dimensions
        checkUpdate();

        // Resize event handler
        const resizeHandler = () => {
            setResizeTimeout(checkUpdate);
        };

        // Add event listener when supported
        if (observeResize) {
            window.addEventListener('resize', resizeHandler);
        }

        return () => {
            // Clear timeout
            clearResizeTimeout();

            // Remove the event listener
            if (observeResize) {
                window.removeEventListener('resize', resizeHandler);
            }
        };
    }, []);

    // Return
    return {
        ref,
        dimensions
    };
}

/**
 * Calculate 2 elements dimensions watch
 */
export interface useDimensions2Watch {
    /**
     * Check callback
     */
    (dimensions1: DOMRect, dimensions2: DOMRect): boolean;
}

/**
 * Calculate 2 elements dimensions
 * @param observeResize Is observing resize event
 */
export function useDimensions2<E1 extends Element, E2 extends Element>(
    observeResize: boolean = false,
    watch?: useDimensions2Watch
) {
    // References for a HTML elements passed to its 'ref' property
    const ref1 = React.useRef<E1>(null);
    const ref2 = React.useRef<E2>(null);

    // Dimensions and update state
    const [dimensions, updateDimensions] = React.useState<DOMRect[]>();

    // Dimensions
    const dimensions1 = dimensions == null ? undefined : dimensions[0];
    const dimensions2 = dimensions == null ? undefined : dimensions[1];

    // Resize event timeout seed
    const [data] = React.useState<{ seed: number }>({ seed: 0 });

    // Clear resize timeout
    function clearResizeTimeout() {
        if (data.seed > 0) {
            window.clearTimeout(data.seed);
            data.seed = 0;
        }
    }

    // Setup resize timeout
    function setResizeTimeout(handler: TimerHandler) {
        // Clear first
        clearResizeTimeout();

        // Start a new timeout
        data.seed = window.setTimeout(handler, 250);
    }

    // Check for update
    const checkUpdate = () => {
        if (ref1.current && ref2.current) {
            const d1 = ref1.current.getBoundingClientRect();
            const d2 = ref2.current.getBoundingClientRect();
            if (
                !DomUtils.dimensionEqual(dimensions1, d1) ||
                !DomUtils.dimensionEqual(dimensions2, d2)
            ) {
                if (watch && watch(d1, d2) === false) {
                    setResizeTimeout(checkUpdate);
                } else {
                    updateDimensions([d1, d2]);
                }
            }
        }
    };

    // Calcuate when layout is ready
    React.useEffect(() => {
        // Init update dimensions
        checkUpdate();

        // Resize event handler
        const resizeHandler = () => {
            setResizeTimeout(checkUpdate);
        };

        // Add event listener when supported
        if (observeResize) {
            window.addEventListener('resize', resizeHandler);
        }

        return () => {
            // Clear timeout
            clearResizeTimeout();

            // Remove the event listener
            if (observeResize) {
                window.removeEventListener('resize', resizeHandler);
            }
        };
    }, [ref1.current, ref2.current]);

    // Return
    return {
        ref1,
        ref2,
        dimensions1,
        dimensions2
    };
}
