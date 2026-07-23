"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  Download, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Trash2, 
  Settings, 
  Palette, 
  Edit3, 
  RefreshCw, 
  Check, 
  Info, 
  Type, 
  LayoutGrid, 
  Upload, 
  Layers, 
  Lock, 
  Unlock, 
  Eye, 
  EyeOff, 
  Maximize2, 
  Minimize2, 
  Copy, 
  Grid, 
  AlignLeft, 
  AlignCenter, 
  AlignRight,
  FileText,
  MousePointer,
  RotateCw,
  FolderOpen,
  Image as ImageIcon,
  CheckSquare,
  Quote as QuoteIcon,
  Play,
  Scissors
} from "lucide-react";
import { toast } from "sonner";

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

const stripHtmlTags = (str?: string) => {
  if (!str) return "";
  return str.replace(/<\/?[^>]+(>|$)/g, "");
};

const renderFormattedText = (text?: string) => {
  if (!text) return "";
  return <span dangerouslySetInnerHTML={{ __html: text }} />;
};

// ==========================================
// INTERFACES & SCHEMAS
// ==========================================

interface ElementStyle {
  x: number;
  y: number;
  width: number;
  height: number;
  visible: boolean;
  locked: boolean;
  opacity: number;
  rotation: number;
  align: "left" | "center" | "right";
  fontFamily: string;
  fontSize: number;
  lineHeight: number;
  letterSpacing: number;
  color: string;
  fontWeight: string;
  uppercase?: boolean;
  zIndex: number;
  padding?: number;
  margin?: number;
}

interface ImageElementStyle extends ElementStyle {
  mediaUrl: string;
  objectFit: "cover" | "contain" | "fill";
  brightness: number;
  contrast: number;
  borderRadius: number;
  borderWidth: number;
  borderColor: string;
  shadowEnabled?: boolean;
}

interface BulletElementStyle extends ElementStyle {
  bulletStyle: "check" | "dot" | "number";
  spacing: number;
  items: string[];
}

interface QuoteElementStyle extends ElementStyle {
  text: string;
  author: string;
  borderRadius: number;
  borderColor: string;
  backgroundColor: string;
}

interface CtaElementStyle extends ElementStyle {
  text: string;
  link: string;
  backgroundColor: string;
  textColor: string;
  borderRadius: number;
}

interface Slide {
  id: string;
  category: ElementStyle & { text: string };
  headline: ElementStyle & { text: string; maxLines: number; autoScale: boolean };
  featuredImage: ImageElementStyle;
  body: ElementStyle & { text: string; maxLines: number; autoScale: boolean };
  bullets: BulletElementStyle;
  quote: QuoteElementStyle;
  cta: CtaElementStyle;
  logo: ElementStyle & { logoUrl: string };
  divider: ElementStyle & { color: string; thickness: number };
  author: ElementStyle & { name: string; avatarUrl: string };
  footer: {
    brandName: string;
    logoEnabled: boolean;
    dividerEnabled: boolean;
    pageNumberEnabled: boolean;
    opacity: number;
    color: string;
    align: "left" | "center" | "right";
  };
}

type ElementKey = "category" | "headline" | "featuredImage" | "body" | "bullets" | "quote" | "cta" | "logo" | "divider" | "author";

// ==========================================
// CONSTANTS & INITIAL DATA
// ==========================================

const CANVAS_WIDTH = 1080;
const CANVAS_HEIGHT = 1350;

// Safe Area margins
const SAFE_TOP = 60;
const SAFE_BOTTOM = 70;
const SAFE_LEFT = 72;
const SAFE_RIGHT = 72;
const SAFE_WIDTH = CANVAS_WIDTH - SAFE_LEFT - SAFE_RIGHT; // 936px

const DEFAULT_FONTS = [
  { name: "Inter", value: "'Inter', sans-serif" },
  { name: "Outfit", value: "'Outfit', sans-serif" },
  { name: "SF Mono", value: "'SF Mono', 'Fira Code', monospace" },
  { name: "Playfair Display", value: "'Playfair Display', serif" },
  { name: "Neue Haas Grotesk", value: "'Neue Haas Grotesk', sans-serif" }
];

const DEFAULT_SLIDE = (index: number): Slide => ({
  id: `slide-${Date.now()}-${Math.random()}`,
  category: {
    text: "AI NEWS",
    x: SAFE_LEFT,
    y: SAFE_TOP,
    width: SAFE_WIDTH,
    height: 30,
    visible: true,
    locked: false,
    opacity: 1,
    rotation: 0,
    align: "left",
    fontFamily: "'Inter', sans-serif",
    fontSize: 14,
    lineHeight: 1.2,
    letterSpacing: 2,
    color: "#888888",
    fontWeight: "800",
    uppercase: true,
    zIndex: 10
  },
  headline: {
    text: "Moonshot built the world's largest open model",
    x: SAFE_LEFT,
    y: 110,
    width: SAFE_WIDTH,
    height: 150,
    visible: true,
    locked: false,
    opacity: 1,
    rotation: 0,
    align: "left",
    fontFamily: "'Inter', sans-serif",
    fontSize: 44,
    lineHeight: 1.08,
    letterSpacing: -1.2,
    color: "#000000",
    fontWeight: "900",
    maxLines: 3,
    autoScale: true,
    zIndex: 11
  },
  featuredImage: {
    mediaUrl: "",
    objectFit: "cover",
    brightness: 100,
    contrast: 100,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    shadowEnabled: true,
    x: SAFE_LEFT,
    y: 292,
    width: SAFE_WIDTH,
    height: 470,
    visible: true,
    locked: false,
    opacity: 1,
    rotation: 0,
    align: "center",
    fontFamily: "inherit",
    fontSize: 14,
    lineHeight: 1.2,
    letterSpacing: 0,
    color: "#000000",
    fontWeight: "normal",
    zIndex: 5
  },
  body: {
    text: `Kimi K3 is a 2.8 trillion parameter Mixture-of-Experts model, the largest open-weight AI system ever released. It runs a 1M token context, handles text and images, and lands close to the Western frontier.`,
    x: SAFE_LEFT,
    y: 802,
    width: SAFE_WIDTH,
    height: 180,
    visible: true,
    locked: false,
    opacity: 1,
    rotation: 0,
    align: "left",
    fontFamily: "'Inter', sans-serif",
    fontSize: 22,
    lineHeight: 1.5,
    letterSpacing: -0.2,
    color: "#111827",
    fontWeight: "400",
    maxLines: 6,
    autoScale: true,
    zIndex: 12
  },
  bullets: {
    bulletStyle: "check",
    spacing: 12,
    items: [
      "2.8 Trillion parameters Mixture-of-Experts",
      "Native 1 Million token context window",
      "Multi-modal: supports text and image inputs"
    ],
    x: SAFE_LEFT,
    y: 990,
    width: SAFE_WIDTH,
    height: 120,
    visible: false,
    locked: false,
    opacity: 1,
    rotation: 0,
    align: "left",
    fontFamily: "'Inter', sans-serif",
    fontSize: 18,
    lineHeight: 1.5,
    letterSpacing: 0,
    color: "#111827",
    fontWeight: "500",
    zIndex: 13
  },
  quote: {
    text: "This model marks a turning point in open-source AI capabilities.",
    author: "GrowXLabs Research Team",
    borderRadius: 16,
    borderColor: "#e5e7eb",
    backgroundColor: "#f9fafb",
    x: SAFE_LEFT,
    y: 802,
    width: SAFE_WIDTH,
    height: 160,
    visible: false,
    locked: false,
    opacity: 1,
    rotation: 0,
    align: "left",
    fontFamily: "'Inter', sans-serif",
    fontSize: 22,
    lineHeight: 1.4,
    letterSpacing: -0.5,
    color: "#000000",
    fontWeight: "700",
    zIndex: 14,
    padding: 24
  },
  cta: {
    text: "Read the Full Report",
    link: "https://growxlabs.tech/blog",
    backgroundColor: "#000000",
    textColor: "#ffffff",
    borderRadius: 12,
    x: SAFE_LEFT,
    y: 1100,
    width: 320,
    height: 56,
    visible: false,
    locked: false,
    opacity: 1,
    rotation: 0,
    align: "center",
    fontFamily: "'Inter', sans-serif",
    fontSize: 16,
    lineHeight: 1.2,
    letterSpacing: 1,
    color: "#ffffff",
    fontWeight: "700",
    zIndex: 15,
    padding: 16
  },
  logo: {
    logoUrl: "",
    x: SAFE_LEFT,
    y: SAFE_TOP,
    width: 48,
    height: 48,
    visible: false,
    locked: false,
    opacity: 1,
    rotation: 0,
    align: "left",
    fontFamily: "inherit",
    fontSize: 12,
    lineHeight: 1,
    letterSpacing: 0,
    color: "#000000",
    fontWeight: "normal",
    zIndex: 8
  },
  divider: {
    color: "#e5e7eb",
    thickness: 2,
    x: SAFE_LEFT,
    y: 275,
    width: SAFE_WIDTH,
    height: 2,
    visible: false,
    locked: false,
    opacity: 1,
    rotation: 0,
    align: "center",
    fontFamily: "inherit",
    fontSize: 12,
    lineHeight: 1,
    letterSpacing: 0,
    fontWeight: "normal",
    zIndex: 4
  },
  author: {
    name: "Sai Varshith Naidu",
    avatarUrl: "",
    x: SAFE_LEFT,
    y: 740,
    width: 250,
    height: 40,
    visible: false,
    locked: false,
    opacity: 1,
    rotation: 0,
    align: "left",
    fontFamily: "'Inter', sans-serif",
    fontSize: 14,
    lineHeight: 1.2,
    letterSpacing: 0,
    color: "#374151",
    fontWeight: "600",
    zIndex: 9
  },
  footer: {
    brandName: "GrowxLabs",
    logoEnabled: true,
    dividerEnabled: true,
    pageNumberEnabled: true,
    opacity: 1,
    color: "#000000",
    align: "left"
  }
});

