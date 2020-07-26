# etsoo-react
ETSOO TypeScript React components NPM package developed by GarryXiao (https://dev.to/garryxiao)

# Components
- Form validation, '/uses/useFormValidator.ts', encapsulated from Yup (https://github.com/jquense/yup)
- API call, '/controllers/EntityController.ts', encapsulated from Axios (https://github.com/axios/axios)
- State, '/state/CreateState.tsx' for common React.createContext, '/state/LanguageState.ts' for i18n multiple languages, '/state/NotifierState.tsx' for global notifier, '/states/UserState.ts' for global user state
- Router, '/apps/PrivateRoute.tsx', encapsulated from ReactRouter (https://github.com/ReactTraining/react-router)
- Infinite list '/apps/InfiniteList.tsx' and table ('/mu/InfiniteTable.tsx'), encapsulated from react-window (https://github.com/bvaughn/react-window/) and react-window-infinite-loader (https://github.com/bvaughn/react-window-infinite-loader)

# Sample
It's a real and live project: https://github.com/garryxiao/mapleleaf

# Install
npm install etsoo-react