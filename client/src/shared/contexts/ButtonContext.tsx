import { ReactNode, createContext, useContext, useState } from 'react';

interface ButtonContextType {
    selectedButton: string | null;
    setSelectedButton: (button: string | null) => void;
    defaultSelectedButton: string | null;
    setDefaultSelectedButton: (button: string | null) => void;
}
interface ButtonProvider {
    children: ReactNode;
}
const ButtonContext = createContext<ButtonContextType | undefined>(undefined);

export const useButtonContext = () => {
    const context = useContext(ButtonContext);

    if (context === undefined) {
        throw new Error('useButtonContext debe ser usado dentro de un ButtonProvider');
    }

    return context;
};

export const ButtonProvider: React.FC<ButtonProvider> = ({ children }) => {
    const [selectedButton, setSelectedButton] = useState<string | null>(null);
    const [defaultSelectedButton, setDefaultSelectedButton] = useState<string | null>('Todos');

    return (
        <ButtonContext.Provider value={{ selectedButton, setSelectedButton, defaultSelectedButton, setDefaultSelectedButton}}>
            {children}
        </ButtonContext.Provider>
    );
};