const sessions: { [key: number]: boolean } = {};

export const createSession = (userId: number): void => {
    sessions[userId] = true;
};

export const destroySession = (userId: number): void => {
    delete sessions[userId];
};

export const isUserLoggedIn = (userId: number): boolean => {
    return !!sessions[userId];
};
