import React from "react"
import { StyledForm } from "./StyledForm"
import { StepperFormItemMethods } from "./StepperForm"
import { IDynamicData } from "../api/IDynamicData"

/**
 * Stepper form child properties
 */
export interface StepperFormChildProps {
    /**
     * Child form ready callback
     * @param methods Methods
     */
    formReady?(methods: StepperFormItemMethods): void

    /**
     * Validate form
     * @param formData Form data
     */
    validateForm(formData: FormData): Promise<IDynamicData | null>
}

/**
 * Stepper form child component
 */
export const StepperFormChild: React.FunctionComponent<StepperFormChildProps> = (props) => {
    // Form ref
    const formRef = React.useRef<HTMLFormElement>(null)

    // Layout ready
    React.useEffect(() => {
        // Callback
        if(props.formReady) {
            props.formReady({
                /**
                 * Collect data
                 */
                async collectData() {
                    if(formRef.current) {
                        return await props.validateForm(new FormData(formRef.current))
                    }
    
                    return null
                }
            })
        }
    }, [props.formReady])

    return <StyledForm autoComplete="on" ref={formRef}>
        {props.children}
    </StyledForm>
}