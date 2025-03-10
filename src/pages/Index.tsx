
import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import AnalyticsCard from '@/components/dashboard/AnalyticsCard';
import EngagementChart from '@/components/dashboard/EngagementChart';
import PlatformMetrics from '@/components/dashboard/PlatformMetrics';
import Calendar from '@/components/dashboard/Calendar';
import PostPreview from '@/components/dashboard/PostPreview';
import { Users, MessageSquare, Heart, BarChart3, ChevronRight, Sparkles } from 'lucide-react';
import { addDays } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAnimated, setIsAnimated] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      setIsAnimated(true);
    }
  }, [isLoading]);

  const handleViewAllPosts = () => {
    navigate('/schedule');
    toast({
      title: "Visualizza tutti i post",
      description: "Sei stato reindirizzato alla pagina di pianificazione"
    });
  };

  const handlePostPreviewClick = (platform: string) => {
    toast({
      title: `Post su ${platform}`,
      description: "Dettagli del post visualizzati"
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
          <p className="mt-4 text-sm text-muted-foreground animate-pulse">Caricamento dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-background">
      <Sidebar />
      
      <div className="flex-1 overflow-x-hidden">
        <div className="max-w-6xl mx-auto p-6 pb-24">
          {/* Header */}
          <div className={`transition-all duration-500 transform ${isAnimated ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            <div className="mb-8">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-2">
                <Sparkles className="h-3 w-3 mr-1.5" />
                <span>Panoramica Dashboard</span>
              </div>
              <h1 className="text-3xl font-semibold tracking-tight">Bentornata, Jane</h1>
              <p className="text-muted-foreground mt-1">Ecco cosa sta succedendo sulle tue piattaforme social oggi.</p>
            </div>
          </div>

          {/* Analytics Overview */}
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 transition-all duration-500 delay-100 transform ${isAnimated ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            <AnalyticsCard 
              title="Follower totali" 
              value="124.5K"
              change={5.2}
              changeLabel="vs. mese scorso"
              icon={<Users className="h-5 w-5 text-primary" />}
            />
            <AnalyticsCard 
              title="Tasso di interazione" 
              value="3.2%"
              change={-0.8}
              changeLabel="vs. mese scorso"
              icon={<Heart className="h-5 w-5 text-primary" />}
            />
            <AnalyticsCard 
              title="Post totali" 
              value="278"
              change={12}
              changeLabel="vs. mese scorso"
              icon={<MessageSquare className="h-5 w-5 text-primary" />}
            />
            <AnalyticsCard 
              title="Copertura media" 
              value="8.9K"
              change={3.7}
              changeLabel="vs. mese scorso"
              icon={<BarChart3 className="h-5 w-5 text-primary" />}
            />
          </div>
          
          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Charts Section */}
            <div className={`lg:col-span-2 space-y-6 transition-all duration-500 delay-200 transform ${isAnimated ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
              <EngagementChart title="Tendenze di interazione" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <PlatformMetrics 
                  platform="instagram" 
                  followers={53200} 
                  engagement={4.7} 
                  posts={128} 
                  likes={245600} 
                />
                <PlatformMetrics 
                  platform="twitter" 
                  followers={28400} 
                  engagement={2.3} 
                  posts={86} 
                  likes={75300} 
                />
              </div>
            </div>
            
            {/* Schedule Section */}
            <div className={`space-y-6 transition-all duration-500 delay-300 transform ${isAnimated ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
              <Calendar />
              
              <div className="flex items-center justify-between">
                <h3 className="text-base font-medium">Post in arrivo</h3>
                <button 
                  className="flex items-center text-xs font-medium text-primary gap-1 hover:underline"
                  onClick={handleViewAllPosts}
                >
                  Vedi tutti
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div onClick={() => handlePostPreviewClick('instagram')}>
                  <PostPreview 
                    platform="instagram"
                    content="Entusiasti di annunciare la nostra nuova linea di prodotti in arrivo la prossima settimana! Resta sintonizzato per ulteriori dettagli. #NuovoProdotto #InArrivo"
                    scheduledDate={addDays(new Date(), 1)}
                    status="scheduled"
                  />
                </div>
                <div onClick={() => handlePostPreviewClick('facebook')}>
                  <PostPreview 
                    platform="facebook"
                    content="Stiamo assumendo! Unisciti al nostro team e aiutaci a cambiare il mondo. Visita la nostra pagina carriere per maggiori informazioni."
                    scheduledDate={addDays(new Date(), 3)}
                    status="draft"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
