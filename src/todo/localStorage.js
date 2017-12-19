export const loadState = () => {
  try {
    const seiralizedState = localStorage.getItem('state');
    console.log(localStorage.getItem('state'));
    if (seiralizedState === null) {
      return undefined;
    }
    return JSON.parse(seiralizedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedSate = JSON.stringify(state);
    localStorage.setItem('state', serializedSate);
    
  } catch (err) {
    // ignore for now
  }
};
