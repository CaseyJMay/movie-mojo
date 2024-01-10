import { AnyAction } from "redux";

export type User = {
  email: string;
  location: string;
  description: string;
  thumbnail: string;
  username: string;
};

const defaultState: {
  jwt: string | null;
  user: User | null;
} = {
  jwt: null,
  user: null,
};

const UserReducer = (
  state = defaultState,
  action: AnyAction
): typeof defaultState => {
  switch (action.type) {
    case "USER_SAVE": {
      return {
        ...state,
        ...{
          jwt: action.payload.jwt,
          user: action.payload.user,
        },
      };
    }

    case "USER_DELETE": {
      return defaultState;
    }

    default:
      return defaultState;
  }
};

export default UserReducer;
