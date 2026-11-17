export type BannerLocale = 'pt-BR' | 'pt' | 'es' | 'en' | 'fr' | 'de' | 'it';

export interface BannerCopy {
  badge: string;
  headlineBefore: string;
  headlineHighlight: string;
  headlineAfter: string;
  description: string;
  chips: [string, string, string];
  cta: string;
  minimizedText: string;
  ariaLabel: string;
  minimizeLabel: string;
  closeLabel: string;
  expandLabel: string;
  mascotAlt: string;
  playStoreHl: string;
}

const PT_COUNTRIES = new Set(['BR', 'PT', 'AO', 'MZ', 'CV', 'GW', 'ST', 'TL']);

const ES_COUNTRIES = new Set([
  'ES', 'MX', 'AR', 'CO', 'CL', 'PE', 'VE', 'EC', 'BO', 'PY', 'UY',
  'CU', 'DO', 'GT', 'HN', 'SV', 'NI', 'CR', 'PA', 'PR', 'GQ',
]);

const FR_COUNTRIES = new Set([
  'FR', 'MC', 'LU', 'HT', 'SN', 'CI', 'CM', 'ML', 'BF', 'NE', 'TG',
  'BJ', 'MG', 'CD', 'CG', 'GA',
]);

const DE_COUNTRIES = new Set(['DE', 'AT', 'LI']);
const IT_COUNTRIES = new Set(['IT', 'SM', 'VA']);

const TIMEZONE_TO_COUNTRY: Record<string, string> = {
  // Brasil
  'America/Sao_Paulo': 'BR',
  'America/Fortaleza': 'BR',
  'America/Recife': 'BR',
  'America/Bahia': 'BR',
  'America/Belem': 'BR',
  'America/Manaus': 'BR',
  'America/Cuiaba': 'BR',
  'America/Campo_Grande': 'BR',
  'America/Porto_Velho': 'BR',
  'America/Boa_Vista': 'BR',
  'America/Rio_Branco': 'BR',
  'America/Maceio': 'BR',
  'America/Araguaina': 'BR',
  'America/Santarem': 'BR',
  'America/Noronha': 'BR',
  'America/Eirunepe': 'BR',
  'Brazil/East': 'BR',
  'Brazil/West': 'BR',
  'Brazil/Acre': 'BR',
  'Brazil/DeNoronha': 'BR',
  // Outros países lusófonos
  'Europe/Lisbon': 'PT',
  'Atlantic/Azores': 'PT',
  'Atlantic/Madeira': 'PT',
  'Africa/Luanda': 'AO',
  'Africa/Maputo': 'MZ',
  'Atlantic/Cape_Verde': 'CV',
  'Africa/Bissau': 'GW',
  'Africa/Sao_Tome': 'ST',
  'Asia/Dili': 'TL',
  // Países hispanófonos
  'Europe/Madrid': 'ES',
  'Atlantic/Canary': 'ES',
  'Africa/Ceuta': 'ES',
  'America/Mexico_City': 'MX',
  'America/Cancun': 'MX',
  'America/Merida': 'MX',
  'America/Monterrey': 'MX',
  'America/Matamoros': 'MX',
  'America/Mazatlan': 'MX',
  'America/Chihuahua': 'MX',
  'America/Ojinaga': 'MX',
  'America/Hermosillo': 'MX',
  'America/Tijuana': 'MX',
  'America/Bahia_Banderas': 'MX',
  'America/Bogota': 'CO',
  'America/Lima': 'PE',
  'America/Santiago': 'CL',
  'America/Punta_Arenas': 'CL',
  'Pacific/Easter': 'CL',
  'America/Buenos_Aires': 'AR',
  'America/Argentina/Buenos_Aires': 'AR',
  'America/Argentina/Cordoba': 'AR',
  'America/Argentina/Mendoza': 'AR',
  'America/Argentina/Rosario': 'AR',
  'America/Caracas': 'VE',
  'America/Guayaquil': 'EC',
  'America/La_Paz': 'BO',
  'America/Asuncion': 'PY',
  'America/Montevideo': 'UY',
  'America/Havana': 'CU',
  'America/Santo_Domingo': 'DO',
  'America/Guatemala': 'GT',
  'America/Tegucigalpa': 'HN',
  'America/Managua': 'NI',
  'America/Costa_Rica': 'CR',
  'America/Panama': 'PA',
  'America/El_Salvador': 'SV',
  'America/Puerto_Rico': 'PR',
  // França / Alemanha / Itália
  'Europe/Paris': 'FR',
  'Europe/Berlin': 'DE',
  'Europe/Vienna': 'AT',
  'Europe/Rome': 'IT',
};

