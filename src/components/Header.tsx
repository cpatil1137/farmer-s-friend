import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Languages, Sprout } from 'lucide-react';

export function Header() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-md">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Sprout className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold text-foreground">
            {t('app.name')}
          </span>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setLanguage(language === 'mr' ? 'en' : 'mr')}
          className="gap-2"
        >
          <Languages className="h-4 w-4" />
          {t('nav.switchLang')}
        </Button>
      </div>
    </header>
  );
}
