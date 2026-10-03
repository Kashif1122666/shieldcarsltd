import React, { createContext, useContext, useState, useEffect } from 'react';
const FavoritesContext = createContext(undefined);
const FAVORITES_STORAGE_KEY = 'scl_client_favorites';
export const FavoritesProvider = ({ children }) => {
    const [favoriteIds, setFavoriteIds] = useState(() => {
        try {
            const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);
            return stored ? JSON.parse(stored) : [];
        }
        catch {
            return [];
        }
    });
    useEffect(() => {
        try {
            localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favoriteIds));
        }
        catch (e) {
            console.warn('Could not save favorites:', e);
        }
    }, [favoriteIds]);
    const toggleFavorite = (id) => {
        setFavoriteIds((prev) => prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]);
    };
    const isFavorite = (id) => favoriteIds.includes(id);
    return (<FavoritesContext.Provider value={{
            favoriteIds,
            toggleFavorite,
            isFavorite,
            totalFavorites: favoriteIds.length,
        }}>
      {children}
    </FavoritesContext.Provider>);
};
export const useFavorites = () => {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error('useFavorites must be used within a FavoritesProvider');
    }
    return context;
};
