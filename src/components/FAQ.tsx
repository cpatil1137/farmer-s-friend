import { useLanguage } from '@/contexts/LanguageContext';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqKeys = ['q1', 'q2', 'q3', 'q4', 'q5'];

export function FAQ() {
  const { t } = useLanguage();

  return (
    <div>
      <h2 className="mb-4 text-2xl font-extrabold">{t('faq.title')}</h2>
      <Accordion type="single" collapsible className="w-full">
        {faqKeys.map((key, index) => (
          <AccordionItem key={key} value={key}>
            <AccordionTrigger className="text-left text-sm font-semibold">
              {t(`faq.${key}`)}
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
              {t(`faq.a${index + 1}`)}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
