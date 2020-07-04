import React from "react";
import { IState, IAction, IUpdate } from "./IState";
export declare function StateCreator<S extends IState, A extends IAction>(reducer: React.Reducer<S, A>, initState: S): {
    context: React.Context<IUpdate<S, A>>;
    provider: React.FunctionComponent<{}>;
};
