import { IClickAction } from '../api/IClickAction';
/**
 * Search page more fab properties
 */
export interface SearchPageMoreFabProps {
    /**
     * Actions
     */
    actions: IClickAction[];
}
/**
 * Search page more fab
 */
export declare function SearchPageMoreFab({ actions }: SearchPageMoreFabProps): JSX.Element;