export const BANNER_TRANSLATIONS: Record<BannerLocale, BannerCopy> = {
  'pt-BR': {
    badge: 'Calorita AI • Grátis',
    headlineBefore: 'Quer',
    headlineHighlight: 'contar calorias',
    headlineAfter: 'sem esforço?',
    description: 'Tire uma foto do prato e a IA calcula calorias e macros em segundos!',
    chips: ['📸 Foto ou texto', '🍛 Comida brasileira', '🔥 Metas e macros'],
    cta: 'Baixar grátis no Google Play',
    minimizedText: 'Contar calorias com IA',
    ariaLabel: 'Calorita - Contador de calorias com IA',
    minimizeLabel: 'Minimizar anúncio',
    closeLabel: 'Fechar anúncio',
    expandLabel: 'Expandir anúncio do Calorita',
    mascotAlt: 'Mascote Calorita',
    playStoreHl: 'pt_BR',
  },
  pt: {
    badge: 'Calorita AI • Grátis',
    headlineBefore: 'Quer',
    headlineHighlight: 'contar calorias',
    headlineAfter: 'sem esforço?',
    description: 'Tire uma foto do prato e a IA calcula calorias e macros em segundos!',
    chips: ['📸 Foto ou texto', '🍽️ Pratos reais', '🔥 Metas e macros'],
    cta: 'Baixar grátis no Google Play',
    minimizedText: 'Contar calorias com IA',
    ariaLabel: 'Calorita - Contador de calorias com IA',
    minimizeLabel: 'Minimizar anúncio',
    closeLabel: 'Fechar anúncio',
    expandLabel: 'Expandir anúncio do Calorita',
    mascotAlt: 'Mascote Calorita',
    playStoreHl: 'pt_PT',
  },
  es: {
    badge: 'Calorita AI • Gratis',
    headlineBefore: '¿Quieres',
    headlineHighlight: 'contar calorías',
    headlineAfter: 'sin esfuerzo?',
    description: '¡Toma una foto de tu plato y la IA calcula calorías y macros en segundos!',
    chips: ['📸 Foto o texto', '🍽️ Comida real', '🔥 Metas y macros'],
    cta: 'Descargar gratis en Google Play',
    minimizedText: 'Contar calorías con IA',
    ariaLabel: 'Calorita - Contador de calorías con IA',
    minimizeLabel: 'Minimizar anuncio',
    closeLabel: 'Cerrar anuncio',
    expandLabel: 'Expandir anuncio de Calorita',
    mascotAlt: 'Mascota Calorita',
    playStoreHl: 'es',
  },
  en: {
    badge: 'Calorita AI • Free',
    headlineBefore: 'Want to',
    headlineHighlight: 'count calories',
    headlineAfter: 'effortlessly?',
    description: 'Snap a photo of your plate and AI calculates calories & macros in seconds!',
    chips: ['📸 Photo or text', '🥗 Real meals', '🔥 Goals & macros'],
    cta: 'Get it free on Google Play',
    minimizedText: 'Count calories with AI',
    ariaLabel: 'Calorita - AI Calorie Counter',
    minimizeLabel: 'Minimize ad',
    closeLabel: 'Close ad',
    expandLabel: 'Expand Calorita ad',
    mascotAlt: 'Calorita Mascot',
    playStoreHl: 'en',
  },
  fr: {
    badge: 'Calorita AI • Gratuit',
    headlineBefore: 'Envie de',
    headlineHighlight: 'compter les calories',
    headlineAfter: 'sans effort ?',
    description: 'Prenez votre assiette en photo et l’IA calcule calories et macros en secondes !',
    chips: ['📸 Photo ou texte', '🥗 Vrais repas', '🔥 Objectifs & macros'],
    cta: 'Télécharger sur Google Play',
    minimizedText: 'Compter les calories par IA',
    ariaLabel: 'Calorita - Compteur de calories IA',
    minimizeLabel: 'Réduire l’annonce',
    closeLabel: 'Fermer l’annonce',
    expandLabel: 'Agrandir l’annonce Calorita',
    mascotAlt: 'Mascotte Calorita',
    playStoreHl: 'fr',
  },
  de: {
    badge: 'Calorita AI • Gratis',
    headlineBefore: 'Einfach',
    headlineHighlight: 'Kalorien zählen',
    headlineAfter: 'ohne Stress?',
    description: 'Mach ein Foto von deinem Teller – die KI berechnet Kalorien & Makros in Sekunden!',
    chips: ['📸 Foto oder Text', '🥗 Echte Mahlzeiten', '🔥 Ziele & Makros'],
    cta: 'Kostenlos bei Google Play',
    minimizedText: 'Kalorien zählen mit KI',
    ariaLabel: 'Calorita - KI-Kalorienzähler',
    minimizeLabel: 'Anzeige minimieren',
    closeLabel: 'Anzeige schließen',
    expandLabel: 'Calorita-Anzeige maximieren',
    mascotAlt: 'Calorita-Maskottchen',
    playStoreHl: 'de',
  },
  it: {
    badge: 'Calorita AI • Gratis',
    headlineBefore: 'Vuoi',
    headlineHighlight: 'contare le calorie',
    headlineAfter: 'senza sforzo?',
    description: 'Scatta una foto al piatto e l’IA calcola calorie e macro in pochi secondi!',
    chips: ['📸 Foto o testo', '🥗 Piatti reali', '🔥 Obiettivi e macro'],
    cta: 'Scarica gratis su Google Play',
    minimizedText: 'Conta calorie con IA',
    ariaLabel: 'Calorita - Contacalorie con IA',
    minimizeLabel: 'Riduci annuncio',
    closeLabel: 'Chiudi annuncio',
    expandLabel: 'Espandi annuncio Calorita',
    mascotAlt: 'Mascotte Calorita',
    playStoreHl: 'it',
  },
};

