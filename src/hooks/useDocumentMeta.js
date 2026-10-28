import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  DEFAULT_IMAGE,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from "../data/site";

function setMeta(attribute, key, content) {
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

function setCanonical(href) {
  let element = document.head.querySelector('link[rel="canonical"]');
  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", "canonical");
    document.head.appendChild(element);
  }
  element.setAttribute("href", href);
}

export function absoluteUrl(path) {
  return /^https?:\/\//.test(path) ? path : `${SITE_URL}${path}`;
}

// Atualiza título, descrição, link canônico e Open Graph ao navegar.
// O HTML de cada página já sai do build com essas tags (ver vite.config.js),
// então isto só mantém o <head> em dia durante a navegação no navegador.
export default function useDocumentMeta({
  title,
  description = SITE_DESCRIPTION,
  image = DEFAULT_IMAGE,
  type = "website",
} = {}) {
  const { pathname } = useLocation();

  useEffect(() => {
    const fullTitle = title ? `${title} · ${SITE_NAME}` : SITE_NAME;
    const url = absoluteUrl(pathname);

    document.title = fullTitle;
    setCanonical(url);
    setMeta("name", "description", description);
    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", url);
    setMeta("property", "og:type", type);
    setMeta("property", "og:image", absoluteUrl(image));
    setMeta("name", "twitter:title", fullTitle);
    setMeta("name", "twitter:description", description);
  }, [title, description, image, type, pathname]);
}
