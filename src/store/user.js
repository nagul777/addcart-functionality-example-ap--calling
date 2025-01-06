import { create } from "zustand";
import { persist } from 'zustand/middleware'

const userStore = create(
    persist(
        (set) => ({
        user: null,
        token: null,
        login: (user, token) => {
            set({
                user,
                token,
            });
        },
        logout: () => {
            set({
               
              user: null,
              token: null,
            });
        },
      }),
      {
        name: "user-store",
      }
    )
  );
export default userStore;
export const authToken = () => userStore.getState().token;