// ==========================================
// TEMPLATE PRESETS
// ==========================================

const TEMPLATE_PRESETS: { id: string; name: string; setup: (slide: Slide) => Slide }[] = [
  {
    id: "ai-news",
    name: "AI News",
    setup: (slide: Slide): Slide => ({
      ...slide,
      category: { ...slide.category, text: "AI NEWS", visible: true },
      headline: { ...slide.headline, text: "Moonshot built the world's largest open model", visible: true },
      featuredImage: { ...slide.featuredImage, visible: true },
      body: { ...slide.body, text: "Kimi K3 is a 2.8 trillion parameter Mixture-of-Experts model, the largest open-weight AI system ever released.", visible: true },
      bullets: { ...slide.bullets, visible: false },
      quote: { ...slide.quote, visible: false },
      cta: { ...slide.cta, visible: false },
      author: { ...slide.author, visible: false },
      divider: { ...slide.divider, visible: false }
    })
  },
  {
    id: "research",
    name: "Research Report",
    setup: (slide: Slide): Slide => ({
      ...slide,
      category: { ...slide.category, text: "RESEARCH", visible: true },
      headline: { ...slide.headline, text: "Decentralized Training Runs Over Heterogeneous Networks", visible: true },
      featuredImage: { ...slide.featuredImage, visible: false },
      body: { ...slide.body, text: "Our empirical study shows decentralized networks can achieve up to 84% baseline efficiency under model compression pipelines.", visible: true },
      bullets: { ...slide.bullets, visible: true },
      quote: { ...slide.quote, visible: false },
      cta: { ...slide.cta, visible: false }
    })
  },
  {
    id: "services",
    name: "Our Services",
    setup: (slide: Slide): Slide => ({
      ...slide,
      category: { ...slide.category, text: "SERVICES", visible: true },
      headline: { ...slide.headline, text: "End-to-End AI Engineering & Agent Orchestration", visible: true },
      featuredImage: { ...slide.featuredImage, visible: true, height: 350 },
      body: { ...slide.body, text: "We configure multi-agent networks, clean pipeline nodes, and build high-performance search infrastructures tailored to your CRM workflow.", visible: true },
      bullets: { ...slide.bullets, visible: false },
      quote: { ...slide.quote, visible: false },
      cta: { ...slide.cta, visible: true }
    })
  },
  {
    id: "product-launch",
    name: "Product Launch",
    setup: (slide: Slide): Slide => ({
      ...slide,
      category: { ...slide.category, text: "PRODUCT LAUNCH", visible: true },
      headline: { ...slide.headline, text: "Introducing AstroChat v2: Native Multi-Agent Hub", visible: true },
      featuredImage: { ...slide.featuredImage, visible: true },
      body: { ...slide.body, text: "AstroChat integrates directly with BigQuery, features real-time vector caching, and handles user queries at 4x speed.", visible: true },
      bullets: { ...slide.bullets, visible: false },
      quote: { ...slide.quote, visible: false },
      cta: { ...slide.cta, visible: true }
    })
  },
  {
    id: "case-study",
    name: "Case Study",
    setup: (slide: Slide): Slide => ({
      ...slide,
      category: { ...slide.category, text: "CASE STUDY", visible: true },
      headline: { ...slide.headline, text: "How Lightyear scaled pipeline speeds by 400%", visible: true },
      featuredImage: { ...slide.featuredImage, visible: false },
      body: { ...slide.body, text: "By deploying autonomous crawlers for leads management, the product studio saved 30+ hours of engineering capacity per week.", visible: true },
      quote: { ...slide.quote, visible: true, text: "GrowXLabs changed how we approach pipeline velocity and internal tooling.", author: "Lightyear Leadership" },
      bullets: { ...slide.bullets, visible: false }
    })
  },
  {
    id: "timeline",
    name: "Project Timeline",
    setup: (slide: Slide): Slide => ({
      ...slide,
      category: { ...slide.category, text: "PROJECT TIMELINE", visible: true },
      headline: { ...slide.headline, text: "Roadmap to AI-Native Operations", visible: true },
      featuredImage: { ...slide.featuredImage, visible: false },
      body: { ...slide.body, text: "Here is the standard 3-phase rollout pipeline for team workspaces:", visible: true },
      bullets: { ...slide.bullets, visible: true, items: ["Phase 1: Ingestion & Vector Caching", "Phase 2: Agent Tooling & CRM Sync", "Phase 3: Automated Outbox Campaign Scheduling"] },
      quote: { ...slide.quote, visible: false }
    })
  },
  {
    id: "comparison",
    name: "Side Comparison",
    setup: (slide: Slide): Slide => ({
      ...slide,
      category: { ...slide.category, text: "COMPARISON", visible: true },
      headline: { ...slide.headline, text: "Decentralized vs Centralized Agent Hubs", visible: true },
      featuredImage: { ...slide.featuredImage, visible: false },
      body: { ...slide.body, text: "Decentralized hubs utilize local processing nodes which prevent outages, reduce token costs by 60%, and keep customer data in private containers.", visible: true },
      bullets: { ...slide.bullets, visible: true, items: ["Decentralized: Localized, fast, cost-effective", "Centralized: High coordination latency, centralized risk"] },
      quote: { ...slide.quote, visible: false }
    })
  },
  {
    id: "statistics",
    name: "Key Statistics",
    setup: (slide: Slide): Slide => ({
      ...slide,
      category: { ...slide.category, text: "PERFORMANCE STATS", visible: true },
      headline: { ...slide.headline, text: "+59.7% Speedup vs Baseline Triton Kernels", visible: true },
      featuredImage: { ...slide.featuredImage, visible: true },
      body: { ...slide.body, text: "This graphic shows the AttnRes GPU Kernel speedup benchmark across varying token limits.", visible: true },
      bullets: { ...slide.bullets, visible: false },
      quote: { ...slide.quote, visible: false },
      cta: { ...slide.cta, visible: false }
    })
  },
  {
    id: "quote",
    name: "Pull Quote",
    setup: (slide: Slide): Slide => ({
      ...slide,
      category: { ...slide.category, text: "EDITORIAL QUOTE", visible: true },
      headline: { ...slide.headline, text: "What our engineers say about agent pipelines:", visible: true },
      featuredImage: { ...slide.featuredImage, visible: false },
      body: { ...slide.body, visible: false },
      bullets: { ...slide.bullets, visible: false },
      quote: { ...slide.quote, visible: true },
      cta: { ...slide.cta, visible: false }
    })
  },
  {
    id: "hiring",
    name: "We Are Hiring",
    setup: (slide: Slide): Slide => ({
      ...slide,
      category: { ...slide.category, text: "GROWX CAREERS", visible: true },
      headline: { ...slide.headline, text: "Join our team as an AI Security Engineer", visible: true },
      featuredImage: { ...slide.featuredImage, visible: true },
      body: { ...slide.body, text: "We are seeking engineers to audit agent permissions, optimize model safety guardrails, and harden double-entry ledgers.", visible: true },
      bullets: { ...slide.bullets, visible: false },
      quote: { ...slide.quote, visible: false },
      cta: { ...slide.cta, visible: true, text: "Apply on Careers Portal" }
    })
  },
  {
    id: "tutorial",
    name: "Step Tutorial",
    setup: (slide: Slide): Slide => ({
      ...slide,
      category: { ...slide.category, text: "TUTORIALS", visible: true },
      headline: { ...slide.headline, text: "How to audit token usage in 3 steps", visible: true },
      featuredImage: { ...slide.featuredImage, visible: false },
      body: { ...slide.body, text: "Follow these steps to configure real-time token tracking alerts:", visible: true },
      bullets: { ...slide.bullets, visible: true, items: ["1. Connect your model client via telemetry hooks", "2. Map usage objects to double-entry ledger database", "3. Set trigger thresholds inside workflows engine"] },
      quote: { ...slide.quote, visible: false }
    })
  },
  {
    id: "announcement",
    name: "Announcement",
    setup: (slide: Slide): Slide => ({
      ...slide,
      category: { ...slide.category, text: "ANNOUNCEMENT", visible: true },
      headline: { ...slide.headline, text: "GrowXLabs raises seed round from top VC firms", visible: true },
      featuredImage: { ...slide.featuredImage, visible: true },
      body: { ...slide.body, text: "We are building the future of automated enterprise systems and CRM sales copilots. Let's make AI-native pipelines accessible to everyone.", visible: true },
      bullets: { ...slide.bullets, visible: false },
      quote: { ...slide.quote, visible: false }
    })
  }
];

