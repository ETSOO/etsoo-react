import React from "react";
import { StyledForm } from "./StyledForm";
/**
 * Stepper form child component
 */
export const StepperFormChild = (props) => {
    // Form ref
    const formRef = React.useRef(null);
    // Layout ready
    React.useEffect(() => {
        // Callback
        if (props.formReady) {
            props.formReady({
                /**
                 * Collect data
                 */
                async collectData() {
                    if (formRef.current) {
                        return await props.validateForm(new FormData(formRef.current));
                    }
                    return null;
                }
            });
        }
    }, [props.formReady]);
    return React.createElement(StyledForm, { autoComplete: "on", ref: formRef }, props.children);
};
