const localStorageKey = 'username';

const saveUserNameOnLocalStorage = (username: string): void => {
    localStorage.setItem(localStorageKey, username);
}

const deleteUsernameFromLocalStorage = () => {
    localStorage.removeItem(localStorageKey)
}

const getPersistedNameOnLocalStorage = () => {
    return localStorage.getItem(localStorageKey);
}


export { 
    saveUserNameOnLocalStorage, 
    deleteUsernameFromLocalStorage, 
    getPersistedNameOnLocalStorage
}