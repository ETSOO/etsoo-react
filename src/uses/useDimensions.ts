import React from 'react';
import { Utils } from '../api/Utils';

/**
 * Calculate element dimensions
 * @param observeResize Is observing resize event
 */
export function useDimensions<E extends Element>(observeResize: boolean = false) {
    // References for a HTML elements passed to its 'ref' property
    const ref = React.useRef<E>(null);

    // Dimensions and update state
    const [dimensions, updateDimensions] = React.useState<DOMRect>();

    // Check for update
    const checkUpdate = () => {
        if (ref.current) {
            const newDimension = ref.current.getBoundingClientRect();
            if (!Utils.dimensionEqual(dimensions, newDimension)) {
                updateDimensions(newDimension);
            }
        }
    };

    // Calcuate when layout is ready
    React.useEffect(() => {
        // Update dimensions
        checkUpdate();

        // Resize event handler
        const resizeHandler = () => {
            checkUpdate();
        };

        // Add event listener when supported
        if (observeResize) {
            window.addEventListener('resize', resizeHandler);
        }

        return () => {
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
 * Calculate 2 elements dimensions
 * @param observeResize Is observing resize event
 */
export function useDimensions2<E1 extends Element, E2 extends Element>(
    observeResize: boolean = false
) {
    // References for a HTML elements passed to its 'ref' property
    const ref1 = React.useRef<E1>(null);
    const ref2 = React.useRef<E2>(null);

    // Dimensions and update state
    const [dimensions, updateDimensions] = React.useState<DOMRect[]>();

    // Dimensions
    const dimensions1 = dimensions == null ? undefined : dimensions[0];
    const dimensions2 = dimensions == null ? undefined : dimensions[1];

    // Check for update
    const checkUpdate = () => {
        if (ref1.current && ref2.current) {
            const d1 = ref1.current.getBoundingClientRect();
            const d2 = ref2.current.getBoundingClientRect();
            if (!Utils.dimensionEqual(dimensions1, d1) || !Utils.dimensionEqual(dimensions2, d2)) {
                updateDimensions([d1, d2]);
            }
        }
    };

    // Calcuate when layout is ready
    React.useEffect(() => {
        // Update dimensions
        checkUpdate();

        // Resize event handler
        const resizeHandler = () => {
            checkUpdate();
        };

        // Add event listener when supported
        if (observeResize) {
            window.addEventListener('resize', resizeHandler);
        }

        return () => {
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
