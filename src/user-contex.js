import { createContext, useReducer, useContext } from "react";

const UserStateContext = createContext();
const UserDispatchContext = createContext();

function countReducer(state, action) {
  switch (action.type) {
    case "login": {
      return { ...state, user: action.payload };
    }

    case "logout": {
      return { user: null };
    }

    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function UserProvider({ children }) {
  const [state, dispatch] = useReducer(countReducer, { user: null });

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

function useUserState() {
  const context = useContext(UserStateContext);

  if (context === undefined) {
    throw new Error("useCountState must be used within a CountProvider");
  }

  return context;
}

function useUserDispatch() {
  const context = useContext(UserDispatchContext);

  if (context === undefined) {
    throw new Error("useCountDispatch must be used within a CountProvider");
  }

  return context;
}

function useAuth() {
  return [useUserState(), useUserDispatch()];
}

export { UserProvider, useAuth };
