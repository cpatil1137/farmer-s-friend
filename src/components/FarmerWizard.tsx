import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { districts } from '@/data/cropData';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowRight, ArrowLeft, Check, MapPin, Layers, Droplets, Sun, Sprout, BarChart3, TrendingUp } from 'lucide-react';
import { CropResults } from './CropResults';
import { cn } from '@/lib/utils';
import heroFarm from '@/assets/hero-farm.jpg';

export interface FarmerInputs {
  district: string;
  soilType: string;
  waterAvailability: string;
  season: string;
}

const TOTAL_STEPS = 4;

const soilOptions = [
  { id: 'black', emoji: '🟤' },
  { id: 'red', emoji: '🔴' },
  { id: 'alluvial', emoji: '🏞️' },
  { id: 'laterite', emoji: '🧱' },
  { id: 'sandy', emoji: '🏖️' },
  { id: 'clay', emoji: '🏺' },
];

const waterOptions = [
  { id: 'rainfed', icon: Droplets },
  { id: 'irrigation', icon: Sun },
];

const seasonOptions = [
  { id: 'kharif', emoji: '🌧️' },
  { id: 'rabi', emoji: '❄️' },
  { id: 'zaid', emoji: '☀️' },
];

const stepIcons = [MapPin, Layers, Droplets, Sun];

