import { Header } from '@/components/Header';
import { FarmerWizard } from '@/components/FarmerWizard';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <FarmerWizard />
      </main>
    </div>
  );
};

export default Index;
