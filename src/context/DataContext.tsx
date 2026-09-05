import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  Project,
  Service,
  Article,
  CategoryItem,
  CompanyInfo,
  HeroCmsContent,
  AiAdvisorConfig,
  QuoteRequestItem,
  ConsultationRequestItem,
  AdminUser,
  QuoteFormData,
  ConsultationFormData,
  CustomerContact,
  MediaItem
} from '../types';
import {
  PRODUCTS,
  PROJECTS,
  SERVICES,
  ARTICLES,
  CATEGORIES_DATA,
  COMPANY_INFO,
  DEFAULT_HERO_CMS,
  DEFAULT_AI_CONFIG,
  INITIAL_QUOTES,
  INITIAL_CONSULTATIONS,
  INITIAL_MEDIA
} from '../data/mockData';

interface DataContextType {
  // Products
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  replaceAllProducts: (newProducts: Product[]) => void;

  // Projects
  projects: Project[];
  addProject: (project: Project) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  deleteProject: (id: string) => void;

  // Services
  services: Service[];
  addService: (service: Service) => void;
  updateService: (id: string, service: Partial<Service>) => void;
  deleteService: (id: string) => void;

  // Articles
  articles: Article[];
  addArticle: (article: Article) => void;
  updateArticle: (id: string, article: Partial<Article>) => void;
  deleteArticle: (id: string) => void;

  // Categories
  categories: CategoryItem[];
  addCategory: (category: CategoryItem) => void;
  updateCategory: (id: string, category: Partial<CategoryItem>) => void;
  deleteCategory: (id: string) => void;
  setCategories: React.Dispatch<React.SetStateAction<CategoryItem[]>>;

  // Company Info & CMS
  companyInfo: CompanyInfo;
  updateCompanyInfo: (info: Partial<CompanyInfo>) => void;
  heroCms: HeroCmsContent;
  updateHeroCms: (cms: Partial<HeroCmsContent>) => void;
  aiConfig: AiAdvisorConfig;
  updateAiConfig: (config: Partial<AiAdvisorConfig>) => void;

  // Quotes & Inquiries
  quoteRequests: QuoteRequestItem[];
  addQuoteRequest: (formData: QuoteFormData) => string;
  updateQuoteStatus: (id: string, status: QuoteRequestItem['status']) => void;
  updateQuoteAdminNotes: (id: string, notes: string) => void;
  deleteQuoteRequest: (id: string) => void;

  consultationRequests: ConsultationRequestItem[];
  addConsultationRequest: (formData: ConsultationFormData) => string;
  updateConsultationStatus: (id: string, status: ConsultationRequestItem['status']) => void;
  updateConsultationAdminNotes: (id: string, notes: string) => void;
  deleteConsultationRequest: (id: string) => void;

  // Customers
  customers: CustomerContact[];
  addCustomer: (customer: CustomerContact) => void;
  updateCustomer: (id: string, customer: Partial<CustomerContact>) => void;
  deleteCustomer: (id: string) => void;

  // Media Library
  mediaLibrary: MediaItem[];
  addMedia: (media: MediaItem) => void;
  deleteMedia: (id: string) => void;

  // Authentication
  adminUser: AdminUser | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<{ success: boolean; error?: string }>;
  setupPassword: (password: string) => Promise<{ success: boolean; error?: string }>;
  hasAdminPassword: boolean;
  logout: () => void;
  changePassword: (oldPassword: string, newPassword: string) => { success: boolean; error?: string };

  // System & Backup
  resetToDefaults: () => void;
  exportBackupJson: () => string;
  importBackupJson: (jsonData: string) => { success: boolean; error?: string };
}

const DataContext = createContext<DataContextType | null>(null);

