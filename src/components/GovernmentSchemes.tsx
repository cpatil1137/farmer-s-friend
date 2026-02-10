import { useLanguage } from '@/contexts/LanguageContext';
import { governmentSchemes } from '@/data/cropData';
import { ExternalLink } from 'lucide-react';

export function GovernmentSchemes() {
  const { t, language } = useLanguage();

  return (
    <div>
      <h2 className="mb-1 text-2xl font-extrabold">{t('schemes.title')}</h2>
      <p className="mb-4 text-muted-foreground">{t('schemes.subtitle')}</p>

      <div className="grid gap-3 md:grid-cols-2">
        {governmentSchemes.map(scheme => (
          <div
            key={scheme.id}
            className="flex gap-3 rounded-xl border bg-card p-4 transition-shadow hover:shadow-md"
          >
            <span className="text-2xl">{scheme.emoji}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-sm font-bold">{scheme.name[language]}</h3>
                <span className="shrink-0 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-bold text-primary">
                  {scheme.benefit}{scheme.benefit !== 'Free' && scheme.benefit !== 'Various' && `/${language === 'mr' ? 'वर्ष' : 'yr'}`}
                </span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                {scheme.description[language]}
              </p>
              <a
                href={scheme.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
              >
                {t('schemes.learnMore')}
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
