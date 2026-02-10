import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { CropData, computeProfitLoss, formatCurrency } from '@/data/cropData';
import { Button } from '@/components/ui/button';
import { ChevronDown, TrendingUp, TrendingDown, Minus, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CropCardProps {
  crop: CropData;
}

export function CropCard({ crop }: CropCardProps) {
  const { t, language } = useLanguage();
  const [expanded, setExpanded] = useState(false);
  const { totalCost, avgYield, expectedIncome, netProfit, costPercentage } = computeProfitLoss(crop);

  const isProfit = netProfit >= 0;

  const trendConfig = {
    increasing: { icon: TrendingUp, className: 'text-primary', label: t('market.increasing') },
    stable: { icon: Minus, className: 'text-secondary', label: t('market.stable') },
    decreasing: { icon: TrendingDown, className: 'text-destructive', label: t('market.decreasing') },
  };

  const trend = trendConfig[crop.marketPrice.trend];
  const TrendIcon = trend.icon;

  const costItems = [
    { label: t('pl.seedCost'), value: crop.costs.seed },
    { label: t('pl.fertilizerCost'), value: crop.costs.fertilizer },
    { label: t('pl.pesticideCost'), value: crop.costs.pesticide },
    { label: t('pl.irrigationCost'), value: crop.costs.irrigation },
    { label: t('pl.laborCost'), value: crop.costs.labor },
  ];

  return (
    <div className="overflow-hidden rounded-xl border bg-card shadow-sm transition-shadow hover:shadow-md">
      {/* Summary */}
      <div className="p-4">
        <div className="flex items-start gap-3">
          <span className="text-3xl">{crop.emoji}</span>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold leading-tight">{crop.name[language]}</h3>
            <p className="text-sm text-muted-foreground">{crop.description[language]}</p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-3 grid grid-cols-3 gap-2">
          <div className="rounded-lg bg-muted/60 p-2.5 text-center">
            <p className="text-[11px] text-muted-foreground">{t('results.yieldPerAcre')}</p>
            <p className="text-sm font-bold">
              {crop.yieldPerAcre.min}-{crop.yieldPerAcre.max}{' '}
              <span className="text-[11px] font-normal">{t('results.quintal')}</span>
            </p>
          </div>
          <div className={cn('rounded-lg p-2.5 text-center', isProfit ? 'bg-primary/8' : 'bg-destructive/8')}>
            <p className="text-[11px] text-muted-foreground">
              {isProfit ? t('pl.netProfit') : t('pl.netLoss')}
            </p>
            <p className={cn('text-sm font-bold', isProfit ? 'profit-positive' : 'profit-negative')}>
              {formatCurrency(Math.abs(netProfit))}
            </p>
          </div>
          <div className="rounded-lg bg-muted/60 p-2.5 text-center">
            <p className="text-[11px] text-muted-foreground">{t('market.currentPrice')}</p>
            <p className="text-sm font-bold flex items-center justify-center gap-1">
              {formatCurrency(crop.marketPrice.current)}
              <TrendIcon className={cn('h-3.5 w-3.5', trend.className)} />
            </p>
          </div>
        </div>

        {/* Cost vs Income Bar */}
        <div className="mt-3">
          <div className="flex justify-between text-[11px] text-muted-foreground mb-1">
            <span>{t('pl.totalCost')}: {formatCurrency(totalCost)}</span>
            <span>{t('pl.expectedIncome')}: {formatCurrency(expectedIncome)}</span>
          </div>
          <div className="h-2.5 w-full rounded-full bg-muted overflow-hidden">
            <div
              className={cn('h-full rounded-full transition-all', isProfit ? 'bg-primary' : 'bg-destructive')}
              style={{ width: `${Math.min(100 - (costPercentage > 100 ? 0 : 100 - costPercentage), 100)}%` }}
            />
          </div>
        </div>

        {/* Expand Toggle */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setExpanded(!expanded)}
          className="mt-2 w-full gap-2 text-muted-foreground"
        >
          {expanded ? t('results.hideDetails') : t('results.viewDetails')}
          <ChevronDown className={cn('h-4 w-4 transition-transform', expanded && 'rotate-180')} />
        </Button>
      </div>

      {/* Expandable Details */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="border-t p-4 space-y-4">
              {/* P&L Breakdown */}
              <div>
                <h4 className="mb-2 text-sm font-bold">{t('pl.title')}</h4>
                <div className="space-y-1.5">
                  {costItems.map(item => (
                    <div key={item.label} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{item.label}</span>
                      <span className="font-medium">{formatCurrency(item.value)}</span>
                    </div>
                  ))}
                  <div className="border-t pt-1.5 mt-1.5">
                    <div className="flex justify-between text-sm font-bold">
                      <span>{t('pl.totalCost')}</span>
                      <span>{formatCurrency(totalCost)}</span>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {t('pl.expectedIncome')} ({avgYield} {t('results.quintal')} × {formatCurrency(crop.marketPrice.current)})
                    </span>
                    <span className="font-bold">{formatCurrency(expectedIncome)}</span>
                  </div>
                  <div className={cn('flex justify-between text-sm font-bold rounded-lg p-2', isProfit ? 'bg-primary/10' : 'bg-destructive/10')}>
                    <span>{isProfit ? t('pl.netProfit') : t('pl.netLoss')}</span>
                    <span className={isProfit ? 'profit-positive' : 'profit-negative'}>
                      {formatCurrency(Math.abs(netProfit))}
                    </span>
                  </div>
                </div>
              </div>

              {/* Market Price Details */}
              <div>
                <h4 className="mb-2 text-sm font-bold">{t('market.title')}</h4>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="text-muted-foreground">{t('market.nearestMandi')}:</span>
                    <span className="font-medium">{crop.marketPrice.mandi[language]}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{t('market.currentPrice')}</span>
                    <span className="font-medium">{formatCurrency(crop.marketPrice.current)} {t('market.perQuintal')}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{t('market.averagePrice')}</span>
                    <span className="font-medium">{formatCurrency(crop.marketPrice.average)} {t('market.perQuintal')}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{t('market.trend')}</span>
                    <span className={cn('flex items-center gap-1 font-medium', trend.className)}>
                      <TrendIcon className="h-3.5 w-3.5" />
                      {trend.label}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
