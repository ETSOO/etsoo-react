import React from "react";
/**
 * Calculate element dimensions
 * @param observeResize Is observing resize event
 */
export declare function useDimensions<E extends Element>(observeResize?: boolean): {
    ref: React.RefObject<E>;
    dimensions: DOMRect | undefined;
};
/**
 * Calculate 2 elements dimensions
 * @param observeResize Is observing resize event
 */
export declare function useDimensions2<E1 extends Element, E2 extends Element>(observeResize?: boolean): {
    ref1: React.RefObject<E1>;
    ref2: React.RefObject<E2>;
    dimensions1: DOMRect | undefined;
    dimensions2: DOMRect | undefined;
};