export function FarmerWizard() {
  const { t, language } = useLanguage();
  const [step, setStep] = useState(0); // 0 = welcome, 1-4 = steps
  const [direction, setDirection] = useState(1);
  const [showResults, setShowResults] = useState(false);
  const [inputs, setInputs] = useState<FarmerInputs>({
    district: '',
    soilType: '',
    waterAvailability: '',
    season: '',
  });

  const goNext = () => {
    setDirection(1);
    if (step === TOTAL_STEPS) {
      setShowResults(true);
    } else {
      setStep(s => s + 1);
    }
    window.scrollTo(0, 0);
  };

  const goBack = () => {
    setDirection(-1);
    setStep(s => s - 1);
    window.scrollTo(0, 0);
  };

  const handleReset = () => {
    setShowResults(false);
    setStep(0);
    setInputs({ district: '', soilType: '', waterAvailability: '', season: '' });
    window.scrollTo(0, 0);
  };

  const canProceed = () => {
    switch (step) {
      case 0: return true;
      case 1: return inputs.district !== '';
      case 2: return inputs.soilType !== '';
      case 3: return inputs.waterAvailability !== '';
      case 4: return inputs.season !== '';
      default: return false;
    }
  };

  if (showResults) {
    return <CropResults inputs={inputs} onReset={handleReset} />;
  }

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 200 : -200, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -200 : 200, opacity: 0 }),
  };

  return (
    <div className="min-h-[calc(100vh-3.5rem)]">
      <AnimatePresence mode="wait" custom={direction}>
        {step === 0 ? (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            {/* Hero */}
            <div className="relative h-[50vh] min-h-[320px] overflow-hidden">
              <img
                src={heroFarm}
                alt="Indian farmland"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
              <div className="absolute inset-0 flex items-end">
                <div className="container pb-8">
                  <h1 className="text-3xl font-extrabold md:text-5xl text-foreground">
                    {t('app.name')}
                  </h1>
                  <p className="mt-2 text-lg font-semibold text-secondary md:text-xl">
                    {t('app.tagline')}
                  </p>
                </div>
              </div>
            </div>

            <div className="container py-8">
              <p className="mb-8 max-w-xl text-muted-foreground">
                {t('app.heroSubtitle')}
              </p>

              {/* Features */}
              <div className="mb-8 grid grid-cols-3 gap-3">
                {[
                  { icon: Sprout, key: 'feature1' },
                  { icon: BarChart3, key: 'feature2' },
                  { icon: TrendingUp, key: 'feature3' },
                ].map(({ icon: Icon, key }) => (
                  <div
                    key={key}
                    className="rounded-xl border bg-card p-4 text-center"
                  >
                    <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-sm font-bold">{t(`wizard.${key}`)}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {t(`wizard.${key}Desc`)}
                    </p>
                  </div>
                ))}
              </div>

              <Button
                size="lg"
                className="w-full text-lg font-bold md:w-auto md:px-12"
                onClick={goNext}
              >
                {t('wizard.start')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key={`step-${step}`}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.25 }}
            className="container py-8"
          >
            {/* Progress */}
            <div className="mb-8 flex items-center justify-center gap-2">
              {Array.from({ length: TOTAL_STEPS }, (_, i) => {
                const StepIcon = stepIcons[i];
                const stepNum = i + 1;
                return (
                  <div key={i} className="flex items-center">
                    <div
                      className={cn(
                        'flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition-all',
                        stepNum < step
                          ? 'bg-primary text-primary-foreground'
                          : stepNum === step
                          ? 'bg-primary text-primary-foreground ring-4 ring-primary/20'
                          : 'bg-muted text-muted-foreground'
                      )}
                    >
                      {stepNum < step ? (
                        <Check className="h-5 w-5" />
                      ) : (
                        <StepIcon className="h-5 w-5" />
                      )}
                    </div>
                    {i < TOTAL_STEPS - 1 && (
                      <div
                        className={cn(
                          'mx-1 h-0.5 w-6 md:w-10',
                          stepNum < step ? 'bg-primary' : 'bg-muted'
                        )}
                      />
                    )}
                  </div>
                );
              })}
            </div>

            <p className="mb-2 text-center text-sm text-muted-foreground">
              {t('wizard.step')} {step} {t('wizard.of')} {TOTAL_STEPS}
            </p>

            {/* Step Content */}
            {step === 1 && (
              <StepLayout
                title={t('wizard.location.title')}
                subtitle={t('wizard.location.subtitle')}
              >
                <Select
                  value={inputs.district}
                  onValueChange={(v) => setInputs(prev => ({ ...prev, district: v }))}
                >
                  <SelectTrigger className="h-14 text-base">
                    <SelectValue placeholder={t('wizard.location.placeholder')} />
                  </SelectTrigger>
                  <SelectContent>
                    {districts.map(d => (
                      <SelectItem key={d.id} value={d.id} className="text-base">
                        📍 {d.name[language]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </StepLayout>
            )}

            {step === 2 && (
              <StepLayout
                title={t('wizard.soil.title')}
                subtitle={t('wizard.soil.subtitle')}
              >
                <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                  {soilOptions.map(soil => (
                    <OptionCard
                      key={soil.id}
                      emoji={soil.emoji}
                      title={t(`soil.${soil.id}`)}
                      description={t(`soil.${soil.id}Desc`)}
                      selected={inputs.soilType === soil.id}
                      onClick={() => setInputs(prev => ({ ...prev, soilType: soil.id }))}
                    />
                  ))}
                </div>
              </StepLayout>
            )}

            {step === 3 && (
              <StepLayout
                title={t('wizard.water.title')}
                subtitle={t('wizard.water.subtitle')}
              >
                <div className="grid grid-cols-2 gap-4">
                  {waterOptions.map(w => (
                    <OptionCard
                      key={w.id}
                      icon={w.icon}
                      title={t(`water.${w.id}`)}
                      description={t(`water.${w.id}Desc`)}
                      selected={inputs.waterAvailability === w.id}
                      onClick={() => setInputs(prev => ({ ...prev, waterAvailability: w.id }))}
                      large
                    />
                  ))}
                </div>
              </StepLayout>
            )}

            {step === 4 && (
              <StepLayout
                title={t('wizard.season.title')}
                subtitle={t('wizard.season.subtitle')}
              >
                <div className="grid grid-cols-3 gap-3">
                  {seasonOptions.map(s => (
                    <OptionCard
                      key={s.id}
                      emoji={s.emoji}
                      title={t(`season.${s.id}`)}
                      description={t(`season.${s.id}Desc`)}
                      selected={inputs.season === s.id}
                      onClick={() => setInputs(prev => ({ ...prev, season: s.id }))}
                    />
                  ))}
                </div>
              </StepLayout>
            )}

            {/* Navigation */}
            <div className="mt-8 flex items-center justify-between">
              <Button variant="outline" onClick={goBack} className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                {t('wizard.back')}
              </Button>
              <Button onClick={goNext} disabled={!canProceed()} className="gap-2">
                {step === TOTAL_STEPS ? t('wizard.start') : t('wizard.next')}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function StepLayout({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-lg">
      <h2 className="mb-1 text-center text-2xl font-bold">{title}</h2>
      <p className="mb-6 text-center text-sm text-muted-foreground">{subtitle}</p>
      {children}
    </div>
  );
}

function OptionCard({
  emoji,
  icon: Icon,
  title,
  description,
  selected,
  onClick,
  large,
}: {
  emoji?: string;
  icon?: React.ElementType;
  title: string;
  description: string;
  selected: boolean;
  onClick: () => void;
  large?: boolean;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={cn(
        'relative flex flex-col items-center gap-2 rounded-xl border-2 p-4 text-center transition-all',
        large ? 'p-6' : 'p-4',
        selected
          ? 'border-primary bg-primary/5 shadow-md'
          : 'border-border bg-card hover:border-primary/30 hover:shadow-sm'
      )}
    >
      {emoji && <span className={cn('block', large ? 'text-4xl' : 'text-3xl')}>{emoji}</span>}
      {Icon && <Icon className={cn('text-primary', large ? 'h-10 w-10' : 'h-8 w-8')} />}
      <span className="font-bold text-sm">{title}</span>
      <span className="text-xs text-muted-foreground leading-tight">{description}</span>
      {selected && (
        <div className="absolute -right-1.5 -top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Check className="h-3.5 w-3.5" />
        </div>
      )}
    </motion.button>
  );
}
