import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AddifectEdition } from '../App';

// 1. Define types for state and context

interface HomeContextType {
    userData: {
        name: string;
        url: string;
        capable: '1' | '2' | '3' | '4'
    };
    postTypes: { id: string, label: string, type: 'post' | 'page' | 'record' }[]
    handleApiError: (error: any) => void;
    setEditor: React.Dispatch<React.SetStateAction<null | { type: string; id?: string }>>;
    edition: AddifectEdition,
    setEdition: React.Dispatch<React.SetStateAction<AddifectEdition>>;
}

// 2. Create the Context with a default value of `undefined`
const HomeContext = createContext<HomeContextType | undefined>(undefined);

// 3. Define the provider's props
interface HomeProviderProps {
    children: ReactNode;
    userData: {
        name: string;
        url: string;
        capable?: '1' | '2' | '3' | '4'
    };
    setEditor: React.Dispatch<React.SetStateAction<null | { type: string; id?: string }>>;
    edition: AddifectEdition,
    setEdition: React.Dispatch<React.SetStateAction<AddifectEdition>>;
}

// 4. Create the Provider Component
export const HomeProvider: React.FC<HomeProviderProps> = (
    {
        children,
        userData,
        setEditor,
        edition,
        setEdition
    }
) => {
    return (
        <HomeContext.Provider
            value={{
                userData,
                setEditor,
                edition,
                setEdition
            }}
        >
            {children}
        </HomeContext.Provider>
    );
};

// 5. Create a custom hook to use the HomeContext
export const useHomeContext = (): HomeContextType => {
    const context = useContext(HomeContext);
    if (context === undefined) {
        throw new Error("useHomeContext must be used within a HomeProvider");
    }
    return context;
};
