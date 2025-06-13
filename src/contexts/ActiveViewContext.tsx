import React, { createContext, useContext, useState, ReactNode } from 'react';

type ActiveViewType = 'chat' | 'suggested-friends';

interface ActiveViewContextType {
    activeView: ActiveViewType;
    setActiveView: (view: ActiveViewType) => void;
}

const ActiveViewContext = createContext<ActiveViewContextType | undefined>(undefined);

export const ActiveViewProvider = ({ children }: { children: ReactNode }) => {
    const [activeView, setActiveViewState] = useState<ActiveViewType>('suggested-friends');

    const setActiveView = (view: ActiveViewType) => {
        setActiveViewState(view);
    };

    return (
        <ActiveViewContext.Provider value={{ activeView, setActiveView }}>
            {children}
        </ActiveViewContext.Provider>
    );
};

export const useActiveView = () => {
    const context = useContext(ActiveViewContext);
    if (context === undefined) {
        throw new Error('useActiveView must be used within an ActiveViewProvider');
    }
    return context;
}; 
