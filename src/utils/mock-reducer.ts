import { Action } from 'redux';

export const extractActionsTypes = (actions: Action<string>[]) => actions.map(({ type }) => type).sort().reverse();
