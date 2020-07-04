import { Align } from "../api/Align";
import { Utils } from "../api/Utils";
/**
 * From enum to string
 * @param align Align
 */
export const searchLayoutAlign = (align) => {
    if (align) {
        if (align == Align.Left)
            return 'left';
        else if (align == Align.Center)
            return 'center';
        else
            return 'right';
    }
    else {
        return undefined;
    }
};
/**
 * Format layouts
 * @param layouts Layouts
 * @param callback Callback
 * @param firstOnly First letter only
 */
export const searchLayoutFormat = (layouts, callback = undefined, firstOnly = false) => {
    layouts.forEach(c => {
        // Callback
        let label = callback ? callback(c.field) : c.label;
        if (label == null) {
            // Default format
            label = Utils.snakeNameToWord(c.field, firstOnly);
        }
        // Update
        Object.assign(c, { label });
    });
};