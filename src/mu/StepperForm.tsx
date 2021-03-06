import React from 'react';
import {
    makeStyles,
    Stepper,
    Step,
    StepButton,
    Hidden,
    MobileStepper,
    Button,
    useTheme,
    Container,
    Theme
} from '@material-ui/core';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';
import { Prompt, useHistory } from 'react-router-dom';
import * as H from 'history';
import { DataTypes } from '@etsoo/shared';
import {
    NotificationReturn,
    NotificationMU,
    NotificationType,
    NotificationContainer
} from '@etsoo/notificationmu';

/**
 * Stepper form item properties
 */
export interface StepperFormItemProps {
    /**
     * Current form data
     */
    formData: DataTypes.DynamicData;

    /**
     * Child form ready callback
     * @param methods Methods
     */
    formReady?(methods: StepperFormItemMethods): void;
}

/**
 * Stepper form item ref methods
 */
export interface StepperFormItemMethods {
    /**
     * Collect form data
     */
    collectData(): Promise<DataTypes.DynamicData | null>;
}

/**
 * Stepper form action
 */
export enum StepperFormAction {
    Next,
    Previous,
    Submit
}

/**
 * Stepper form action callback
 */
export interface StepperFormActionCallback {
    (action: StepperFormAction): void;
}

/**
 * Stepper form item
 */
export interface StepperFormItem {
    /**
     * Step form
     */
    form: React.ComponentType<StepperFormItemProps>;

    /**
     * Label for the step
     */
    label: string;
}

/**
 * Stepper form properties
 */
export interface StepperFormProps {
    /**
     * Create buttons callback
     * @param callback Action callback
     * @param last 'true' for the last item, 'false' for the first item
     */
    buttons(
        callback: StepperFormActionCallback,
        last?: boolean
    ): React.ReactElement;

    /**
     * Max width
     */
    maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;

    /**
     * Padding
     */
    padding?: number;

    /**
     * Prompt for exit
     */
    promptForExit?: string;

    /**
     * Steps
     */
    steps: StepperFormItem[];

    /**
     * Submit handler
     * @param data Form data
     */
    submitHandler(data: DataTypes.DynamicData): void;
}

// Styles
const useStyles = makeStyles<Theme, { padding: number }>((theme) => ({
    root: {
        width: '100%'
    },
    formContainer: {
        flexGrow: 1,
        width: '100%'
    },
    paper: {
        padding: (props) => theme.spacing(props.padding)
    }
}));

/**
 * Stepper form
 * @param props Properties
 */
export function StepperForm(props: StepperFormProps) {
    // Destruct
    const {
        buttons,
        maxWidth,
        padding = 3,
        promptForExit,
        steps,
        submitHandler
    } = props;

    // Styles
    const classes = useStyles({ padding });
    const theme = useTheme();

    // Steps count
    const stepCount = steps.length;

    // Active step state
    const [activeStep, updateActiveStep] = React.useState(0);

    // Handler step click
    const handleStepClick = (step: number) => () => {
        updateActiveStep(step);
    };

    // Complted steps
    const [completedSteps] = React.useState(new Set<number>());

    // Check specific step is completed
    const isStepCompleted = (step: number) => completedSteps.has(step);

    // history
    const history = useHistory();

    // Prompt
    const [prompt, updatePrompt] = React.useState(true);

    // Form data
    const [formData] = React.useState<DataTypes.DynamicData>({});

    // Prompt for leave
    // return true for navigating
    // return false for silence
    // return a string for calling default promt command
    const promptHandler = (location: H.Location) => {
        if (promptForExit) {
            // Notifier UI defined
            if (history) {
                const onReturn: NotificationReturn<boolean> = (ok) => {
                    if (ok) {
                        // Update the prompt status
                        updatePrompt(false);

                        // Delayed push
                        window.setTimeout(() => {
                            history.push(location.pathname + location.search);
                        }, 50);
                    }
                };
                const action = new NotificationMU(
                    NotificationType.Confirm,
                    promptForExit
                );
                action.onReturn = onReturn;
                NotificationContainer.add(action);
                return false;
            }
            return promptForExit;
        }

        return true;
    };

    // Current form methods
    let currentMethods: StepperFormItemMethods | undefined;

    // Form ready callback
    const formReady = (methods: StepperFormItemMethods) => {
        currentMethods = methods;
    };

    // Update step data
    const updateStep = (data: DataTypes.DynamicData | null) => {
        if (data) {
            // Passed validataion and get the form data
            Object.assign(formData, data);

            // Set completed flag
            if (!completedSteps.has(activeStep)) {
                completedSteps.add(activeStep);
            }

            return true;
        }

        // Remove possible completed flag
        completedSteps.delete(activeStep);

        return false;
    };

    /**
     * Create button elements
     */
    const firstCase = activeStep === 0 ? false : undefined;
    const last = activeStep + 1 === stepCount ? true : firstCase;
    const buttonElements = React.useMemo(() => {
        const callback = (action: StepperFormAction) => {
            switch (action) {
                case StepperFormAction.Next:
                    if (currentMethods) {
                        currentMethods.collectData().then((data) => {
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
                        currentMethods.collectData().then((data) => {
                            // Update step data
                            if (updateStep(data)) {
                                // Check completion
                                const activeIndex = steps.findIndex(
                                    (_step, index) => !completedSteps.has(index)
                                );

                                // Active index found
                                if (activeIndex !== -1) {
                                    updateActiveStep(activeIndex);
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

    return (
        <div className={classes.root}>
            <Prompt when={prompt} message={promptHandler} />
            <Hidden xsDown>
                <Stepper activeStep={activeStep} alternativeLabel nonLinear>
                    {steps.map((step, index) => (
                        <Step key={step.label} completed={false}>
                            <StepButton
                                onClick={handleStepClick(index)}
                                completed={isStepCompleted(index)}
                            >
                                {step.label}
                            </StepButton>
                        </Step>
                    ))}
                </Stepper>
            </Hidden>
            <Hidden smUp>
                <MobileStepper
                    variant="text"
                    steps={steps.length}
                    position="static"
                    activeStep={activeStep}
                    className={classes.root}
                    nextButton={
                        <Button
                            size="small"
                            onClick={handleStepClick(activeStep + 1)}
                            disabled={activeStep === steps.length - 1}
                        >
                            Next
                            {theme.direction === 'rtl' ? (
                                <KeyboardArrowLeft />
                            ) : (
                                <KeyboardArrowRight />
                            )}
                        </Button>
                    }
                    backButton={
                        <Button
                            size="small"
                            onClick={handleStepClick(activeStep - 1)}
                            disabled={activeStep === 0}
                        >
                            {theme.direction === 'rtl' ? (
                                <KeyboardArrowRight />
                            ) : (
                                <KeyboardArrowLeft />
                            )}
                            Back
                        </Button>
                    }
                />
            </Hidden>
            <Container
                component="main"
                className={classes.paper}
                maxWidth={maxWidth == null ? false : maxWidth}
            >
                {steps.map((step, index) => {
                    const active = index === activeStep;
                    return (
                        // eslint-disable-next-line react/no-array-index-key
                        <div
                            key={index}
                            hidden={!active}
                            className={classes.formContainer}
                        >
                            {React.createElement(step.form, {
                                formData,
                                formReady: active ? formReady : undefined
                            })}
                        </div>
                    );
                })}
                {buttonElements}
            </Container>
        </div>
    );
}
