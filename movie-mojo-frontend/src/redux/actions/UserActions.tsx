import { store } from "../Store";
import type { User } from "../reducers/UserReducer";

export const saveUser = (jwt: string | null, user: User) => {
  store.dispatch({
    type: "USER_SAVE",
    payload: {
      jwt,
      user,
    },
  });
};

export const deleteUser = () => {
  store.dispatch({ type: "USER_DELETE" });
};
