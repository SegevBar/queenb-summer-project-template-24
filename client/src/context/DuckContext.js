import React, { createContext, useState } from 'react';

const DuckContext = createContext();

const DuckProvider = ({ children }) => {
     const [duck]= useState(null);

    // Optionally, you can still manage duck state if you plan to update it some other way in the future.
    // If duck-related functionality is no longer needed, you can remove duck state and context altogether.

    return (
        <DuckContext.Provider value={{ duck }}>
            {children}
        </DuckContext.Provider>
    );
};

export { DuckContext, DuckProvider };
