import React, { useState, useEffect } from 'react';
import { DataProvider, useData } from './context/DataContext';
import { PageSection, Product, Project, Service, Article, ProductCategory } from './types';

// Admin Components
import { AdminLogin } from './admin/AdminLogin';
import { AdminPanel } from './admin/AdminPanel';

// Public Components
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustBar } from './components/TrustBar';
import { CategoryHexSection } from './components/CategoryHexSection';
import { ProductCatalogSection } from './components/ProductCatalogSection';
import { WorkflowSection } from './components/WorkflowSection';
import { ServicesSection } from './components/ServicesSection';
import { FeaturedProjectsSection } from './components/FeaturedProjectsSection';
import { KnowledgeSection } from './components/KnowledgeSection';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';
import { AboutContactUnifiedSection } from './components/AboutContactUnifiedSection';
import { Footer } from './components/Footer';

// Modals
import { ProductDetailModal } from './components/Modals/ProductDetailModal';
import { CaseStudyModal } from './components/Modals/CaseStudyModal';
import { ServiceDetailModal } from './components/Modals/ServiceDetailModal';
import { ArticleDetailModal } from './components/Modals/ArticleDetailModal';
import { GlobalSearchModal } from './components/Modals/GlobalSearchModal';
import { AiEngineerAssistantModal } from './components/AiEngineerAssistantModal';

