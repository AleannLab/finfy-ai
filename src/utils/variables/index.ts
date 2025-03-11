// Local Storage Keys

export const localStorageKeys = {
  darkMode: "darkMode",
};


// Cookie Keys

export const cookiesKeys = {
  sidebar: "sidebar"
};


export const emojis = ['🗂','🧑', '🛒', '💸', '🛍️', '🎓', '📈', '🏠', '🌤️', '💳'];

export const routesOnboarding = {
  confirmEmail: "confirm-email",
  selectRole: "select-role",
  selectCurrentRole: "select-current-role",
  gradeLevel: "grade-level",
  subject: "subject",
  // addStripe: "add-stripe",
  setupComplete: "setup-complete",
} as const;

export const stepsOnboarding = Object.values(routesOnboarding);

export const THEMES = { light: "", dark: ".dark" } as const;
