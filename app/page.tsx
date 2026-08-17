"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { initializeLocale } from "../store/localeSlice";

export default function LocaleRedirect() {
  const dispatch = useAppDispatch();
  const { locale, initialized } = useAppSelector((state) => state.locale);

  useEffect(() => {
    const storedLocale = localStorage.getItem("portfolio-locale");
    const browserLanguages = navigator.languages.length ? navigator.languages : [navigator.language];
    dispatch(initializeLocale({ storedLocale, browserLanguages }));
  }, [dispatch]);

  useEffect(() => {
    if (!initialized) return;
    window.location.replace(`/${locale}/`);
  }, [initialized, locale]);

  return (
    <main className="locale-loading" aria-live="polite">
      <p>Loading your language...</p>
      <noscript><Link href="/en/">Continue in English</Link> · <Link href="/fr/">Continuer en français</Link></noscript>
    </main>
  );
}
