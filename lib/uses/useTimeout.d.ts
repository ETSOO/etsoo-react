/**
 * For setTimeout to merge actions
 * @param action Action function
 * @param milliseconds Interval of milliseconds
 */
export declare const useTimeout: (action: Function, milliseconds: number) => {
    cancel: () => void;
};
