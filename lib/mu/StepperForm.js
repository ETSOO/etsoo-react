import React from "react";
import { makeStyles, Stepper, Step, StepButton, Hidden, MobileStepper, Button, useTheme, Container } from "@material-ui/core";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@material-ui/icons";
import { Prompt, useHistory } from "react-router-dom";
import { NotifierContext } from "./NotifierUI";
import { NotifierActionType } from "../states/NotifierState";
/**
 * Stepper form action
 */
export var StepperFormAction;
(function (StepperFormAction) {
    StepperFormAction[StepperFormAction["Next"] = 0] = "Next";
    StepperFormAction[StepperFormAction["Previous"] = 1] = "Previous";
    StepperFormAction[StepperFormAction["Submit"] = 2] = "Submit";
})(StepperFormAction || (StepperFormAction = {}));
// Styles
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%'
    },
    formContainer: {
        flexGrow: 1,
        width: '100%'
    },
    paper: {
        padding: props => theme.spacing(props.padding == null ? 3 : props.padding),
    }
}));
/**
 * Stepper form
 * @param props Properties
 */
export function StepperForm({ buttons, maxWidth, padding, promptForExit, steps, submitHandler }) {
    // Styles
    const classes = useStyles({ padding });
    const theme = useTheme();
    // Steps count
    const stepCount = steps.length;
    // Active step state
    const [activeStep, updateActiveStep] = React.useState(0);
    // Handler step click
    const handleStepClick = (step) => () => {
        updateActiveStep(step);
    };
    // Complted steps
    const [completedSteps] = React.useState(new Set());
    // Check specific step is completed
    const isStepCompleted = (step) => {
        return completedSteps.has(step);
    };
    // Notifier
    const notifierUpdate = React.useContext(NotifierContext);
    // history
    const history = useHistory();
    // Prompt
    const [prompt, updatePrompt] = React.useState(true);
    // Form data
    const [formData] = React.useState({});
    // Prompt for leave
    // return true for navigating
    // return false for silence
    // return a string for calling default promt command
    const promptHandler = (location) => {
        if (promptForExit) {
            // Notifier UI defined
            if (history && notifierUpdate) {
                const action = { type: NotifierActionType.Confirm, title: undefined, message: promptForExit, callback: (ok) => {
                        if (ok) {
                            // Update the prompt status
                            updatePrompt(false);
                            // Delayed push
                            window.setTimeout(() => {
                                history.push(location.pathname + location.search);
                            }, 50);
                        }
                    } };
                notifierUpdate.dispatch(action);
                return false;
            }
            else {
                return promptForExit;
            }
        }
        return true;
    };
    // Current form methods
    let currentMethods = undefined;
    // Form ready callback
    const formReady = (methods) => {
        currentMethods = methods;
    };
    // Update step data
    const updateStep = (data) => {
        if (data) {
            // Passed validataion and get the form data
            Object.assign(formData, data);
            // Set completed flag
            if (!completedSteps.has(activeStep))
                completedSteps.add(activeStep);
            return true;
        }
        else {
            // Remove possible completed flag
            completedSteps.delete(activeStep);
            return false;
        }
    };
    /**
     * Create button elements
     */
    const last = (activeStep + 1 === stepCount) ? true : (activeStep === 0 ? false : undefined);
    const buttonElements = React.useMemo(() => {
        const callback = (action) => {
            switch (action) {
                case StepperFormAction.Next:
                    if (currentMethods) {
                        currentMethods.collectData().then(data => {
                            // Update step data
                            if (updateStep(data)) {
                                // Next page
                                updateActiveStep(activeStep + 1);
                            }
                        });
                    }
                    break;
                case StepperFormAction.Previous:
                    updateActiveStep(activeStep - 1);
                    break;
                default:
                    if (currentMethods) {
                        currentMethods.collectData().then(data => {
                            // Update step data
                            if (updateStep(data)) {
                                // Check completion
                                for (let index = 0; index < steps.length; index++) {
                                    if (!completedSteps.has(index)) {
                                        updateActiveStep(index);
                                        // Break totally
                                        return;
                                    }
                                }
                                // Submit data
                                submitHandler(formData);
                            }
                        });
                    }
                    break;
            }
        };
        return buttons(callback, last);
    }, [last]);
    return (React.createElement("div", { className: classes.root },
        React.createElement(Prompt, { when: prompt, message: promptHandler }),
        React.createElement(Hidden, { xsDown: true },
            React.createElement(Stepper, { activeStep: activeStep, alternativeLabel: true, nonLinear: true }, steps.map((step, index) => (React.createElement(Step, { key: step.label, completed: false },
                React.createElement(StepButton, { onClick: handleStepClick(index), completed: isStepCompleted(index) }, step.label)))))),
        React.createElement(Hidden, { smUp: true },
            React.createElement(MobileStepper, { variant: "text", steps: steps.length, position: "static", activeStep: activeStep, className: classes.root, nextButton: React.createElement(Button, { size: "small", onClick: handleStepClick(activeStep + 1), disabled: activeStep === (steps.length - 1) },
                    "Next",
                    theme.direction === 'rtl' ? React.createElement(KeyboardArrowLeft, null) : React.createElement(KeyboardArrowRight, null)), backButton: React.createElement(Button, { size: "small", onClick: handleStepClick(activeStep - 1), disabled: activeStep === 0 },
                    theme.direction === 'rtl' ? React.createElement(KeyboardArrowRight, null) : React.createElement(KeyboardArrowLeft, null),
                    "Back") })),
        React.createElement(Container, { component: "main", className: classes.paper, maxWidth: maxWidth == null ? false : maxWidth },
            steps.map((step, index) => {
                const active = (index === activeStep);
                return React.createElement("div", { key: index, hidden: !active, className: classes.formContainer }, React.createElement(step.form, { formData, formReady: (active ? formReady : undefined) }));
            }),
            buttonElements)));
}
