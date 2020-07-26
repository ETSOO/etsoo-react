import React from 'react';
import { StyledForm } from './StyledForm';
/**
 * Stepper form child component
 */
export const StepperFormChild = (props) => {
    // Destruct
    const { children, formReady } = props;
    // Form ref
    const formRef = React.useRef(null);
    // Layout ready
    React.useEffect(() => {
        // Callback
        if (formReady) {
            formReady({
                /**
                 * Collect data
                 */
                async collectData() {
                    if (formRef.current) {
                        const result = await props.validateForm(new FormData(formRef.current));
                        return result;
                    }
                    return null;
                }
            });
        }
    }, [formReady]);
    return (React.createElement(StyledForm, { autoComplete: "on", ref: formRef }, children));
};
