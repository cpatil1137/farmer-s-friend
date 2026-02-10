import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { FarmerInputs } from './FarmerWizard';
import { getRecommendations, computeProfitLoss, formatCurrency, districts } from '@/data/cropData';
import { CropCard } from './CropCard';
import { GovernmentSchemes } from './GovernmentSchemes';
import { FAQ } from './FAQ';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid } from 'recharts';
import { RotateCcw, MapPin, Layers, Droplets, Sun, AlertTriangle } from 'lucide-react';

interface CropResultsProps {
  inputs: FarmerInputs;
  onReset: () => void;
}

export function CropResults({ inputs, onReset }: CropResultsProps) {
  const { t, language } = useLanguage();
  const recommendations = getRecommendations(inputs);

  const districtName = districts.find(d => d.id === inputs.district)?.name[language] || inputs.district;

  const summaryItems = [
    { icon: MapPin, label: t('results.district'), value: districtName },
    { icon: Layers, label: t('results.soilType'), value: t(`soil.${inputs.soilType}`) },
    { icon: Droplets, label: t('results.waterAvailability'), value: t(`water.${inputs.waterAvailability}`) },
    { icon: Sun, label: t('results.season'), value: t(`season.${inputs.season}`) },
  ];

  const chartData = recommendations.map(crop => {
    const { netProfit } = computeProfitLoss(crop);
    return {
      name: crop.name[language],
      profit: netProfit,
      emoji: crop.emoji,
    };
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="container py-8"
    >
      {/* Input Summary */}
      <div className="mb-8 rounded-xl border bg-card p-4">
        <h3 className="mb-3 text-sm font-bold text-muted-foreground uppercase tracking-wide">
          {t('results.inputSummary')}
        </h3>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {summaryItems.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-2">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Icon className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="text-sm font-semibold">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {recommendations.length === 0 ? (
        <div className="flex flex-col items-center gap-4 py-16 text-center">
          <AlertTriangle className="h-12 w-12 text-secondary" />
          <p className="text-lg text-muted-foreground">{t('results.noCrops')}</p>
          <Button onClick={onReset} variant="outline">
            <RotateCcw className="mr-2 h-4 w-4" />
            {t('results.startOver')}
          </Button>
        </div>
      ) : (
        <>
          <h2 className="mb-1 text-2xl font-extrabold">{t('results.title')}</h2>
          <p className="mb-6 text-muted-foreground">{t('results.subtitle')}</p>

          {/* Profit Comparison Chart */}
          {chartData.length > 1 && (
            <div className="mb-8 rounded-xl border bg-card p-4">
              <h3 className="mb-4 text-sm font-bold text-muted-foreground uppercase tracking-wide">
                {t('results.profitComparison')}
              </h3>
              <ResponsiveContainer width="100%" height={Math.max(200, chartData.length * 50)}>
                <BarChart data={chartData} layout="vertical" margin={{ left: 10, right: 30 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis
                    type="number"
                    tickFormatter={(v: number) => `₹${(v / 1000).toFixed(0)}k`}
                    fontSize={12}
                  />
                  <YAxis
                    dataKey="name"
                    type="category"
                    width={90}
                    fontSize={12}
                    tickLine={false}
                  />
                  <Tooltip
                    formatter={(value: number) => [formatCurrency(value), t('results.perAcre')]}
                    contentStyle={{
                      borderRadius: '8px',
                      border: '1px solid hsl(42, 18%, 87%)',
                      fontSize: '13px',
                    }}
                  />
                  <Bar dataKey="profit" radius={[0, 6, 6, 0]} barSize={28}>
                    {chartData.map((entry, index) => (
                      <Cell
                        key={index}
                        fill={entry.profit >= 0 ? 'hsl(145, 42%, 30%)' : 'hsl(0, 72%, 51%)'}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Crop Cards */}
          <div className="space-y-4">
            {recommendations.map((crop, index) => (
              <motion.div
                key={crop.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08, duration: 0.3 }}
              >
                <CropCard crop={crop} />
              </motion.div>
            ))}
          </div>

          {/* Government Schemes */}
          <div className="mt-12">
            <GovernmentSchemes />
          </div>

          {/* FAQ */}
          <div className="mt-12">
            <FAQ />
          </div>

          {/* Start Over */}
          <div className="mt-12 text-center">
            <Button onClick={onReset} variant="outline" size="lg" className="gap-2">
              <RotateCcw className="h-4 w-4" />
              {t('results.startOver')}
            </Button>
          </div>
        </>
      )}
    </motion.div>
  );
}
