"use server";

import { createSupabaseClient } from "@/auth/server";
import { getErrorMessage } from "@/utils/helpers";;

export const createAccountAction = async (formData: FormData) => {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { auth } = createSupabaseClient();
    const { error } = await auth.signUp({ password, email });
    if (error) throw error;
    return { errorMessage: null };
  } catch (error) {
    return {
      errorMessage: getErrorMessage(error),
    };
  }
};

export const loginAction = async (formData: FormData) => {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const { auth } = createSupabaseClient();
    const { error } = await auth.signInWithPassword({ password, email });
    if (error) throw error;
    return { errorMessage: null };
  } catch (error) {
    return {
      errorMessage: getErrorMessage(error),
    };
  }
};

export const signOutAction = async () => {
  try {
    const { auth } = createSupabaseClient();
    const { error } = await auth.signOut();
    if (error) throw error;
    return { errorMessage: null };
  } catch (error) {
    return {
      errorMessage: getErrorMessage(error),
    };
  }
};
