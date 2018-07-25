import { LOGIN } from './actions';

export interface MyState {
    email: string;
    password: string;
    tasks: any;
}

export const INITIAL_STATE: MyState = {
    email: "default",
    password: "default",
    tasks: []
}

export function rootReducer(state: MyState, action): MyState{
    switch (action.type){
        case LOGIN: return { email: action.email, password: action.password, tasks:action.tasks };
    }
    return state;
}