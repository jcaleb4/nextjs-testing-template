export const PERSIST_KEY = 'app-root';

export const getTokenFromLocalStorage = () => {
  const rawState = localStorage.getItem(`persist:${PERSIST_KEY}`);
  const jsonStore = rawState ? JSON.parse(rawState) : null;
  const auth = jsonStore ? JSON.parse(jsonStore.auth as string) : null;

  return auth?.token ?? null;
};
