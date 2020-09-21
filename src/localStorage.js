export const loadState = (key) => {
  try {
      let serializedState = localStorage.getItem(key);

      if (serializedState === null) {
          return undefined;
      }
      let storageState = JSON.parse(serializedState);

      return storageState;
  } catch (err) {
      return undefined;
  }
}

export const saveState = (key, state) => {
  try {
      const serializedState = JSON.stringify(state)
      // saves state to localStorage
      localStorage.setItem(key, serializedState);
  } catch (err) {
      console.log('error and unable to save state', err);
  }
}