function getPrimaryBrowserLanguage(): string {
  if (typeof navigator === 'undefined') return 'en';
  const list = navigator.languages?.length ? navigator.languages : [navigator.language];
  return (list[0] ?? 'en').toLowerCase();
}

/** Resolves the best banner locale for an ISO 3166-1 alpha-2 country code. */
export function resolveLocaleFromCountry(countryCode: string | null | undefined): BannerLocale {
  const country = (countryCode ?? '').trim().toUpperCase();
  const browserLang = getPrimaryBrowserLanguage();

  if (country === 'BR') return 'pt-BR';
  if (PT_COUNTRIES.has(country)) return 'pt';
  if (ES_COUNTRIES.has(country)) return 'es';
  if (FR_COUNTRIES.has(country)) return 'fr';
  if (DE_COUNTRIES.has(country)) return 'de';
  if (IT_COUNTRIES.has(country)) return 'it';

  // Multilingual countries refine via browser preference
  if (country === 'CA' || country === 'BE') {
    return browserLang.startsWith('fr') ? 'fr' : 'en';
  }
  if (country === 'CH') {
    if (browserLang.startsWith('fr')) return 'fr';
    if (browserLang.startsWith('it')) return 'it';
    return 'de';
  }

  return 'en';
}

/** Synchronous best-effort country/locale detection via timezone + browser languages. */
export function detectInitialBannerLocale(): BannerLocale {
  if (typeof window === 'undefined') return 'en';

  try {
    const cachedCountry = sessionStorage.getItem('calorita_banner_country');
    if (cachedCountry && /^[A-Za-z]{2}$/.test(cachedCountry)) {
      return resolveLocaleFromCountry(cachedCountry);
    }
  } catch {
    // Ignore storage access errors
  }

  try {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (timeZone) {
      if (TIMEZONE_TO_COUNTRY[timeZone]) {
        return resolveLocaleFromCountry(TIMEZONE_TO_COUNTRY[timeZone]);
      }
      if (timeZone.startsWith('America/Argentina/')) {
        return 'es';
      }
    }
  } catch {
    // Ignore Intl errors
  }

  const langs =
    typeof navigator !== 'undefined'
      ? (navigator.languages?.length ? navigator.languages : [navigator.language])
      : [];

  for (const raw of langs) {
    const tag = (raw ?? '').trim().toLowerCase();
    if (!tag) continue;

    const parts = tag.split('-');
    const lang = parts[0];
    const region = parts.length > 1 ? parts[parts.length - 1].toUpperCase() : '';

    if (region && (PT_COUNTRIES.has(region) || ES_COUNTRIES.has(region) || FR_COUNTRIES.has(region) || DE_COUNTRIES.has(region) || IT_COUNTRIES.has(region))) {
      return resolveLocaleFromCountry(region);
    }
    if (lang === 'pt') return region === 'PT' ? 'pt' : 'pt-BR';
    if (lang === 'es') return 'es';
    if (lang === 'fr') return 'fr';
    if (lang === 'de') return 'de';
    if (lang === 'it') return 'it';
    if (lang === 'en') return 'en';
  }

  return 'en';
}
