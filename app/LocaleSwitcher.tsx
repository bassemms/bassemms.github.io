"use client";

import type { MouseEvent } from "react";
import { useRouter } from "next/navigation";
import type { Locale } from "../i18n/config";
import { useAppDispatch } from "../store/hooks";
import { setLocale } from "../store/localeSlice";

export default function LocaleSwitcher({ locale, label }: { locale: Locale; label: string }) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const selectLocale = (event: MouseEvent<HTMLAnchorElement>, value: Locale) => {
    event.preventDefault();
    dispatch(setLocale(value));
    localStorage.setItem("portfolio-locale", value);
    sessionStorage.setItem("portfolio-locale-switch", "true");
    router.replace(`/${value}/${window.location.hash}`, { scroll: false });
  };

  return (
    <div className="locale-switcher" aria-label={label}>
      {(["en", "fr"] as const).map((value) => (
        <a
          className={value === locale ? "active" : undefined}
          href={`/${value}/`}
          hrefLang={value}
          lang={value}
          aria-current={value === locale ? "page" : undefined}
          onClick={(event) => selectLocale(event, value)}
          key={value}
        >
          {value.toUpperCase()}
        </a>
      ))}
    </div>
  );
}
