export function importFromLocalStore<T>(key: string): T | null {
    const json = localStorage.getItem(key);
    
    if (!json) {
        return null;
    }
    
    let object: T | null = null;
    
    try {
        object = JSON.parse(json);
    } catch(e) {
        console.error(`Error in importFromLocalStorage: ${e}`);
    }
    
    return object;
}


export function exportToLocalStorage<T>(key: string, value: T): void {
    try {
        const json = JSON.stringify(value);
        localStorage.setItem(key, json);

    } catch(e) {
        console.error(`Error in exportToLocalStorage: ${e}`);
    }
}