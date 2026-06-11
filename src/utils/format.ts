export function formatDate(value?: string | null) {
  if (!value) {
    return "-";
  }

  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}

export function formatWhatsAppLink(value?: string | null) {
  if (!value) {
    return "https://wa.me/6281234567890";
  }

  const sanitized = value.replace(/[^\d]/g, "");
  return `https://wa.me/${sanitized}`;
}

export function stripHtml(value: string) {
  return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

export function excerpt(value: string, max = 140) {
  const clean = stripHtml(value);
  if (clean.length <= max) {
    return clean;
  }

  return `${clean.slice(0, max).trim()}...`;
}
