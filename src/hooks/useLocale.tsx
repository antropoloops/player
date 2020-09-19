import es from "../locales/es-ES.json";

function formatMessage(id: string) {
  const messages = es as Record<string, string>;
  return messages[id] || id;
}

const locale = {
  formatMessage,
};

export default function useLocale() {
  return locale;
}
