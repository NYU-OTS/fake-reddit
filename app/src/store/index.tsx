import { routerReducer, RouterState } from 'react-router-redux';
import { combineReducers, Dispatch, Reducer } from 'redux';
import { ChatState } from './chat/types';
import { AdminState } from './admin/types';
import chatReducer from './chat/reducer';
import adminReducer from './admin/reducer';

export interface IAppState {
    admin: AdminState,
    chat: ChatState
}

export const rootReducer = combineReducers<IAppState>({
    admin: adminReducer,
    chat: chatReducer,
});