const MainAppContent: React.FC = () => {
  const { 
    isAuthenticated, 
    products, 
    projects, 
    services, 
    articles, 
    categories, 
    companyInfo, 
    heroCms 
  } = useData();

  // Route State: detects if URL is /admin or #admin
  const [isAdminRoute, setIsAdminRoute] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return (
        window.location.pathname.toLowerCase().includes('/admin') ||
        window.location.hash.toLowerCase().includes('admin')
      );
    }
    return false;
  });

  // Navigation and consultation state
  const [currentSection, setCurrentSection] = useState<PageSection>('home');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>('all');

  // Unified Consultation / Quote Form prefill state
  const [consultationSubject, setConsultationSubject] = useState<string | undefined>('مرغداری گوشتی');
  const [consultationProduct, setConsultationProduct] = useState<string | undefined>('');
  const [consultationMessage, setConsultationMessage] = useState<string | undefined>('');

  // Modals state
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAiAssistantOpen, setIsAiAssistantOpen] = useState(false);

  // Sync browser URL & popstate
  useEffect(() => {
    const handleLocationChange = () => {
      const isAdm = 
        window.location.pathname.toLowerCase().includes('/admin') ||
        window.location.hash.toLowerCase().includes('admin');
      setIsAdminRoute(isAdm);
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const navigateToPublic = () => {
    setIsAdminRoute(false);
    if (window.history.pushState) {
      window.history.pushState(null, '', '/');
    }
  };

  const handleNavigateSection = (section: PageSection) => {
    setCurrentSection(section);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCategory = (cat: ProductCategory | 'all') => {
    setSelectedCategory(cat);
    setCurrentSection('products');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Unified Handler: Redirects all quotes and consultations to the unified form in Contact Us
  const handleOpenUnifiedConsultation = (subject?: string, product?: string, message?: string) => {
    if (subject) setConsultationSubject(subject);
    if (product !== undefined) setConsultationProduct(product);
    if (message !== undefined) setConsultationMessage(message);

    // Close any open modals
    setSelectedProduct(null);
    setSelectedProject(null);
    setSelectedService(null);
    setIsAiAssistantOpen(false);

    if (currentSection === 'home') {
      const formEl = document.getElementById('free-consultation-form');
      if (formEl) {
        formEl.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }

    setCurrentSection('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      document.getElementById('free-consultation-form')?.scrollIntoView({ behavior: 'smooth' });
    }, 120);
  };

  const handleRequestQuoteForProduct = (product: Product) => {
    handleOpenUnifiedConsultation(
      'استعلام قیمت و پیش‌فاکتور',
      product.name,
      `درخواست استعلام قیمت و مشخصات فنی برای محصول: ${product.name} (کد: ${product.code || product.id})`
    );
  };

  const handleSelectProductById = (productId: string) => {
    const found = products.find((p) => p.id === productId);
    if (found) {
      setSelectedProduct(found);
    }
  };

  // If Admin Route: render Admin Login or Admin Dashboard
  if (isAdminRoute) {
    if (isAuthenticated) {
      return <AdminPanel onViewPublicSite={navigateToPublic} />;
    }
    return <AdminLogin onBackToSite={navigateToPublic} />;
  }

  // Public Website View
  return (
    <div className="min-h-screen bg-white text-[#333132] font-['Vazirmatn',sans-serif] flex flex-col selection:bg-amber-400 selection:text-slate-950" dir="rtl">
      
      {/* Top Navbar */}
      <Navbar
        currentSection={currentSection}
        onNavigate={handleNavigateSection}
        onOpenConsultation={() => handleOpenUnifiedConsultation()}
        onOpenQuote={() => handleOpenUnifiedConsultation('استعلام قیمت و پیش‌فاکتور')}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAiAssistant={() => setIsAiAssistantOpen(true)}
      />

      {/* Main Content by Section */}
      <main className="flex-1">
        {currentSection === 'home' && (
          <Hero
            cmsHero={{
              title: heroCms.title,
              body: heroCms.subtitle,
              image: heroCms.backgroundImage,
            }}
            onNavigate={handleNavigateSection}
            onSelectCategory={handleSelectCategory}
            onOpenConsultation={() => handleOpenUnifiedConsultation()}
            onOpenQuote={() => handleOpenUnifiedConsultation('استعلام قیمت و پیش‌فاکتور')}
            onOpenAiAssistant={() => setIsAiAssistantOpen(true)}
          >
            {/* About Us & Free Consultation in a Single Unified Card inside the sliding sheet */}
            <AboutContactUnifiedSection
              initialSubject={consultationSubject}
              initialProduct={consultationProduct}
              onOpenQuote={() => handleOpenUnifiedConsultation('استعلام قیمت و پیش‌فاکتور')}
            />
          </Hero>
        )}

        {currentSection === 'products' && (
          <div className="py-6">
            <ProductCatalogSection
              products={products}
              selectedCategory={selectedCategory}
              onSelectCategory={handleSelectCategory}
              onSelectProduct={setSelectedProduct}
              onRequestQuoteForProduct={handleRequestQuoteForProduct}
            />
          </div>
        )}

        {currentSection === 'services' && (
          <div className="py-6">
            <ServicesSection
              services={services}
              onSelectService={setSelectedService}
              onOpenConsultation={() => handleOpenUnifiedConsultation('سوله و سالن صنعتی')}
            />
          </div>
        )}

        {currentSection === 'projects' && (
          <div className="py-6">
            <FeaturedProjectsSection
              projects={projects}
              onSelectProject={setSelectedProject}
              onOpenConsultation={() => handleOpenUnifiedConsultation('سوله و سالن صنعتی')}
            />
          </div>
        )}

        {currentSection === 'knowledge' && (
          <div className="py-6">
            <KnowledgeSection
              articles={articles}
              onSelectArticle={setSelectedArticle}
              onSelectProductById={handleSelectProductById}
            />
          </div>
        )}

        {currentSection === 'about' && (
          <AboutPage />
        )}

        {currentSection === 'contact' && (
          <ContactPage 
            initialSubject={consultationSubject}
            initialProduct={consultationProduct}
            initialMessage={consultationMessage}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigateSection}
        onSelectCategory={handleSelectCategory}
        onOpenConsultation={() => handleOpenUnifiedConsultation()}
        onOpenQuote={() => handleOpenUnifiedConsultation('استعلام قیمت و پیش‌فاکتور')}
        companyInfo={companyInfo}
        categories={categories}
      />

      {/* Detail Modals (Technical specifications & info) */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onRequestQuote={handleRequestQuoteForProduct}
          onOpenConsultation={() => handleOpenUnifiedConsultation('مرغداری گوشتی', selectedProduct.name)}
        />
      )}

      {selectedProject && (
        <CaseStudyModal
          project={selectedProject}
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
          onOpenConsultation={() => handleOpenUnifiedConsultation('سوله و سالن صنعتی', undefined, `مشاوره درباره پروژه: ${selectedProject.title}`)}
        />
      )}

      {selectedService && (
        <ServiceDetailModal
          service={selectedService}
          isOpen={!!selectedService}
          onClose={() => setSelectedService(null)}
          onOpenConsultation={() => handleOpenUnifiedConsultation(selectedService.title, undefined, `مشاوره درباره خدمت: ${selectedService.title}`)}
        />
      )}

      {selectedArticle && (
        <ArticleDetailModal
          article={selectedArticle}
          isOpen={!!selectedArticle}
          onClose={() => setSelectedArticle(null)}
          onSelectProductById={handleSelectProductById}
        />
      )}

      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={setSelectedProduct}
        onSelectProject={setSelectedProject}
        onSelectArticle={setSelectedArticle}
      />

      <AiEngineerAssistantModal
        isOpen={isAiAssistantOpen}
        onClose={() => setIsAiAssistantOpen(false)}
        onOpenQuote={() => {
          setIsAiAssistantOpen(false);
          handleOpenUnifiedConsultation('استعلام قیمت و پیش‌فاکتور');
        }}
      />

    </div>
  );
};

export default function App() {
  return (
    <DataProvider>
      <MainAppContent />
    </DataProvider>
  );
}
