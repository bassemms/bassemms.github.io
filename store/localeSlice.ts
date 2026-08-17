import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { defaultLocale, isLocale, type Locale } from "../i18n/config";

type LocaleState = {
  locale: Locale;
  initialized: boolean;
};

type DetectLocalePayload = {
  storedLocale: string | null;
  browserLanguages: readonly string[];
};

const initialState: LocaleState = {
  locale: defaultLocale,
  initialized: false,
};

export function resolveLocale({ storedLocale, browserLanguages }: DetectLocalePayload): Locale {
  if (storedLocale && isLocale(storedLocale)) return storedLocale;

  for (const language of browserLanguages) {
    const baseLanguage = language.toLowerCase().split("-")[0];
    if (isLocale(baseLanguage)) return baseLanguage;
  }

  return defaultLocale;
}

const localeSlice = createSlice({
  name: "locale",
  initialState,
  reducers: {
    initializeLocale(state, action: PayloadAction<DetectLocalePayload>) {
      state.locale = resolveLocale(action.payload);
      state.initialized = true;
    },
    setLocale(state, action: PayloadAction<Locale>) {
      state.locale = action.payload;
      state.initialized = true;
    },
  },
});

export const { initializeLocale, setLocale } = localeSlice.actions;
export default localeSlice.reducer;
