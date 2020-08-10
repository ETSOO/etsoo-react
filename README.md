# etsoo-react

**ETSOO TypeScript React components NPM package for SmartERP SaaS integration developed by GarryXiao (https://dev.to/garryxiao)**

ESLint + AirbnbBase + Prettier, Jest(ts-jest) applied. About how to build a NPM package and CI/CD with Github action: https://dev.to/garryxiao/build-a-react-components-npm-package-and-ci-cd-with-github-action-1jm6

## Installing

Using npm:

```bash
$ npm install etsoo-react
```

Using yarn:

```bash
$ yarn add etsoo-react
```

## Structure

### api - APIs related

### apps - Application level components

-   InfiniteGrid and InfiniteList - encapsulated from react-window (https://github.com/bvaughn/react-window/) and react-window-infinite-loader (https://github.com/bvaughn/react-window-infinite-loader)
-   PrivateRoute - Login only router, encapsulated from ReactRouter (https://github.com/ReactTraining/react-router).

### bridges - Work with Electron

### controllers - SmartERP related REST APIs

-   CustomerController - Customer entity API controller.
-   CustomerLoginController - Customer entity login related API controller.
-   EntityController - Common entity API controller.
-   UserController - User entity API controller.
-   UserLoginController - User entity login related API controller.

### models - SmartERP related data models

### mu - Custom Material-UI component

-   NotifierUI - Notifier state UI display.
-   SearchPage - Common search page.
-   StepperForm - Extends from Stepper for multiple steps form.

### states - Custom React Context

-   CreateState - Common Context State creator.
-   LanguageState - Language labels, simple i18n solution.
-   NotifierState - Notifier state.
-   UserState - User state.

### uses - Custom React hooks

-   useDimensions, useDimensions1 - Calculate element dimensions.
-   useFormValidator - Form validation, encapsulated from Yup (https://github.com/jquense/yup)
-   useTimeout - For window.setTimeout to merge actions.

### views - SmartERP related data views

-   IViewFactory - View data transform factory.
-   LoginResultData - Login result data.
-   RawResult - Raw operation JSON result.

## Sample

It's a real and live project: https://github.com/garryxiao/mapleleaf.

## License

[MIT](LICENSE)
