// context/StoreContext.tsx
import React, { createContext, useContext, useReducer, ReactNode } from 'react'
import {Contribution} from "@/types";

interface State {
    history: Contribution[],
    account: string
}

type Action = { type: 'SET_ACCOUNT', payload: string } | { type: 'SAVE_DONATION', payload: {} };

const initialState: State = {
    history: [],
    account: ''
};

const reducer = (state: State, action: Action ): State => {
    switch (action.type) {
        case 'SET_ACCOUNT':
            return { ...state, account: action.payload };
        default:
            return state;
    }
};

interface StoreContextProps {
    state: State;
    dispatch: React.Dispatch<Action>;
}

const StoreContext = createContext<StoreContextProps | undefined>(undefined);

const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <StoreContext.Provider value={{ state, dispatch }}>
            {children}
        </StoreContext.Provider>
    );
};

const useStore = (): StoreContextProps => {
    const context = useContext(StoreContext);
    if (!context) {
        throw new Error('useStore must be used within a StoreProvider');
    }
    return context;
};

export { StoreProvider, useStore };