export function EditorialCarouselClient() {
  const [slides, setSlides] = useState<Slide[]>([DEFAULT_SLIDE(0)]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedElement, setSelectedElement] = useState<ElementKey | null>(null);
  const [editorMode, setEditorMode] = useState<"fixed" | "free">("fixed");
  
  // Viewport Settings
  const [zoomScale, setZoomScale] = useState(0.4);
  const [showGrid, setShowGrid] = useState(true);
  const [showSafeArea, setShowSafeArea] = useState(true);
  const [showGuides, setShowGuides] = useState(true);

  // Active property tab
  const [activeTab, setActiveTab] = useState<"style" | "content" | "export">("content");

  // Drag-and-Drop / Resize Tracking
  const canvasRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef<{ startX: number; startY: number; elemX: number; elemY: number } | null>(null);
  const resizeStartRef = useRef<{ startX: number; startY: number; elemW: number; elemH: number } | null>(null);

  const activeSlide = slides[activeIndex] || DEFAULT_SLIDE(0);

  // Auto-fit responsive scale of editor canvas on window size changes
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setZoomScale(0.22);
      } else if (window.innerWidth < 1200) {
        setZoomScale(0.32);
      } else {
        setZoomScale(0.48);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Update layout positions when activeSlide changes or when layout mode toggles (Fixed Layout rules)
  useEffect(() => {
    if (editorMode === "fixed") {
      const updated = { ...activeSlide };
      
      // Strict Grid Offsets
      // Category: Y = 60
      updated.category.x = SAFE_LEFT;
      updated.category.y = SAFE_TOP;
      updated.category.width = SAFE_WIDTH;

      // Headline: Category bottom + 20px
      updated.headline.x = SAFE_LEFT;
      updated.headline.y = SAFE_TOP + updated.category.height + 20;
      updated.headline.width = SAFE_WIDTH;

      // Image: Fixed Y position at 292px, Width = 936px, Height = 470px
      updated.featuredImage.x = SAFE_LEFT;
      updated.featuredImage.y = 292;
      updated.featuredImage.width = SAFE_WIDTH;
      updated.featuredImage.height = 470;

      // Body: Image bottom + 40px
      updated.body.x = SAFE_LEFT;
      updated.body.y = updated.featuredImage.y + updated.featuredImage.height + 40; // 802px
      updated.body.width = SAFE_WIDTH;

      // Quote inherits same body position if active
      updated.quote.x = SAFE_LEFT;
      updated.quote.y = updated.featuredImage.y + updated.featuredImage.height + 40;
      updated.quote.width = SAFE_WIDTH;

      // Bullets start below body or quote
      updated.bullets.x = SAFE_LEFT;
      updated.bullets.y = updated.body.y + (updated.body.visible ? updated.body.height + 20 : 0);
      updated.bullets.width = SAFE_WIDTH;

      // CTA Button
      updated.cta.x = SAFE_LEFT;
      updated.cta.y = updated.bullets.y + (updated.bullets.visible ? updated.bullets.height + 20 : 40);

      // Logo
      updated.logo.x = SAFE_LEFT;
      updated.logo.y = SAFE_TOP;

      // Divider
      updated.divider.x = SAFE_LEFT;
      updated.divider.y = 275;
      updated.divider.width = SAFE_WIDTH;

      // Author
      updated.author.x = SAFE_LEFT;
      updated.author.y = 770;

      // Save back to state
      setSlides(prev => prev.map((s, i) => i === activeIndex ? updated : s));
    }
  }, [
    activeSlide.category.height, 
    activeSlide.category.visible,
    activeSlide.headline.height, 
    activeSlide.headline.visible,
    activeSlide.featuredImage.height,
    activeSlide.featuredImage.visible,
    activeSlide.body.height,
    activeSlide.body.visible,
    activeSlide.bullets.height,
    activeSlide.bullets.visible,
    editorMode, 
    activeIndex
  ]);

  // ==========================================
  // STATE MANAGEMENT HELPERS
  // ==========================================

  const updateSlideElement = (key: ElementKey, updates: any) => {
    setSlides(prev => prev.map((s, idx) => {
      if (idx !== activeIndex) return s;
      return {
        ...s,
        [key]: {
          ...s[key],
          ...updates
        }
      };
    }));
  };

  const updateSlideFooter = (updates: Partial<Slide["footer"]>) => {
    setSlides(prev => prev.map((s, idx) => {
      if (idx !== activeIndex) return s;
      return {
        ...s,
        footer: {
          ...s.footer,
          ...updates
        }
      };
    }));
  };

  // Add Slide
  const addSlide = () => {
    setSlides(prev => [...prev, DEFAULT_SLIDE(prev.length)]);
    setActiveIndex(prev => prev + 1);
    toast.success("Added new slide");
  };

  // Duplicate Slide
  const duplicateSlide = (idx: number) => {
    const clone = JSON.parse(JSON.stringify(slides[idx]));
    clone.id = `slide-${Date.now()}-${Math.random()}`;
    setSlides(prev => {
      const copy = [...prev];
      copy.splice(idx + 1, 0, clone);
      return copy;
    });
    setActiveIndex(idx + 1);
    toast.success("Duplicated slide");
  };

  // Delete Slide
  const deleteSlide = (idx: number) => {
    if (slides.length <= 1) {
      toast.error("Cannot delete the only remaining slide.");
      return;
    }
    setSlides(prev => prev.filter((_, i) => i !== idx));
    setActiveIndex(prev => Math.max(0, prev - 1));
    toast.success("Deleted slide");
  };

  // Preset Layout Selector
  const applyPreset = (presetId: string) => {
    const preset = TEMPLATE_PRESETS.find(p => p.id === presetId);
    if (!preset) return;
    setSlides(prev => prev.map((s, i) => i === activeIndex ? preset.setup(s) : s));
    toast.success(`Applied ${preset.name} template layout`);
  };

  // ==========================================
  // ELEMENT POINTER HANDLERS (DRAG & RESIZE)
  // ==========================================

  const handleElementMouseDown = (e: React.MouseEvent, key: ElementKey) => {
    if (e.button !== 0) return; // Left click only
    setSelectedElement(key);
    
    if (editorMode === "fixed") return; // Position locked in Fixed Mode
    
    const elem = activeSlide[key];
    if (elem.locked) return;

    e.stopPropagation();
    
    dragStartRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      elemX: elem.x,
      elemY: elem.y
    };

    document.addEventListener("mousemove", handleElementMouseMove);
    document.addEventListener("mouseup", handleElementMouseUp);
  };

  const handleElementMouseMove = (e: MouseEvent) => {
    if (!dragStartRef.current || !selectedElement) return;

    const dx = (e.clientX - dragStartRef.current.startX) / zoomScale;
    const dy = (e.clientY - dragStartRef.current.startY) / zoomScale;
    
    let newX = Math.round(dragStartRef.current.elemX + dx);
    let newY = Math.round(dragStartRef.current.elemY + dy);

    // Guide Snapping
    if (showGuides) {
      if (Math.abs(newX - SAFE_LEFT) < 10) newX = SAFE_LEFT;
      if (Math.abs((newX + activeSlide[selectedElement].width) - (CANVAS_WIDTH - SAFE_RIGHT)) < 10) {
        newX = CANVAS_WIDTH - SAFE_RIGHT - activeSlide[selectedElement].width;
      }
    }

    updateSlideElement(selectedElement, { x: newX, y: newY });
  };

  const handleElementMouseUp = () => {
    dragStartRef.current = null;
    document.removeEventListener("mousemove", handleElementMouseMove);
    document.removeEventListener("mouseup", handleElementMouseUp);
  };

  // Resizing Handle drag handler
  const handleResizeMouseDown = (e: React.MouseEvent, key: ElementKey) => {
    if (e.button !== 0) return;
    e.stopPropagation();
    setSelectedElement(key);

    if (editorMode === "fixed") return;
    
    const elem = activeSlide[key];
    if (elem.locked) return;

    resizeStartRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      elemW: elem.width,
      elemH: elem.height
    };

    document.addEventListener("mousemove", handleResizeMouseMove);
    document.addEventListener("mouseup", handleResizeMouseUp);
  };

  const handleResizeMouseMove = (e: MouseEvent) => {
    if (!resizeStartRef.current || !selectedElement) return;

    const dx = (e.clientX - resizeStartRef.current.startX) / zoomScale;
    const dy = (e.clientY - resizeStartRef.current.startY) / zoomScale;

    const newW = Math.max(50, Math.round(resizeStartRef.current.elemW + dx));
    const newH = Math.max(20, Math.round(resizeStartRef.current.elemH + dy));

    updateSlideElement(selectedElement, { width: newW, height: newH });
  };

  const handleResizeMouseUp = () => {
    resizeStartRef.current = null;
    document.removeEventListener("mousemove", handleResizeMouseMove);
    document.removeEventListener("mouseup", handleResizeMouseUp);
  };

  // ==========================================
  // EXPORT ENGINE (SVG, PNG, JPEG, PDF)
  // ==========================================

  const buildSvgString = (slide: Slide, index: number) => {
    const fontsMarkup = DEFAULT_FONTS.map(f => 
      `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Outfit:wght@400;600;800;900&family=Playfair+Display:ital,wght@0,700;1,700&display=swap');`
    ).join("\n");

    const renderTextMarkup = (el: ElementStyle & { text: string }) => {
      if (!el.visible) return "";
      const textTransform = el.uppercase ? "uppercase" : "none";
      const alignClass = el.align === "center" ? "text-center justify-center" : el.align === "right" ? "text-right justify-end" : "text-left justify-start";
      return `
        <div style="
          position: absolute;
          left: ${el.x}px;
          top: ${el.y}px;
          width: ${el.width}px;
          height: ${el.height}px;
          display: flex;
          align-items: flex-start;
          text-align: ${el.align};
          font-family: ${el.fontFamily};
          font-size: ${el.fontSize}px;
          font-weight: ${el.fontWeight};
          line-height: ${el.lineHeight};
          letter-spacing: ${el.letterSpacing}px;
          color: ${el.color};
          text-transform: ${textTransform};
          opacity: ${el.opacity};
          transform: rotate(${el.rotation}deg);
          box-sizing: border-box;
          overflow: hidden;
          z-index: ${el.zIndex || 1};
        " class="${alignClass}">
          ${el.text}
        </div>
      `;
    };

    const renderImageMarkup = (el: ImageElementStyle) => {
      if (!el.visible) return "";
      const borderStyle = el.borderWidth > 0 ? `border: ${el.borderWidth}px solid ${el.borderColor};` : "";
      const shadowStyle = el.shadowEnabled ? "box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);" : "";
      
      return `
        <div style="
          position: absolute;
          left: ${el.x}px;
          top: ${el.y}px;
          width: ${el.width}px;
          height: ${el.height}px;
          border-radius: ${el.borderRadius}px;
          opacity: ${el.opacity};
          transform: rotate(${el.rotation}deg);
          box-sizing: border-box;
          overflow: hidden;
          background: #f3f4f6;
          z-index: ${el.zIndex || 1};
          ${borderStyle}
          ${shadowStyle}
        ">
          ${el.mediaUrl ? `
            <img src="${el.mediaUrl}" style="width: 100%; height: 100%; object-fit: ${el.objectFit}; filter: brightness(${el.brightness}%) contrast(${el.contrast}%);" />
          ` : `
            <div style="width: 100%; height: 100%; background: linear-gradient(135deg, #e2e8f0, #cbd5e1); display: flex; align-items: center; justify-content: center; color: #475569; font-family: sans-serif; font-weight: bold; font-size: 24px;">
              Featured Asset
            </div>
          `}
        </div>
      `;
    };

    const renderBulletsMarkup = (el: BulletElementStyle) => {
      if (!el.visible) return "";
      return `
        <div style="
          position: absolute;
          left: ${el.x}px;
          top: ${el.y}px;
          width: ${el.width}px;
          height: ${el.height}px;
          opacity: ${el.opacity};
          font-family: ${el.fontFamily};
          font-size: ${el.fontSize}px;
          color: ${el.color};
          line-height: ${el.lineHeight};
          box-sizing: border-box;
          overflow: hidden;
          z-index: ${el.zIndex || 1};
        ">
          <ul style="list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: ${el.spacing}px;">
            ${el.items.map((item, idx) => `
              <li style="display: flex; align-items: flex-start; gap: 10px;">
                <span style="color: #000000; font-weight: bold;">${el.bulletStyle === "check" ? "✔" : el.bulletStyle === "number" ? `${idx + 1}.` : "•"}</span>
                <span>${item}</span>
              </li>
            `).join("")}
          </ul>
        </div>
      `;
    };

    const renderQuoteMarkup = (el: QuoteElementStyle) => {
      if (!el.visible) return "";
      return `
        <div style="
          position: absolute;
          left: ${el.x}px;
          top: ${el.y}px;
          width: ${el.width}px;
          height: ${el.height}px;
          opacity: ${el.opacity};
          font-family: ${el.fontFamily};
          box-sizing: border-box;
          overflow: hidden;
          background: ${el.backgroundColor};
          border-left: 5px solid ${el.borderColor};
          border-radius: ${el.borderRadius}px;
          padding: ${el.padding || 24}px;
          z-index: ${el.zIndex || 1};
        ">
          <p style="margin: 0 0 10px 0; font-size: ${el.fontSize}px; font-weight: ${el.fontWeight}; line-height: ${el.lineHeight}; color: ${el.color};">
            "${el.text}"
          </p>
          <span style="font-size: ${el.fontSize - 4}px; font-weight: 600; color: #6b7280;">
            — ${el.author}
          </span>
        </div>
      `;
    };

    const renderCtaMarkup = (el: CtaElementStyle) => {
      if (!el.visible) return "";
      return `
        <div style="
          position: absolute;
          left: ${el.x}px;
          top: ${el.y}px;
          width: ${el.width}px;
          height: ${el.height}px;
          opacity: ${el.opacity};
          display: flex;
          align-items: center;
          justify-content: center;
          background: ${el.backgroundColor};
          color: ${el.textColor};
          font-family: ${el.fontFamily};
          font-size: ${el.fontSize}px;
          font-weight: ${el.fontWeight};
          border-radius: ${el.borderRadius}px;
          padding: ${el.padding || 16}px;
          box-sizing: border-box;
          text-align: center;
          z-index: ${el.zIndex || 1};
        ">
          ${el.text}
        </div>
      `;
    };

    const renderLogoMarkup = (el: ElementStyle & { logoUrl: string }) => {
      if (!el.visible) return "";
      return `
        <div style="
          position: absolute;
          left: ${el.x}px;
          top: ${el.y}px;
          width: ${el.width}px;
          height: ${el.height}px;
          opacity: ${el.opacity};
          z-index: ${el.zIndex || 1};
        ">
          ${el.logoUrl ? `
            <img src="${el.logoUrl}" style="width:100%; height:100%; object-fit:contain;" />
          ` : `
            <div style="width:100%; height:100%; border-radius:50%; background:#0075de; color:white; display:flex; align-items:center; justify-content:center; font-family:sans-serif; font-weight:bold; font-size:12px;">GX</div>
          `}
        </div>
      `;
    };

    const renderDividerMarkup = (el: ElementStyle & { color: string; thickness: number }) => {
      if (!el.visible) return "";
      return `
        <div style="
          position: absolute;
          left: ${el.x}px;
          top: ${el.y}px;
          width: ${el.width}px;
          height: ${el.thickness}px;
          background: ${el.color};
          opacity: ${el.opacity};
          z-index: ${el.zIndex || 1};
        " />
      `;
    };

    const renderAuthorMarkup = (el: ElementStyle & { name: string; avatarUrl: string }) => {
      if (!el.visible) return "";
      return `
        <div style="
          position: absolute;
          left: ${el.x}px;
          top: ${el.y}px;
          width: ${el.width}px;
          height: ${el.height}px;
          opacity: ${el.opacity};
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: ${el.fontFamily};
          color: ${el.color};
          font-size: ${el.fontSize}px;
          font-weight: ${el.fontWeight};
          z-index: ${el.zIndex || 1};
        ">
          <div style="width: 32px; height: 32px; border-radius: 50%; overflow: hidden; background: #cbd5e1;">
            ${el.avatarUrl ? `<img src="${el.avatarUrl}" style="width:100%; height:100%; object-fit:cover;" />` : `<div style="width:100%; height:100%; background:#0075de;"/>`}
          </div>
          <span>${el.name}</span>
        </div>
      `;
    };

    const renderFooterMarkup = () => {
      const pageNumStr = String(index + 1).padStart(2, "0") + " / " + String(slides.length).padStart(2, "0");
      return `
        <div style="
          position: absolute;
          bottom: ${SAFE_BOTTOM}px;
          left: ${SAFE_LEFT}px;
          right: ${SAFE_RIGHT}px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: ${slide.footer.dividerEnabled ? `1px solid ${slide.footer.color}20` : "none"};
          font-family: 'SF Mono', 'Fira Code', monospace;
          opacity: ${slide.footer.opacity};
          color: ${slide.footer.color};
          box-sizing: border-box;
        ">
          <span style="font-weight: 800; font-size: 16px;">
            ${slide.footer.brandName ? `[${slide.footer.brandName}]` : ""}
          </span>
          ${slide.footer.pageNumberEnabled ? `
            <span style="font-weight: 500; font-size: 16px; opacity: 0.6;">
              ${pageNumStr}
            </span>
          ` : ""}
        </div>
      `;
    };

    return `
      <svg 
        viewBox="0 0 ${CANVAS_WIDTH} ${CANVAS_HEIGHT}" 
        width="${CANVAS_WIDTH}" 
        height="${CANVAS_HEIGHT}" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <style>
            ${fontsMarkup}
          </style>
        </defs>
        <foreignObject x="0" y="0" width="${CANVAS_WIDTH}" height="${CANVAS_HEIGHT}">
          <div xmlns="http://www.w3.org/1999/xhtml" style="
            width: ${CANVAS_WIDTH}px;
            height: ${CANVAS_HEIGHT}px;
            background: #ffffff;
            position: relative;
            box-sizing: border-box;
            overflow: hidden;
          ">
            ${renderLogoMarkup(slide.logo)}
            ${renderDividerMarkup(slide.divider)}
            ${renderTextMarkup(slide.category)}
            ${renderTextMarkup(slide.headline)}
            ${renderImageMarkup(slide.featuredImage)}
            ${renderTextMarkup(slide.body)}
            ${renderBulletsMarkup(slide.bullets)}
            ${renderQuoteMarkup(slide.quote)}
            ${renderCtaMarkup(slide.cta)}
            ${renderAuthorMarkup(slide.author)}
            ${renderFooterMarkup()}
          </div>
        </foreignObject>
      </svg>
    `;
  };

  const convertSvgToRaster = async (svgString: string, type: "png" | "jpeg"): Promise<string> => {
    return new Promise((resolve, reject) => {
      const svgBlob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
      const DOMURL = window.URL || window.webkitURL || window;
      const url = DOMURL.createObjectURL(svgBlob);
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = CANVAS_WIDTH;
        canvas.height = CANVAS_HEIGHT;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          if (type === "jpeg") {
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
          }
          ctx.drawImage(img, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
          const dataUrl = canvas.toDataURL(`image/${type}`, 0.95);
          DOMURL.revokeObjectURL(url);
          resolve(dataUrl);
        } else {
          DOMURL.revokeObjectURL(url);
          reject(new Error("Canvas context error"));
        }
      };
      img.onerror = (e) => {
        DOMURL.revokeObjectURL(url);
        reject(e);
      };
      img.src = url;
    });
  };

  const handleDownloadSlideSvg = (idx: number) => {
    try {
      const svgStr = buildSvgString(slides[idx], idx);
      const blob = new Blob([svgStr], { type: "image/svg+xml;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${activeSlide.footer.brandName.toLowerCase()}-slide-${idx + 1}.svg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      toast.success(`Exported Slide ${idx + 1} as clean vector SVG!`);
    } catch (e) {
      toast.error("SVG generation failed");
    }
  };

  const handleDownloadSlideRaster = async (idx: number, type: "png" | "jpeg") => {
    try {
      const svgStr = buildSvgString(slides[idx], idx);
      const dataUrl = await convertSvgToRaster(svgStr, type);
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `${activeSlide.footer.brandName.toLowerCase()}-slide-${idx + 1}.${type}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success(`Exported Slide ${idx + 1} as ${type.toUpperCase()}!`);
    } catch (e) {
      toast.error(`Failed to export slide as ${type.toUpperCase()}`);
    }
  };

  const handleDownloadPdf = async () => {
    try {
      const { jsPDF } = await import("jspdf");
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [CANVAS_WIDTH, CANVAS_HEIGHT]
      });

      for (let i = 0; i < slides.length; i++) {
        if (i > 0) doc.addPage();
        const svgStr = buildSvgString(slides[i], i);
        const dataUrl = await convertSvgToRaster(svgStr, "png");
        doc.addImage(dataUrl, "PNG", 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      }

      doc.save(`${activeSlide.footer.brandName.toLowerCase()}-carousel.pdf`);
      toast.success("Exported full carousel as PDF!");
    } catch (e) {
      toast.error("Failed to export PDF file");
    }
  };

  const handleDownloadAllSlidesSvg = () => {
    slides.forEach((_, idx) => {
      handleDownloadSlideSvg(idx);
    });
    toast.success(`Started downloading all ${slides.length} slides!`);
  };

  // ==========================================
  // VIEW RENDER PARTS
  // ==========================================

  const renderCanvasElement = (key: ElementKey, children: React.ReactNode) => {
    const elem = activeSlide[key];
    if (!elem.visible) return null;

    const isSelected = selectedElement === key;
    const scaleFactor = zoomScale;

    // Element styling wrapper
    const containerStyle: React.CSSProperties = {
      position: "absolute",
      left: `${elem.x * scaleFactor}px`,
      top: `${elem.y * scaleFactor}px`,
      width: `${elem.width * scaleFactor}px`,
      height: `${elem.height * scaleFactor}px`,
      opacity: elem.opacity,
      transform: `rotate(${elem.rotation}deg)`,
      cursor: editorMode === "free" && !elem.locked ? "move" : "pointer",
      boxSizing: "border-box",
      userSelect: "none",
      zIndex: elem.zIndex || 1
    };

    return (
      <div 
        style={containerStyle}
        onMouseDown={(e) => handleElementMouseDown(e, key)}
        className={`group relative ${isSelected ? "ring-2 ring-[#0075de] ring-offset-2" : "hover:outline hover:outline-dashed hover:outline-neutral-400"}`}
      >
        {children}
        
        {/* Resize Handle overlay */}
        {isSelected && editorMode === "free" && !elem.locked && (
          <div 
            onMouseDown={(e) => handleResizeMouseDown(e, key)}
            className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-white border border-[#0075de] rounded-full translate-x-1 translate-y-1 cursor-se-resize z-50 flex items-center justify-center shadow"
          >
            <div className="w-1.5 h-1.5 bg-[#0075de] rounded-full" />
          </div>
        )}

        {/* Lock Overlay */}
        {elem.locked && isSelected && (
          <div className="absolute top-1 right-1 bg-white/90 border border-neutral-200 rounded p-1 shadow-sm flex items-center gap-0.5 z-50">
            <Lock size={10} className="text-neutral-500" />
            <span className="text-[7px] font-bold text-neutral-500 uppercase tracking-widest">Locked</span>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[calc(100vh-200px)]">
      
      {/* ==========================================
          LEFT PANEL: SLIDE DECK BAR
          ========================================== */}
      <div className="lg:col-span-2 flex flex-col space-y-4">
        <div className="panel-card space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-neutral-100">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">Slides Deck</span>
            <span className="text-[10px] font-bold bg-neutral-100 text-neutral-700 px-2 py-0.5 rounded-full">
              {slides.length} slides
            </span>
          </div>

          <div className="flex flex-col gap-2.5 max-h-[360px] lg:max-h-[460px] overflow-y-auto custom-scrollbar pr-1">
            {slides.map((slide, sIdx) => (
              <div 
                key={slide.id}
                onClick={() => {
                  setActiveIndex(sIdx);
                  setSelectedElement(null);
                }}
                className={`relative flex items-center justify-between p-3 rounded-xl cursor-pointer border transition-all ${
                  activeIndex === sIdx 
                    ? "bg-[#0075de]/5 border-[#0075de] shadow-sm shadow-[#0075de]/10" 
                    : "bg-white border-neutral-200 hover:bg-neutral-50"
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="text-xs font-mono font-bold text-neutral-400">
                    {String(sIdx + 1).padStart(2, "0")}
                  </span>
                  <div className="flex flex-col text-left min-w-0">
                    <span className="text-xs font-bold text-neutral-900 truncate w-24">
                      {slide.headline.text ? stripHtmlTags(slide.headline.text) : "Empty Slide"}
                    </span>
                    <span className="text-[9px] text-neutral-500 font-medium uppercase tracking-wider">
                      {slide.category.text || "No tag"}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      duplicateSlide(sIdx);
                    }}
                    className="p-1 hover:bg-neutral-100 rounded text-neutral-500"
                    title="Duplicate"
                  >
                    <Copy size={11} />
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteSlide(sIdx);
                    }}
                    className="p-1 hover:bg-red-50 hover:text-red-600 rounded text-neutral-500"
                    title="Delete"
                  >
                    <Trash2 size={11} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button 
            onClick={addSlide}
            className="w-full py-2.5 rounded-xl border border-dashed border-neutral-300 text-neutral-600 hover:bg-neutral-50 flex items-center justify-center gap-1.5 text-xs font-bold transition-all"
          >
            <Plus size={14} /> Add New Slide
          </button>
        </div>

        {/* Layout Presets selector */}
        <div className="panel-card space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 block pb-2 border-b border-neutral-100">Templates</span>
          <div className="grid grid-cols-2 gap-2 max-h-[220px] overflow-y-auto pr-1">
            {TEMPLATE_PRESETS.map(preset => (
              <button 
                key={preset.id}
                onClick={() => applyPreset(preset.id)}
                className="py-2 px-1 border border-neutral-200 hover:border-neutral-900 rounded-lg text-[9px] font-bold text-neutral-700 bg-white hover:bg-neutral-50 text-center truncate transition-all"
                title={preset.name}
              >
                {preset.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ==========================================
          CENTER PANEL: CANVAS STAGE
          ========================================== */}
      <div className="lg:col-span-6 flex flex-col items-center">
        
        {/* Canvas Toolbar Controls */}
        <div className="flex flex-wrap items-center justify-between w-full max-w-[540px] mb-4 gap-3 bg-white border border-neutral-200 px-4 py-2.5 rounded-2xl shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 font-mono">Layout:</span>
            <div className="flex bg-neutral-100 p-0.5 rounded-lg border border-neutral-200">
              <button 
                onClick={() => setEditorMode("fixed")}
                className={`px-3 py-1 rounded-md text-[10px] font-bold transition-all uppercase tracking-wider ${
                  editorMode === "fixed" ? "bg-white text-black shadow-sm" : "text-neutral-500 hover:text-black"
                }`}
              >
                Fixed
              </button>
              <button 
                onClick={() => setEditorMode("free")}
                className={`px-3 py-1 rounded-md text-[10px] font-bold transition-all uppercase tracking-wider ${
                  editorMode === "free" ? "bg-white text-black shadow-sm" : "text-neutral-500 hover:text-black"
                }`}
              >
                Free
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => setShowSafeArea(!showSafeArea)}
              className={`p-1.5 rounded-lg border transition-all ${
                showSafeArea ? "bg-[#0075de]/10 border-[#0075de] text-[#0075de]" : "bg-white border-neutral-200 text-neutral-400 hover:text-neutral-900"
              }`}
              title="Toggle Safe Area (Top 60, Bottom 70, Left 72, Right 72)"
            >
              <Maximize2 size={13} />
            </button>
            <button 
              onClick={() => setShowGrid(!showGrid)}
              className={`p-1.5 rounded-lg border transition-all ${
                showGrid ? "bg-[#0075de]/10 border-[#0075de] text-[#0075de]" : "bg-white border-neutral-200 text-neutral-400 hover:text-neutral-900"
              }`}
              title="Toggle Grid Lines"
            >
              <Grid size={13} />
            </button>
            <div className="h-5 w-px bg-neutral-200 mx-1" />
            <button 
              onClick={() => setZoomScale(prev => Math.max(0.2, prev - 0.05))}
              className="p-1 hover:bg-neutral-100 rounded text-neutral-500"
            >
              <Minimize2 size={13} />
            </button>
            <span className="text-[10px] font-mono font-bold text-neutral-600">
              {Math.round(zoomScale * 100)}%
            </span>
            <button 
              onClick={() => setZoomScale(prev => Math.min(1.2, prev + 0.05))}
              className="p-1 hover:bg-neutral-100 rounded text-neutral-500"
            >
              <Maximize2 size={13} />
            </button>
          </div>
        </div>

        {/* Viewport Box container */}
        <div className="w-full flex items-center justify-center overflow-auto p-4 bg-[#18181b] border border-neutral-800 rounded-[32px] min-h-[500px]">
          <div 
            ref={canvasRef}
            className="bg-white shadow-2xl relative select-none overflow-hidden shrink-0 border border-neutral-700/50"
            style={{
              width: `${CANVAS_WIDTH * zoomScale}px`,
              height: `${CANVAS_HEIGHT * zoomScale}px`,
              boxSizing: "border-box"
            }}
          >
            {/* Safe Area guideline overlays */}
            {showSafeArea && (
              <div 
                className="absolute border border-dashed border-[#0075de]/40 pointer-events-none z-40"
                style={{
                  top: `${SAFE_TOP * zoomScale}px`,
                  bottom: `${SAFE_BOTTOM * zoomScale}px`,
                  left: `${SAFE_LEFT * zoomScale}px`,
                  right: `${SAFE_RIGHT * zoomScale}px`
                }}
              />
            )}

            {/* Grid background overlay */}
            {showGrid && (
              <div 
                className="absolute inset-0 pointer-events-none z-0 opacity-[0.05]"
                style={{
                  backgroundImage: "radial-gradient(#000000 1.5px, transparent 1.5px)",
                  backgroundSize: `${30 * zoomScale}px ${30 * zoomScale}px`
                }}
              />
            )}

            {/* Content Layers */}

            {/* Logo */}
            {renderCanvasElement("logo", (
              <div className="w-full h-full">
                {activeSlide.logo.logoUrl ? (
                  <img src={activeSlide.logo.logoUrl} className="w-full h-full object-contain" />
                ) : (
                  <div className="w-full h-full rounded-full bg-[#0075de] text-white font-bold flex items-center justify-center text-[10px]" style={{ fontSize: `${12 * zoomScale}px` }}>
                    GX
                  </div>
                )}
              </div>
            ))}

            {/* Divider */}
            {renderCanvasElement("divider", (
              <div 
                className="w-full h-full"
                style={{
                  background: activeSlide.divider.color,
                  height: `${activeSlide.divider.thickness * zoomScale}px`
                }}
              />
            ))}
            
            {/* Category tag */}
            {renderCanvasElement("category", (
              <div 
                className="w-full h-full font-sans uppercase tracking-widest truncate"
                style={{
                  fontSize: `${activeSlide.category.fontSize * zoomScale}px`,
                  fontWeight: activeSlide.category.fontWeight,
                  color: activeSlide.category.color,
                  letterSpacing: `${activeSlide.category.letterSpacing * zoomScale}px`,
                  textAlign: activeSlide.category.align
                }}
              >
                {activeSlide.category.text}
              </div>
            ))}

            {/* Headline */}
            {renderCanvasElement("headline", (
              <div 
                className="w-full h-full font-sans tracking-tight leading-tight"
                style={{
                  fontSize: `${activeSlide.headline.fontSize * zoomScale}px`,
                  fontWeight: activeSlide.headline.fontWeight,
                  color: activeSlide.headline.color,
                  lineHeight: activeSlide.headline.lineHeight,
                  letterSpacing: `${activeSlide.headline.letterSpacing * zoomScale}px`,
                  textAlign: activeSlide.headline.align
                }}
              >
                {renderFormattedText(activeSlide.headline.text)}
              </div>
            ))}

            {/* Featured Image */}
            {renderCanvasElement("featuredImage", (
              <div 
                className="w-full h-full bg-[#050505] overflow-hidden"
                style={{
                  borderRadius: `${activeSlide.featuredImage.borderRadius * zoomScale}px`,
                  border: activeSlide.featuredImage.borderWidth > 0 
                    ? `${activeSlide.featuredImage.borderWidth * zoomScale}px solid ${activeSlide.featuredImage.borderColor}`
                    : "none"
                }}
              >
                {activeSlide.featuredImage.mediaUrl ? (
                  <img 
                    src={activeSlide.featuredImage.mediaUrl}
                    alt="Featured Image Asset"
                    className="w-full h-full"
                    style={{
                      objectFit: activeSlide.featuredImage.objectFit,
                      filter: `brightness(${activeSlide.featuredImage.brightness}%) contrast(${activeSlide.featuredImage.contrast}%)`
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-center p-6 text-white/50 bg-neutral-900 border border-neutral-800 rounded-2xl">
                    <span className="font-extrabold uppercase tracking-wider text-[11px] mb-1" style={{ fontSize: `${12 * zoomScale}px` }}>
                      Featured Image Placeholder
                    </span>
                    <span className="text-[9px] opacity-60" style={{ fontSize: `${9 * zoomScale}px` }}>
                      Upload custom photo in Right Panel
                    </span>
                  </div>
                )}
              </div>
            ))}

            {/* Body copy */}
            {renderCanvasElement("body", (
              <div 
                className="w-full h-full font-sans whitespace-pre-line text-neutral-800"
                style={{
                  fontSize: `${activeSlide.body.fontSize * zoomScale}px`,
                  fontWeight: activeSlide.body.fontWeight,
                  color: activeSlide.body.color,
                  lineHeight: activeSlide.body.lineHeight,
                  letterSpacing: `${activeSlide.body.letterSpacing * zoomScale}px`,
                  textAlign: activeSlide.body.align
                }}
              >
                {renderFormattedText(activeSlide.body.text)}
              </div>
            ))}

            {/* Bullets */}
            {renderCanvasElement("bullets", (
              <div 
                className="w-full h-full font-sans text-neutral-800"
                style={{
                  fontSize: `${activeSlide.bullets.fontSize * zoomScale}px`,
                  fontWeight: activeSlide.bullets.fontWeight,
                  color: activeSlide.bullets.color,
                  lineHeight: activeSlide.bullets.lineHeight
                }}
              >
                <ul className="list-none m-0 p-0" style={{ display: "flex", flexDirection: "column", gap: `${activeSlide.bullets.spacing * zoomScale}px` }}>
                  {activeSlide.bullets.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-black font-bold">
                        {activeSlide.bullets.bulletStyle === "check" ? "✔" : activeSlide.bullets.bulletStyle === "number" ? `${idx + 1}.` : "•"}
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Quote Box */}
            {renderCanvasElement("quote", (
              <div 
                className="w-full h-full font-sans"
                style={{
                  background: activeSlide.quote.backgroundColor,
                  borderLeft: `${5 * zoomScale}px solid ${activeSlide.quote.borderColor}`,
                  borderRadius: `${activeSlide.quote.borderRadius * zoomScale}px`,
                  padding: `${(activeSlide.quote.padding || 24) * zoomScale}px`
                }}
              >
                <p 
                  className="m-0 mb-2 font-bold"
                  style={{
                    fontSize: `${activeSlide.quote.fontSize * zoomScale}px`,
                    fontWeight: activeSlide.quote.fontWeight,
                    lineHeight: activeSlide.quote.lineHeight,
                    color: activeSlide.quote.color
                  }}
                >
                  "{activeSlide.quote.text}"
                </p>
                <span className="text-neutral-500 font-semibold" style={{ fontSize: `${(activeSlide.quote.fontSize - 4) * zoomScale}px` }}>
                  — {activeSlide.quote.author}
                </span>
              </div>
            ))}

            {/* CTA Button */}
            {renderCanvasElement("cta", (
              <div 
                className="w-full h-full flex items-center justify-center"
                style={{
                  background: activeSlide.cta.backgroundColor,
                  color: activeSlide.cta.textColor,
                  borderRadius: `${activeSlide.cta.borderRadius * zoomScale}px`,
                  fontSize: `${activeSlide.cta.fontSize * zoomScale}px`,
                  fontWeight: activeSlide.cta.fontWeight,
                  fontFamily: activeSlide.cta.fontFamily,
                  padding: `${(activeSlide.cta.padding || 16) * zoomScale}px`,
                  letterSpacing: `${activeSlide.cta.letterSpacing * zoomScale}px`
                }}
              >
                {activeSlide.cta.text}
              </div>
            ))}

            {/* Author */}
            {renderCanvasElement("author", (
              <div className="w-full h-full flex items-center gap-2">
                <div 
                  className="rounded-full bg-neutral-200 overflow-hidden shrink-0 border border-neutral-300"
                  style={{ width: `${32 * zoomScale}px`, height: `${32 * zoomScale}px` }}
                >
                  {activeSlide.author.avatarUrl ? (
                    <img src={activeSlide.author.avatarUrl} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-[#0075de]" />
                  )}
                </div>
                <div className="flex flex-col text-left">
                  <span 
                    className="font-bold text-neutral-800 leading-tight" 
                    style={{ fontSize: `${activeSlide.author.fontSize * zoomScale}px` }}
                  >
                    {activeSlide.author.name}
                  </span>
                </div>
              </div>
            ))}

            {/* Pinned Footer */}
            <div 
              className="absolute w-full flex items-center justify-between border-t border-neutral-100 pointer-events-none"
              style={{
                bottom: `${SAFE_BOTTOM * zoomScale}px`,
                left: `${SAFE_LEFT * zoomScale}px`,
                width: `${SAFE_WIDTH * zoomScale}px`,
                height: `${50 * zoomScale}px`,
                borderTop: activeSlide.footer.dividerEnabled ? `1.5px solid ${activeSlide.footer.color}20` : "none",
                opacity: activeSlide.footer.opacity,
                color: activeSlide.footer.color,
                fontFamily: "'SF Mono', 'Fira Code', monospace"
              }}
            >
              <span className="font-extrabold uppercase" style={{ fontSize: `${16 * zoomScale}px` }}>
                {activeSlide.footer.brandName ? `[${activeSlide.footer.brandName}]` : ""}
              </span>
              {activeSlide.footer.pageNumberEnabled && (
                <span className="font-bold opacity-60" style={{ fontSize: `${16 * zoomScale}px` }}>
                  {String(activeIndex + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
                </span>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* ==========================================
          RIGHT PANEL: ELEMENT PROPERTIES
          ========================================== */}
      <div className="lg:col-span-4 flex flex-col space-y-4">
        
        {/* Element Selection & Tab Switchers */}
        <div className="panel-card space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-neutral-100">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">Selected Layer</span>
            {selectedElement ? (
              <span className="text-[10px] font-bold bg-[#0075de]/10 text-[#0075de] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                {selectedElement}
              </span>
            ) : (
              <span className="text-[10px] font-bold bg-neutral-100 text-neutral-500 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                None Selected
              </span>
            )}
          </div>

          <div className="grid grid-cols-3 gap-1 bg-neutral-100 p-1 rounded-xl">
            {(["content", "style", "export"] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 px-1 text-center font-bold text-[10px] uppercase tracking-wider rounded-lg transition-all ${
                  activeTab === tab ? "bg-white text-black shadow-sm" : "text-neutral-500 hover:text-black"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeTab === "content" && (
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { id: "category", label: "Category" },
                { id: "headline", label: "Headline" },
                { id: "featuredImage", label: "Image" },
                { id: "body", label: "Body Copy" },
                { id: "bullets", label: "Bullets" },
                { id: "quote", label: "Quote" },
                { id: "cta", label: "CTA" },
                { id: "logo", label: "Logo" },
                { id: "divider", label: "Divider" },
                { id: "author", label: "Author" }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => setSelectedElement(item.id as ElementKey)}
                  className={`py-2 px-1 border rounded-lg text-[9px] font-bold text-center transition-all ${
                    selectedElement === item.id 
                      ? "bg-[#0075de]/5 border-[#0075de] text-[#0075de]" 
                      : "bg-white border-neutral-200 text-neutral-700 hover:bg-neutral-50"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Tab 1: Content Fields editor */}
        {activeTab === "content" && selectedElement && (
          <div className="panel-card space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-neutral-100">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">Edit content</span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => updateSlideElement(selectedElement, { visible: !activeSlide[selectedElement].visible })}
                  className="p-1 hover:bg-neutral-100 rounded text-neutral-500"
                  title="Toggle Visibility"
                >
                  {activeSlide[selectedElement].visible ? <Eye size={13} /> : <EyeOff size={13} className="text-red-500" />}
                </button>
                <button
                  onClick={() => updateSlideElement(selectedElement, { locked: !activeSlide[selectedElement].locked })}
                  className="p-1 hover:bg-neutral-100 rounded text-neutral-500"
                  title="Toggle Lock (Free Mode)"
                >
                  {activeSlide[selectedElement].locked ? <Lock size={13} /> : <Unlock size={13} />}
                </button>
              </div>
            </div>

            {selectedElement === "category" && (
              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">Category Tag Text</label>
                <input
                  type="text"
                  value={activeSlide.category.text}
                  onChange={(e) => updateSlideElement("category", { text: e.target.value })}
                  className="w-full h-10 px-3 bg-white border border-neutral-200 rounded-lg text-xs font-semibold"
                />
              </div>
            )}

            {selectedElement === "headline" && (
              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">Headline Text</label>
                <textarea
                  value={activeSlide.headline.text}
                  rows={3}
                  onChange={(e) => updateSlideElement("headline", { text: e.target.value })}
                  className="w-full p-3 bg-white border border-neutral-200 rounded-lg text-xs font-semibold resize-none"
                />
              </div>
            )}

            {selectedElement === "featuredImage" && (
              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">Image Asset URL</label>
                <input
                  type="text"
                  placeholder="https://example.com/image.jpg"
                  value={activeSlide.featuredImage.mediaUrl}
                  onChange={(e) => updateSlideElement("featuredImage", { mediaUrl: e.target.value })}
                  className="w-full h-10 px-3 bg-white border border-neutral-200 rounded-lg text-xs font-semibold"
                />
              </div>
            )}

            {selectedElement === "body" && (
              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">Body Copy</label>
                <textarea
                  value={activeSlide.body.text}
                  rows={4}
                  onChange={(e) => updateSlideElement("body", { text: e.target.value })}
                  className="w-full p-3 bg-white border border-neutral-200 rounded-lg text-xs font-semibold resize-none font-sans"
                />
              </div>
            )}

            {selectedElement === "bullets" && (
              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 block">Bullet Items</label>
                {activeSlide.bullets.items.map((bullet, idx) => (
                  <div key={idx} className="flex gap-2">
                    <input
                      type="text"
                      value={bullet}
                      onChange={(e) => {
                        const next = [...activeSlide.bullets.items];
                        next[idx] = e.target.value;
                        updateSlideElement("bullets", { items: next });
                      }}
                      className="flex-1 h-9 px-3 bg-white border border-neutral-200 rounded-lg text-xs font-semibold"
                    />
                    <button
                      onClick={() => {
                        const next = activeSlide.bullets.items.filter((_, i) => i !== idx);
                        updateSlideElement("bullets", { items: next });
                      }}
                      className="p-1 bg-red-50 text-red-500 hover:bg-red-100 rounded"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => {
                    updateSlideElement("bullets", { items: [...activeSlide.bullets.items, "New bullet point"] });
                  }}
                  className="w-full py-2 border border-dashed rounded-lg text-xs font-bold text-neutral-600 hover:bg-neutral-50"
                >
                  + Add Bullet Item
                </button>
              </div>
            )}

            {selectedElement === "quote" && (
              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">Quote Text</label>
                  <textarea
                    value={activeSlide.quote.text}
                    rows={3}
                    onChange={(e) => updateSlideElement("quote", { text: e.target.value })}
                    className="w-full p-3 bg-white border border-neutral-200 rounded-lg text-xs font-semibold resize-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">Author</label>
                  <input
                    type="text"
                    value={activeSlide.quote.author}
                    onChange={(e) => updateSlideElement("quote", { author: e.target.value })}
                    className="w-full h-10 px-3 bg-white border border-neutral-200 rounded-lg text-xs font-semibold"
                  />
                </div>
              </div>
            )}

            {selectedElement === "cta" && (
              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">Button Label</label>
                  <input
                    type="text"
                    value={activeSlide.cta.text}
                    onChange={(e) => updateSlideElement("cta", { text: e.target.value })}
                    className="w-full h-10 px-3 bg-white border border-neutral-200 rounded-lg text-xs font-semibold"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">Button Link</label>
                  <input
                    type="text"
                    value={activeSlide.cta.link}
                    onChange={(e) => updateSlideElement("cta", { link: e.target.value })}
                    className="w-full h-10 px-3 bg-white border border-neutral-200 rounded-lg text-xs font-semibold"
                  />
                </div>
              </div>
            )}

            {selectedElement === "logo" && (
              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">Brand Logo URL</label>
                <input
                  type="text"
                  placeholder="https://example.com/logo.png"
                  value={activeSlide.logo.logoUrl}
                  onChange={(e) => updateSlideElement("logo", { logoUrl: e.target.value })}
                  className="w-full h-10 px-3 bg-white border border-neutral-200 rounded-lg text-xs font-semibold"
                />
              </div>
            )}

            {selectedElement === "author" && (
              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">Author Name</label>
                  <input
                    type="text"
                    value={activeSlide.author.name}
                    onChange={(e) => updateSlideElement("author", { name: e.target.value })}
                    className="w-full h-10 px-3 bg-white border border-neutral-200 rounded-lg text-xs font-semibold"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">Avatar Photo URL</label>
                  <input
                    type="text"
                    placeholder="https://example.com/avatar.jpg"
                    value={activeSlide.author.avatarUrl}
                    onChange={(e) => updateSlideElement("author", { avatarUrl: e.target.value })}
                    className="w-full h-10 px-3 bg-white border border-neutral-200 rounded-lg text-xs font-semibold"
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Style Panel (Color, Position, Fonts) */}
        {activeTab === "style" && selectedElement && (
          <div className="panel-card space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 block border-b pb-2">Style Properties</span>

            {/* Position Controls (Always available, but disabled in Fixed Mode) */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <span className="text-[9px] font-bold uppercase tracking-wider text-neutral-500">X (px)</span>
                <input
                  type="number"
                  disabled={editorMode === "fixed" || activeSlide[selectedElement].locked}
                  value={activeSlide[selectedElement].x}
                  onChange={(e) => updateSlideElement(selectedElement, { x: parseInt(e.target.value) || 0 })}
                  className="w-full h-9 px-3 bg-neutral-50 border border-neutral-200 rounded-lg text-xs font-mono"
                />
              </div>
              <div className="space-y-1">
                <span className="text-[9px] font-bold uppercase tracking-wider text-neutral-500">Y (px)</span>
                <input
                  type="number"
                  disabled={editorMode === "fixed" || activeSlide[selectedElement].locked}
                  value={activeSlide[selectedElement].y}
                  onChange={(e) => updateSlideElement(selectedElement, { y: parseInt(e.target.value) || 0 })}
                  className="w-full h-9 px-3 bg-neutral-50 border border-neutral-200 rounded-lg text-xs font-mono"
                />
              </div>
              <div className="space-y-1">
                <span className="text-[9px] font-bold uppercase tracking-wider text-neutral-500">Width (px)</span>
                <input
                  type="number"
                  disabled={editorMode === "fixed" || activeSlide[selectedElement].locked}
                  value={activeSlide[selectedElement].width}
                  onChange={(e) => updateSlideElement(selectedElement, { width: parseInt(e.target.value) || 0 })}
                  className="w-full h-9 px-3 bg-neutral-50 border border-neutral-200 rounded-lg text-xs font-mono"
                />
              </div>
              <div className="space-y-1">
                <span className="text-[9px] font-bold uppercase tracking-wider text-neutral-500">Height (px)</span>
                <input
                  type="number"
                  disabled={editorMode === "fixed" || activeSlide[selectedElement].locked}
                  value={activeSlide[selectedElement].height}
                  onChange={(e) => updateSlideElement(selectedElement, { height: parseInt(e.target.value) || 0 })}
                  className="w-full h-9 px-3 bg-neutral-50 border border-neutral-200 rounded-lg text-xs font-mono"
                />
              </div>
            </div>

            {/* Rotation and Opacity */}
            <div className="grid grid-cols-2 gap-3 border-t pt-3">
              <div className="space-y-1">
                <span className="text-[9px] font-bold uppercase tracking-wider text-neutral-500">Rotation (deg)</span>
                <input
                  type="number"
                  disabled={activeSlide[selectedElement].locked}
                  value={activeSlide[selectedElement].rotation}
                  onChange={(e) => updateSlideElement(selectedElement, { rotation: parseInt(e.target.value) || 0 })}
                  className="w-full h-9 px-3 bg-white border border-neutral-200 rounded-lg text-xs font-mono"
                />
              </div>
              <div className="space-y-1">
                <span className="text-[9px] font-bold uppercase tracking-wider text-neutral-500">Opacity (0-1)</span>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="1"
                  value={activeSlide[selectedElement].opacity}
                  onChange={(e) => updateSlideElement(selectedElement, { opacity: parseFloat(e.target.value) || 1 })}
                  className="w-full h-9 px-3 bg-white border border-neutral-200 rounded-lg text-xs font-mono"
                />
              </div>
            </div>

            {/* Image specific styles */}
            {selectedElement === "featuredImage" && (
              <div className="space-y-3.5 border-t pt-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-neutral-500">Fit Mode</span>
                    <select
                      value={activeSlide.featuredImage.objectFit}
                      onChange={(e) => updateSlideElement("featuredImage", { objectFit: e.target.value as any })}
                      className="w-full h-9 px-2 bg-white border border-neutral-200 rounded-lg text-xs"
                    >
                      <option value="cover">Cover</option>
                      <option value="contain">Contain</option>
                      <option value="fill">Fill</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-neutral-500">Radius (px)</span>
                    <input
                      type="number"
                      value={activeSlide.featuredImage.borderRadius}
                      onChange={(e) => updateSlideElement("featuredImage", { borderRadius: parseInt(e.target.value) || 0 })}
                      className="w-full h-9 px-3 bg-white border border-neutral-200 rounded-lg text-xs font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-neutral-500">Brightness (%)</span>
                    <input
                      type="number"
                      value={activeSlide.featuredImage.brightness}
                      onChange={(e) => updateSlideElement("featuredImage", { brightness: parseInt(e.target.value) || 100 })}
                      className="w-full h-9 px-3 bg-white border border-neutral-200 rounded-lg text-xs font-mono"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-neutral-500">Contrast (%)</span>
                    <input
                      type="number"
                      value={activeSlide.featuredImage.contrast}
                      onChange={(e) => updateSlideElement("featuredImage", { contrast: parseInt(e.target.value) || 100 })}
                      className="w-full h-9 px-3 bg-white border border-neutral-200 rounded-lg text-xs font-mono"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between py-1">
                  <span className="text-xs font-bold text-neutral-600">Shadow Overlay</span>
                  <input
                    type="checkbox"
                    checked={!!activeSlide.featuredImage.shadowEnabled}
                    onChange={(e) => updateSlideElement("featuredImage", { shadowEnabled: e.target.checked })}
                    className="h-4 w-4 text-[#0075de]"
                  />
                </div>
              </div>
            )}

            {/* Typography controls */}
            {selectedElement !== "featuredImage" && selectedElement !== "divider" && (
              <div className="space-y-4 border-t pt-3">
                <div className="space-y-1">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-neutral-500">Font Family</span>
                  <select
                    value={activeSlide[selectedElement].fontFamily}
                    onChange={(e) => updateSlideElement(selectedElement, { fontFamily: e.target.value })}
                    className="w-full h-9 px-3 bg-white border border-neutral-200 rounded-lg text-xs font-semibold"
                  >
                    {DEFAULT_FONTS.map(f => (
                      <option key={f.value} value={f.value}>{f.name}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-neutral-500">Size (px)</span>
                    <input
                      type="number"
                      value={activeSlide[selectedElement].fontSize}
                      onChange={(e) => updateSlideElement(selectedElement, { fontSize: parseInt(e.target.value) || 12 })}
                      className="w-full h-9 px-3 bg-white border border-neutral-200 rounded-lg text-xs font-mono"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-neutral-500">Weight</span>
                    <select
                      value={activeSlide[selectedElement].fontWeight}
                      onChange={(e) => updateSlideElement(selectedElement, { fontWeight: e.target.value })}
                      className="w-full h-9 px-2 bg-white border border-neutral-200 rounded-lg text-xs"
                    >
                      <option value="400">Regular (400)</option>
                      <option value="500">Medium (500)</option>
                      <option value="600">Semibold (600)</option>
                      <option value="700">Bold (700)</option>
                      <option value="800">Extrabold (800)</option>
                      <option value="900">Black (900)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-neutral-500">Line Height</span>
                    <input
                      type="number"
                      step="0.05"
                      value={activeSlide[selectedElement].lineHeight}
                      onChange={(e) => updateSlideElement(selectedElement, { lineHeight: parseFloat(e.target.value) || 1.2 })}
                      className="w-full h-9 px-3 bg-white border border-neutral-200 rounded-lg text-xs font-mono"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-neutral-500">Color</span>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={activeSlide[selectedElement].color}
                        onChange={(e) => updateSlideElement(selectedElement, { color: e.target.value })}
                        className="w-9 h-9 border border-neutral-200 rounded-lg cursor-pointer shrink-0"
                      />
                      <input
                        type="text"
                        value={activeSlide[selectedElement].color}
                        onChange={(e) => updateSlideElement(selectedElement, { color: e.target.value })}
                        className="flex-1 h-9 px-2 border border-neutral-200 rounded-lg text-xs font-mono"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-neutral-500">Text Align</span>
                  <div className="flex bg-neutral-100 p-0.5 rounded-lg border border-neutral-200">
                    {[
                      { align: "left", icon: <AlignLeft size={11} /> },
                      { align: "center", icon: <AlignCenter size={11} /> },
                      { align: "right", icon: <AlignRight size={11} /> }
                    ].map(opt => (
                      <button
                        key={opt.align}
                        onClick={() => updateSlideElement(selectedElement, { align: opt.align as any })}
                        className={`p-1.5 rounded-md ${
                          activeSlide[selectedElement].align === opt.align ? "bg-white text-black shadow-sm" : "text-neutral-500"
                        }`}
                      >
                        {opt.icon}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Export System & Settings */}
        {activeTab === "export" && (
          <div className="panel-card space-y-5">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 block border-b pb-2">Export Tools</span>
            
            <div className="space-y-3">
              <button 
                onClick={() => handleDownloadSlideSvg(activeIndex)}
                className="w-full py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-900 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 border-none"
              >
                <Download size={13} /> Download Active SVG
              </button>
              
              <button 
                onClick={() => handleDownloadSlideRaster(activeIndex, "png")}
                className="w-full py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-900 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 border-none"
              >
                <Download size={13} /> Download Active PNG
              </button>

              <button 
                onClick={() => handleDownloadSlideRaster(activeIndex, "jpeg")}
                className="w-full py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-900 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 border-none"
              >
                <Download size={13} /> Download Active JPEG
              </button>

              <button 
                onClick={handleDownloadPdf}
                className="w-full py-3 bg-[#0075de] hover:bg-[#0075de]/95 text-white rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 shadow border-none"
              >
                <FileText size={13} /> Export Carousel PDF
              </button>

              <button 
                onClick={handleDownloadAllSlidesSvg}
                className="w-full py-2.5 border border-neutral-300 hover:border-neutral-950 text-neutral-800 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 bg-white"
              >
                <LayoutGrid size={13} /> Download All SVGs
              </button>
            </div>
          </div>
        )}

        {/* Global Footer Branding */}
        <div className="panel-card space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 block pb-2 border-b border-neutral-100 block">Global Footer</span>
          
          <div className="space-y-3.5">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">Brand Name</span>
              <input
                type="text"
                value={activeSlide.footer.brandName}
                onChange={(e) => updateSlideFooter({ brandName: e.target.value })}
                className="w-full h-10 px-3 bg-white border border-neutral-200 rounded-lg text-xs font-semibold"
              />
            </div>

            <div className="flex justify-between items-center py-1">
              <span className="text-xs font-bold text-neutral-600">Show Divider Line</span>
              <input
                type="checkbox"
                checked={activeSlide.footer.dividerEnabled}
                onChange={(e) => updateSlideFooter({ dividerEnabled: e.target.checked })}
                className="h-4 w-4 text-[#0075de]"
              />
            </div>

            <div className="flex justify-between items-center py-1">
              <span className="text-xs font-bold text-neutral-600">Show Page Numbers</span>
              <input
                type="checkbox"
                checked={activeSlide.footer.pageNumberEnabled}
                onChange={(e) => updateSlideFooter({ pageNumberEnabled: e.target.checked })}
                className="h-4 w-4 text-[#0075de]"
              />
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">Footer Text Color</span>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={activeSlide.footer.color}
                  onChange={(e) => updateSlideFooter({ color: e.target.value })}
                  className="w-9 h-9 border border-neutral-200 rounded-lg cursor-pointer shrink-0"
                />
                <input
                  type="text"
                  value={activeSlide.footer.color}
                  onChange={(e) => updateSlideFooter({ color: e.target.value })}
                  className="flex-1 h-9 px-2 border border-neutral-200 rounded-lg text-xs font-mono"
                />
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
