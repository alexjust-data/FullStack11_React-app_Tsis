const storage = {
    get(key) {
      const value = localStorage.getItem(key);
      if (!value) {
        return null;
      }
      try {
        return JSON.parse(value);
      } catch (error) {
        console.error("Error parsing JSON:", error);
        return null;
      }
    },
  
    set(key, value) {
      localStorage.setItem(key, JSON.stringify(value));
    },
  
    remove(key) {
      localStorage.removeItem(key);
    },
  
    clear() {
      localStorage.clear();
    },
};
  
export default storage;