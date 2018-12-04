

export const loadState = () =>{
    try {
        const serialisedState = localStorage.getItem('spotcity-state');
        if (serialisedState === null){
            return undefined;
        }
        return JSON.parse(serialisedState);
    } catch (error) {
        return undefined;
    }
}

export const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('spotcity-state', serializedState)
    } catch (error) {

    }
}