const STORAGE_KEYS = {
  PRODUCTS: 'toyooran_products_v4',
  PROJECTS: 'toyooran_projects_v3',
  SERVICES: 'toyooran_services_v3',
  ARTICLES: 'toyooran_articles_v3',
  CATEGORIES: 'toyooran_categories_v4',
  COMPANY_INFO: 'toyooran_company_v3',
  HERO_CMS: 'toyooran_hero_cms_v3',
  AI_CONFIG: 'toyooran_ai_config_v3',
  QUOTES: 'toyooran_quotes_v3',
  CONSULTATIONS: 'toyooran_consultations_v3',
  ADMIN_USER: 'toyooran_admin_session_v3',
  ADMIN_PASSWORD: 'toyooran_admin_password_hash_v3',
  CUSTOMERS: 'toyooran_customers_v3',
  MEDIA: 'toyooran_media_v3',
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize from LocalStorage or Defaults
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    return saved ? JSON.parse(saved) : PRODUCTS;
  });

  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PROJECTS);
    return saved ? JSON.parse(saved) : PROJECTS;
  });

  const [services, setServices] = useState<Service[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SERVICES);
    return saved ? JSON.parse(saved) : SERVICES;
  });

  const [articles, setArticles] = useState<Article[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ARTICLES);
    const version = localStorage.getItem('ARTICLES_VERSION_3');
    
    if (saved && version) {
      return JSON.parse(saved);
    }
    
    // Force update local storage with the new rich articles
    localStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(ARTICLES));
    localStorage.setItem('ARTICLES_VERSION_3', 'true');
    return ARTICLES;
  });

  const [categories, setCategories] = useState<CategoryItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
    return saved ? JSON.parse(saved) : (CATEGORIES_DATA as CategoryItem[]);
  });

  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.COMPANY_INFO);
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        ...COMPANY_INFO,
        ...parsed,
        socialLinks: { ...COMPANY_INFO.socialLinks, ...(parsed.socialLinks || {}) },
        locations: parsed.locations && parsed.locations.length > 0 ? parsed.locations : COMPANY_INFO.locations
      } as CompanyInfo;
    }
    return COMPANY_INFO as CompanyInfo;
  });

  const [heroCms, setHeroCms] = useState<HeroCmsContent>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.HERO_CMS);
    return saved ? JSON.parse(saved) : DEFAULT_HERO_CMS;
  });

  const [aiConfig, setAiConfig] = useState<AiAdvisorConfig>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.AI_CONFIG);
    return saved ? JSON.parse(saved) : DEFAULT_AI_CONFIG;
  });

  const [quoteRequests, setQuoteRequests] = useState<QuoteRequestItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.QUOTES);
    return saved ? JSON.parse(saved) : INITIAL_QUOTES;
  });

  const [consultationRequests, setConsultationRequests] = useState<ConsultationRequestItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CONSULTATIONS);
    return saved ? JSON.parse(saved) : INITIAL_CONSULTATIONS;
  });

  
  const [customers, setCustomers] = useState<CustomerContact[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CUSTOMERS);
    return saved ? JSON.parse(saved) : [];
  });

  const [mediaLibrary, setMediaLibrary] = useState<MediaItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.MEDIA);
    const version = localStorage.getItem('MEDIA_VERSION_1');
    if (saved && version) {
      return JSON.parse(saved);
    }
    
    // Merge existing media with initial media if upgrading
    const parsed = saved ? JSON.parse(saved) : [];
    const merged = [...INITIAL_MEDIA];
    
    for (const item of parsed) {
      if (!merged.find(m => m.id === item.id)) {
        merged.push(item);
      }
    }
    
    localStorage.setItem(STORAGE_KEYS.MEDIA, JSON.stringify(merged));
    localStorage.setItem('MEDIA_VERSION_1', 'true');
    return merged;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CUSTOMERS, JSON.stringify(customers));
  }, [customers]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.MEDIA, JSON.stringify(mediaLibrary));
  }, [mediaLibrary]);

  const addCustomer = (customer: CustomerContact) => {
    setCustomers(prev => [customer, ...prev]);
  };
  const updateCustomer = (id: string, updates: Partial<CustomerContact>) => {
    setCustomers(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
  };
  const deleteCustomer = (id: string) => {
    setCustomers(prev => prev.filter(c => c.id !== id));
  };

  const addMedia = (media: MediaItem) => {
    setMediaLibrary(prev => [media, ...prev]);
  };
  const deleteMedia = (id: string) => {
    setMediaLibrary(prev => prev.filter(m => m.id !== id));
  };
  
  const [adminUser, setAdminUser] = useState<AdminUser | null>(() => {
    const saved = sessionStorage.getItem(STORAGE_KEYS.ADMIN_USER);
    return saved ? JSON.parse(saved) : null;
  });
  const [hasAdminPassword, setHasAdminPassword] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEYS.ADMIN_PASSWORD);
    return Boolean(stored && stored.startsWith('sha256:'));
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(articles));
  }, [articles]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.COMPANY_INFO, JSON.stringify(companyInfo));
  }, [companyInfo]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.HERO_CMS, JSON.stringify(heroCms));
  }, [heroCms]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.AI_CONFIG, JSON.stringify(aiConfig));
  }, [aiConfig]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.QUOTES, JSON.stringify(quoteRequests));
  }, [quoteRequests]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CONSULTATIONS, JSON.stringify(consultationRequests));
  }, [consultationRequests]);

  useEffect(() => {
    if (adminUser) {
      sessionStorage.setItem(STORAGE_KEYS.ADMIN_USER, JSON.stringify(adminUser));
    } else {
      sessionStorage.removeItem(STORAGE_KEYS.ADMIN_USER);
    }
  }, [adminUser]);

  // Product CRUD
  const addProduct = (product: Product) => {
    setProducts(prev => [product, ...prev]);
  };

  const updateProduct = (id: string, updated: Partial<Product>) => {
    setProducts(prev => prev.map(p => (p.id === id ? { ...p, ...updated } : p)));
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const replaceAllProducts = (newProducts: Product[]) => {
    setProducts(newProducts);
  };

  // Project CRUD
  const addProject = (project: Project) => {
    setProjects(prev => [project, ...prev]);
  };

  const updateProject = (id: string, updated: Partial<Project>) => {
    setProjects(prev => prev.map(p => (p.id === id ? { ...p, ...updated } : p)));
  };

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  // Service CRUD
  const addService = (service: Service) => {
    setServices(prev => [service, ...prev]);
  };

  const updateService = (id: string, updated: Partial<Service>) => {
    setServices(prev => prev.map(s => (s.id === id ? { ...s, ...updated } : s)));
  };

  const deleteService = (id: string) => {
    setServices(prev => prev.filter(s => s.id !== id));
  };

  // Article CRUD
  const addArticle = (article: Article) => {
    setArticles(prev => [article, ...prev]);
  };

  const updateArticle = (id: string, updated: Partial<Article>) => {
    setArticles(prev => prev.map(a => (a.id === id ? { ...a, ...updated } : a)));
  };

  const deleteArticle = (id: string) => {
    setArticles(prev => prev.filter(a => a.id !== id));
  };

  // Category CRUD
  const addCategory = (category: CategoryItem) => {
    setCategories(prev => [...prev, category]);
  };

  const updateCategory = (id: string, updated: Partial<CategoryItem>) => {
    setCategories(prev => prev.map(c => (c.id === id ? { ...c, ...updated } : c)));
  };

  const deleteCategory = (id: string) => {
    setCategories(prev => prev.filter(c => c.id !== id));
  };

  // Company info and CMS
  const updateCompanyInfo = (info: Partial<CompanyInfo>) => {
    setCompanyInfo(prev => ({ ...prev, ...info }));
  };

  const updateHeroCms = (cms: Partial<HeroCmsContent>) => {
    setHeroCms(prev => ({ ...prev, ...cms }));
  };

  const updateAiConfig = (config: Partial<AiAdvisorConfig>) => {
    setAiConfig(prev => ({ ...prev, ...config }));
  };

  // Quote Submissions
  const addQuoteRequest = (formData: QuoteFormData): string => {
    const id = `quote-${Date.now()}`;
    const now = new Date();
    const dateStr = `${now.toLocaleDateString('fa-IR')} - ${now.toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })}`;
    const newRequest: QuoteRequestItem = {
      id,
      createdAt: dateStr,
      status: 'new',
      formData,
      adminNotes: ''
    };
    setQuoteRequests(prev => [newRequest, ...prev]);
    return id;
  };

  const updateQuoteStatus = (id: string, status: QuoteRequestItem['status']) => {
    setQuoteRequests(prev => prev.map(q => (q.id === id ? { ...q, status } : q)));
  };

  const updateQuoteAdminNotes = (id: string, adminNotes: string) => {
    setQuoteRequests(prev => prev.map(q => (q.id === id ? { ...q, adminNotes } : q)));
  };

  const deleteQuoteRequest = (id: string) => {
    setQuoteRequests(prev => prev.filter(q => q.id !== id));
  };

  // Consultation Submissions
  const addConsultationRequest = (formData: ConsultationFormData): string => {
    const id = `cons-${Date.now()}`;
    const now = new Date();
    const dateStr = `${now.toLocaleDateString('fa-IR')} - ${now.toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })}`;
    const newRequest: ConsultationRequestItem = {
      id,
      createdAt: dateStr,
      status: 'new',
      formData,
      adminNotes: ''
    };
    setConsultationRequests(prev => [newRequest, ...prev]);
    return id;
  };

  const updateConsultationStatus = (id: string, status: ConsultationRequestItem['status']) => {
    setConsultationRequests(prev => prev.map(c => (c.id === id ? { ...c, status } : c)));
  };

  const updateConsultationAdminNotes = (id: string, adminNotes: string) => {
    setConsultationRequests(prev => prev.map(c => (c.id === id ? { ...c, adminNotes } : c)));
  };

  const deleteConsultationRequest = (id: string) => {
    setConsultationRequests(prev => prev.filter(c => c.id !== id));
  };

  // Auth Operations: no default credentials; passwords are never stored in plaintext.
  const hashPassword = async (password: string) => {
    const bytes = new TextEncoder().encode(password);
    const digest = await crypto.subtle.digest('SHA-256', bytes);
    return `sha256:${Array.from(new Uint8Array(digest)).map(byte => byte.toString(16).padStart(2, '0')).join('')}`;
  };

  const setupPassword = async (password: string) => {
    const value = password.trim();
    if (value.length < 12) {
      return { success: false, error: 'رمز اولیه باید حداقل ۱۲ کاراکتر باشد.' };
    }
    localStorage.setItem(STORAGE_KEYS.ADMIN_PASSWORD, await hashPassword(value));
    setHasAdminPassword(true);
    return { success: true };
  };

  const login = async (username: string, pass: string) => {
    if (!hasAdminPassword) return { success: false, error: 'برای شروع، یک رمز عبور قوی تعیین کنید.' };
    const normalizedUser = username.toLowerCase().trim();
    if (!['admin', 'toyooran', 'manager'].includes(normalizedUser)) {
      return { success: false, error: 'نام کاربری یا رمز عبور اشتباه است.' };
    }
    const lockKey = 'toyooran_admin_login_attempts_v1';
    const attempts = JSON.parse(localStorage.getItem(lockKey) || '{"count":0,"until":0}');
    if (attempts.until > Date.now()) return { success: false, error: 'تلاش‌های ورود زیاد است؛ چند دقیقه بعد دوباره امتحان کنید.' };
    const valid = await hashPassword(pass.trim()) === localStorage.getItem(STORAGE_KEYS.ADMIN_PASSWORD);
    if (!valid) {
      const count = attempts.count + 1;
      localStorage.setItem(lockKey, JSON.stringify(count >= 5 ? { count: 0, until: Date.now() + 5 * 60 * 1000 } : { count, until: 0 }));
      return { success: false, error: 'نام کاربری یا رمز عبور اشتباه است.' };
    }
    localStorage.removeItem(lockKey);
    setAdminUser({ username: normalizedUser, displayName: normalizedUser === 'admin' ? 'مدیریت کل سیستم' : 'مدیر مهندسی و فروش', role: 'superadmin' });
    return { success: true };
  };

  const logout = () => setAdminUser(null);

  const changePassword = async (oldPassword: string, newPassword: string) => {
    const value = newPassword.trim();
    if (await hashPassword(oldPassword.trim()) !== localStorage.getItem(STORAGE_KEYS.ADMIN_PASSWORD)) return { success: false, error: 'رمز عبور فعلی نادرست است.' };
    if (value.length < 12) return { success: false, error: 'رمز عبور جدید باید حداقل ۱۲ کاراکتر باشد.' };
    localStorage.setItem(STORAGE_KEYS.ADMIN_PASSWORD, await hashPassword(value));
    return { success: true };
  };

  // Reset to Defaults
  const resetToDefaults = () => {
    setProducts(PRODUCTS);
    setProjects(PROJECTS);
    setServices(SERVICES);
    setArticles(ARTICLES);
    setCategories(CATEGORIES_DATA as CategoryItem[]);
    setCompanyInfo(COMPANY_INFO as CompanyInfo);
    setHeroCms(DEFAULT_HERO_CMS);
    setAiConfig(DEFAULT_AI_CONFIG);
    setQuoteRequests(INITIAL_QUOTES);
    setConsultationRequests(INITIAL_CONSULTATIONS);
    localStorage.removeItem(STORAGE_KEYS.ADMIN_PASSWORD);
    setHasAdminPassword(false);
  };

  // Backup Export/Import
  const exportBackupJson = () => {
    const backupData = {
      version: '3.0.0',
      exportedAt: new Date().toISOString(),
      products,
      projects,
      services,
      articles,
      categories,
      companyInfo,
      heroCms,
      aiConfig,
      quoteRequests,
      consultationRequests,
    };
    return JSON.stringify(backupData, null, 2);
  };

  const importBackupJson = (jsonData: string) => {
    try {
      const parsed = JSON.parse(jsonData);
      if (parsed.products) setProducts(parsed.products);
      if (parsed.projects) setProjects(parsed.projects);
      if (parsed.services) setServices(parsed.services);
      if (parsed.articles) setArticles(parsed.articles);
      if (parsed.categories) setCategories(parsed.categories);
      if (parsed.companyInfo) setCompanyInfo(parsed.companyInfo);
      if (parsed.heroCms) setHeroCms(parsed.heroCms);
      if (parsed.aiConfig) setAiConfig(parsed.aiConfig);
      if (parsed.quoteRequests) setQuoteRequests(parsed.quoteRequests);
      if (parsed.consultationRequests) setConsultationRequests(parsed.consultationRequests);
      return { success: true };
    } catch {
      return { success: false, error: 'فایل بکاپ نامعتبر یا دارای فرمت نادرست است.' };
    }
  };

  return (
    <DataContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        replaceAllProducts,
        projects,
        addProject,
        updateProject,
        deleteProject,
        services,
        addService,
        updateService,
        deleteService,
        articles,
        addArticle,
        updateArticle,
        deleteArticle,
        categories,
        addCategory,
        updateCategory,
        deleteCategory,
        setCategories,
        companyInfo,
        updateCompanyInfo,
        heroCms,
        updateHeroCms,
        aiConfig,
        updateAiConfig,
        quoteRequests,
        addQuoteRequest,
        updateQuoteStatus,
        updateQuoteAdminNotes,
        deleteQuoteRequest,
        consultationRequests,
        addConsultationRequest,
        updateConsultationStatus,
        updateConsultationAdminNotes,
        deleteConsultationRequest,
    customers,
    addCustomer,
    updateCustomer,
    deleteCustomer,
    mediaLibrary,
    addMedia,
    deleteMedia,
        adminUser,
        isAuthenticated: !!adminUser,
        login,
        setupPassword,
        hasAdminPassword,
        logout,
        changePassword,
        resetToDefaults,
        exportBackupJson,
        importBackupJson,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
