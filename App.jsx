import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Pencil,
  Eraser,
  Square,
  Circle as CircleIcon,
  Minus,
  Type as TypeIcon,
  Undo2,
  Redo2,
  Download,
  Plus,
  Trash2,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Sun,
  Moon,
  Languages,
  Pipette,
  ZoomIn,
  ZoomOut,
  ChevronUp,
  ChevronDown,
  SlidersHorizontal,
  X,
  Image as ImageIcon,
  Film,
  FlipHorizontal,
  Share2,
  Move,
  Search,
  Bell,
  Settings,
  LogIn,
  Users,
  Flame,
  Home as HomeIcon,
  Trophy,
  User,
  ChevronLeft,
  ChevronRight,
  Menu,
  Play,
  Heart,
  Layers,
  Clock,
  Sparkles,
  ArrowUpRight,
  ArrowRight,
  Copy,
  MoreHorizontal,
  Star,
  FolderOpen,
  Folder,
  LayoutGrid,
  List,
  ArrowUpDown,
  Award,
  Shield,
  Mail,
  Globe,
  Palette,
  LogOut,
  Check,
  Triangle,
  RotateCw,
  Maximize2,
  Cloud,
  Wind,
  Droplet,
  Sliders,
  RefreshCw,
} from "lucide-react";

/* ---------------- i18n ---------------- */
const DICT = {
  en: {
    appName: "Inkframe",
    tools: "Tools",
    brush: "Brush", eraser: "Eraser", rect: "Rectangle", ellipse: "Ellipse",
    line: "Line", text: "Text", eyedropper: "Eyedropper",
    size: "Size", opacity: "Opacity", color: "Color", recent: "Recent",
    layers: "Layers", addLayer: "Add layer", noLayers: "No layers yet",
    undo: "Undo", redo: "Redo", export: "Export PNG",
    zoomIn: "Zoom in", zoomOut: "Zoom out", reset: "Reset view",
    clickAddText: "Click canvas to place text", typeHere: "Type…",
    layer: "Layer", visible: "Toggle visibility", locked: "Toggle lock",
    delete: "Delete layer", moveUp: "Move up", moveDown: "Move down",
    dark: "Dark", light: "Light", blendMode: "Blend mode",
    reference: "Reference", addReference: "Add reference image", removeReference: "Remove reference",
    referenceOpacity: "Reference opacity", flipReference: "Flip",
    finish: "Finish", timelapseTitle: "Your timelapse is ready",
    generating: "Rendering timelapse…", download: "Download", share: "Share", close: "Close",
    noStrokesYet: "Draw something first, then finish to generate a timelapse.",
    blend_source_over: "Normal", blend_multiply: "Multiply", blend_screen: "Screen",
    blend_overlay: "Overlay", blend_darken: "Darken", blend_lighten: "Lighten",
    blend_color_dodge: "Color Dodge", blend_color_burn: "Color Burn",
    blend_hard_light: "Hard Light", blend_soft_light: "Soft Light",
    blend_difference: "Difference", blend_exclusion: "Exclusion",
    blend_hue: "Hue", blend_saturation: "Saturation", blend_color: "Color", blend_luminosity: "Luminosity",
    triangle: "Triangle",
    brushType: "Brush type", brush_basic: "Basic", brush_grass: "Grass", brush_clouds: "Clouds", brush_blend: "Blend",
    canvasSettings: "Canvas settings", settings: "Settings",
    canvasSize: "Canvas size", width: "Width", height: "Height", preset: "Preset",
    square: "Square", portrait: "Portrait", landscape: "Landscape", custom: "Custom", apply: "Apply",
    canvasBg: "Area behind canvas", canvasBgHint: "The paper itself always stays white.", darkSilver: "Dark silver", white: "White", transparent: "Transparent",
    rotation: "Rotation", safeRotate: "Safe rotate (snap)", resetRotation: "Reset rotation",
    generalSettings: "General", language: "Language", theme: "Theme",
    showThumbnails: "Show layer thumbnails", quickEyedropper: "Long-press to sample color",
    resetSettings: "Reset to defaults", done: "Done", cancel: "Cancel",
  },
  ar: {
    appName: "إنكفريم",
    tools: "الأدوات",
    brush: "فرشاة", eraser: "ممحاة", rect: "مستطيل", ellipse: "بيضاوي",
    line: "خط", text: "نص", eyedropper: "قطارة",
    size: "الحجم", opacity: "الشفافية", color: "اللون", recent: "الأخيرة",
    layers: "الطبقات", addLayer: "إضافة طبقة", noLayers: "لا توجد طبقات",
    undo: "تراجع", redo: "إعادة", export: "تصدير PNG",
    zoomIn: "تكبير", zoomOut: "تصغير", reset: "إعادة الضبط",
    clickAddText: "انقر على اللوحة لوضع النص", typeHere: "اكتب…",
    layer: "طبقة", visible: "إظهار/إخفاء", locked: "قفل/فتح",
    delete: "حذف الطبقة", moveUp: "نقل لأعلى", moveDown: "نقل لأسفل",
    dark: "داكن", light: "فاتح", blendMode: "وضع المزج",
    reference: "مرجع", addReference: "إضافة صورة مرجعية", removeReference: "إزالة المرجع",
    referenceOpacity: "شفافية المرجع", flipReference: "قلب",
    finish: "إنهاء", timelapseTitle: "الفيديو المسرّع جاهز",
    generating: "جاري إنشاء الفيديو المسرّع…", download: "تنزيل", share: "مشاركة", close: "إغلاق",
    noStrokesYet: "ارسمي شيئًا أولاً، ثم اضغطي إنهاء لإنشاء فيديو مسرّع.",
    blend_source_over: "عادي", blend_multiply: "ضرب", blend_screen: "شاشة",
    blend_overlay: "تراكب", blend_darken: "تغميق", blend_lighten: "تفتيح",
    blend_color_dodge: "تفتيح اللون", blend_color_burn: "حرق اللون",
    blend_hard_light: "ضوء قوي", blend_soft_light: "ضوء ناعم",
    blend_difference: "فرق", blend_exclusion: "استبعاد",
    blend_hue: "الصبغة", blend_saturation: "التشبع", blend_color: "اللون", blend_luminosity: "الإضاءة",
    triangle: "مثلث",
    brushType: "نوع الفرشاة", brush_basic: "أساسية", brush_grass: "عشب", brush_clouds: "غيوم", brush_blend: "دمج",
    canvasSettings: "إعدادات اللوحة", settings: "الإعدادات",
    canvasSize: "حجم اللوحة", width: "العرض", height: "الارتفاع", preset: "قياس جاهز",
    square: "مربع", portrait: "طولي", landscape: "عرضي", custom: "مخصص", apply: "تطبيق",
    canvasBg: "المساحة المحيطة باللوحة", canvasBgHint: "ورقة الرسم نفسها تبقى بيضاء دائمًا.", darkSilver: "فضي غامق", white: "أبيض", transparent: "شفاف",
    rotation: "التدوير", safeRotate: "تدوير آمن (تثبيت الزاوية)", resetRotation: "إعادة ضبط التدوير",
    generalSettings: "عام", language: "اللغة", theme: "المظهر",
    showThumbnails: "إظهار مصغّرات الطبقات", quickEyedropper: "الضغط المطوّل لالتقاط اللون",
    resetSettings: "استعادة الإعدادات الافتراضية", done: "تم", cancel: "إلغاء",
  },
};

const BLEND_MODES = [
  "source-over", "multiply", "screen", "overlay", "darken", "lighten",
  "color-dodge", "color-burn", "hard-light", "soft-light",
  "difference", "exclusion", "hue", "saturation", "color", "luminosity",
];

const SWATCHES = ["#F4F4F6", "#7C5CFF", "#34D1BF", "#FF6B6B", "#FFC145", "#4D9DFF", "#15161A", "#EF4D8C"];

const CANVAS_BG_PRESETS = [
  { id: "darkSilver", hex: "#4B4F58" },
  { id: "white", hex: "#FFFFFF" },
  { id: "transparent", hex: "transparent" },
];

const CANVAS_SIZE_PRESETS = [
  { id: "square", w: 1600, h: 1600 },
  { id: "portrait", w: 1200, h: 1600 },
  { id: "landscape", w: 1600, h: 1200 },
];

/* ---------------- color math ---------------- */
function hexToRgb(hex) {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex || "#000000");
  if (!m) return { r: 0, g: 0, b: 0 };
  return { r: parseInt(m[1], 16), g: parseInt(m[2], 16), b: parseInt(m[3], 16) };
}
function rgbToHex(r, g, b) {
  const h = (n) => Math.round(Math.max(0, Math.min(255, n))).toString(16).padStart(2, "0");
  return `#${h(r)}${h(g)}${h(b)}`;
}
function rgbToHsv(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const d = max - min;
  let h = 0;
  if (d !== 0) {
    if (max === r) h = 60 * (((g - b) / d) % 6);
    else if (max === g) h = 60 * ((b - r) / d + 2);
    else h = 60 * ((r - g) / d + 4);
  }
  if (h < 0) h += 360;
  const s = max === 0 ? 0 : d / max;
  const v = max;
  return { h, s, v };
}
function hsvToRgb(h, s, v) {
  const c = v * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = v - c;
  let r = 0, g = 0, b = 0;
  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];
  return { r: (r + m) * 255, g: (g + m) * 255, b: (b + m) * 255 };
}

/* ---------------- helpers ---------------- */
const uid = () => Math.random().toString(36).slice(2, 9);

function makeLayerCanvas(w, h) {
  const c = document.createElement("canvas");
  c.width = w; c.height = h;
  return c;
}

function DrawStudio({ onExit }) {
  const [lang, setLang] = useState("en");
  const [theme, setTheme] = useState("dark");
  const t = DICT[lang];
  const dir = lang === "ar" ? "rtl" : "ltr";

  const [canvasSize, setCanvasSize] = useState({ w: 1400, h: 900 });
  const CANVAS_W = canvasSize.w, CANVAS_H = canvasSize.h;
  const [workspaceBg, setWorkspaceBg] = useState("#4B4F58"); // dark silver work area behind the white paper
  const [canvasSettingsOpen, setCanvasSettingsOpen] = useState(false);
  const [sizeDraft, setSizeDraft] = useState({ w: 1400, h: 900 });

  const [viewRotation, setViewRotation] = useState(0); // degrees
  const [safeRotate, setSafeRotate] = useState(true); // snap to 15deg increments

  const [appSettings, setAppSettings] = useState({ showThumbnails: true, quickEyedropper: true });
  const [settingsOpen, setSettingsOpen] = useState(false);

  const [brushType, setBrushType] = useState("basic"); // basic | grass | clouds | blend
  const lastStampPt = useRef(null);
  const smudgeSnap = useRef(null);
  const longPressTimer = useRef(null);
  const [thumbTick, setThumbTick] = useState(0);

  const [tool, setTool] = useState("brush");
  const [color, setColor] = useState("#7C5CFF");
  const [recentColors, setRecentColors] = useState(["#7C5CFF", "#F4F4F6", "#34D1BF"]);
  const [size, setSize] = useState(14);
  const [opacity, setOpacity] = useState(100);
  const [zoom, setZoom] = useState(() => (typeof window !== "undefined" && window.innerWidth < 820 ? 0.32 : 0.6));

  const [layers, setLayers] = useState(() => {
    const c = makeLayerCanvas(CANVAS_W, CANVAS_H);
    return [{ id: uid(), name: "Layer 1", canvas: c, visible: true, locked: false, opacity: 100, blendMode: "source-over" }];
  });
  const [activeLayerId, setActiveLayerId] = useState(layers[0].id);

  const compositeRef = useRef(null);
  const overlayRef = useRef(null); // for shape preview / text cursor
  const drawing = useRef(false);
  const lastPt = useRef(null);
  const shapeStart = useRef(null);
  const preSnapshot = useRef(null);

  const historyRef = useRef([]); // {layerId, dataURL}
  const redoRef = useRef([]);
  const [, forceTick] = useState(0);

  const [pendingText, setPendingText] = useState(null); // {x,y}
  const textInputRef = useRef(null);

  const [isMobile, setIsMobile] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 820);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Timelapse frame capture
  const timelapseFrames = useRef([]);

  // Reference image
  const [reference, setReference] = useState(null); // {src, x, y, w, h, opacity, flipped}
  const refDrag = useRef(null);
  const refFileInputRef = useRef(null);

  // Finish / timelapse modal
  const [finishModal, setFinishModal] = useState(null); // {status: 'generating'|'ready', url}
  const finishCanvasRef = useRef(null);

  // Pinch-to-zoom
  const activePointers = useRef(new Map());
  const pinchState = useRef(null); // {startDist, startZoom}

  const activeLayer = layers.find((l) => l.id === activeLayerId) || layers[0];

  /* ---------------- compositing ---------------- */
  const recomposite = useCallback(() => {
    const cv = compositeRef.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    ctx.clearRect(0, 0, cv.width, cv.height);
    ctx.globalCompositeOperation = "source-over";
    // Render bottom-to-top: the LAST item in the array is the bottom-most layer,
    // the FIRST item (top of the layers list) is drawn last so it visually sits on top.
    for (let i = layers.length - 1; i >= 0; i--) {
      const l = layers[i];
      if (!l.visible) continue;
      ctx.globalAlpha = l.opacity / 100;
      ctx.globalCompositeOperation = l.blendMode || "source-over";
      ctx.drawImage(l.canvas, 0, 0);
    }
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = "source-over";
  }, [layers]);

  useEffect(() => { recomposite(); }, [recomposite, layers]);

  /* ---------------- history ---------------- */
  const pushHistory = (layerId, dataURL) => {
    historyRef.current.push({ layerId, dataURL });
    if (historyRef.current.length > 40) historyRef.current.shift();
    redoRef.current = [];
    forceTick((n) => n + 1);
  };

  const snapshotBefore = () => {
    preSnapshot.current = activeLayer.canvas.toDataURL();
  };

  const commitSnapshot = () => {
    if (preSnapshot.current) {
      pushHistory(activeLayer.id, preSnapshot.current);
      preSnapshot.current = null;
      // capture a timelapse frame of the full composited artwork
      recomposite();
      const cv = compositeRef.current;
      if (cv) timelapseFrames.current.push(cv.toDataURL("image/png"));
      if (timelapseFrames.current.length > 300) timelapseFrames.current.shift();
      setThumbTick((n) => n + 1);
    }
  };

  const restoreDataURL = (canvas, dataURL) => new Promise((res) => {
    const img = new Image();
    img.onload = () => {
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      res();
    };
    img.src = dataURL;
  });

  const undo = async () => {
    const last = historyRef.current.pop();
    if (!last) return;
    const layer = layers.find((l) => l.id === last.layerId);
    if (!layer) return;
    const current = layer.canvas.toDataURL();
    redoRef.current.push({ layerId: last.layerId, dataURL: current });
    await restoreDataURL(layer.canvas, last.dataURL);
    recomposite();
    forceTick((n) => n + 1);
    setThumbTick((n) => n + 1);
  };

  const redo = async () => {
    const next = redoRef.current.pop();
    if (!next) return;
    const layer = layers.find((l) => l.id === next.layerId);
    if (!layer) return;
    const current = layer.canvas.toDataURL();
    historyRef.current.push({ layerId: next.layerId, dataURL: current });
    await restoreDataURL(layer.canvas, next.dataURL);
    recomposite();
    forceTick((n) => n + 1);
    setThumbTick((n) => n + 1);
  };

  /* ---------------- pointer math ---------------- */
  const getPos = (e) => {
    const rect = compositeRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * CANVAS_W;
    const y = ((e.clientY - rect.top) / rect.height) * CANVAS_H;
    return { x, y };
  };

  const addRecentColor = (c) => {
    setRecentColors((prev) => {
      const filtered = prev.filter((p) => p !== c);
      return [c, ...filtered].slice(0, 8);
    });
  };

  /* ---------------- drawing handlers ---------------- */
  /* ---------------- professional brush stamps ---------------- */
  const stampGrass = (ctx, x, y, prevX, prevY, sz, col, alphaVal) => {
    const angleBase = Math.atan2((prevY ?? y) - y, (x - (prevX ?? x - 1))) || -Math.PI / 2;
    const bladeCount = 2 + Math.floor(Math.random() * 3);
    ctx.globalAlpha = alphaVal;
    ctx.lineCap = "round";
    for (let i = 0; i < bladeCount; i++) {
      const spread = (Math.random() - 0.5) * sz * 1.4;
      const bx = x + spread * Math.cos(angleBase + Math.PI / 2);
      const by = y + spread * Math.sin(angleBase + Math.PI / 2);
      const bladeLen = sz * (0.6 + Math.random() * 0.9);
      const wobble = (Math.random() - 0.5) * 0.7;
      const tipX = bx + Math.cos(-Math.PI / 2 + wobble) * bladeLen;
      const tipY = by + Math.sin(-Math.PI / 2 + wobble) * bladeLen;
      ctx.beginPath();
      ctx.moveTo(bx, by);
      ctx.quadraticCurveTo(bx + wobble * bladeLen * 0.4, by - bladeLen * 0.5, tipX, tipY);
      ctx.lineWidth = Math.max(1, sz * 0.12);
      ctx.strokeStyle = col;
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  };

  const stampCloud = (ctx, x, y, sz, col, alphaVal) => {
    const puffs = 3 + Math.floor(Math.random() * 3);
    for (let i = 0; i < puffs; i++) {
      const ox = (Math.random() - 0.5) * sz * 1.3;
      const oy = (Math.random() - 0.5) * sz * 0.7;
      const r = sz * (0.45 + Math.random() * 0.55);
      const grad = ctx.createRadialGradient(x + ox, y + oy, 0, x + ox, y + oy, r);
      grad.addColorStop(0, col);
      grad.addColorStop(1, "transparent");
      ctx.globalAlpha = alphaVal * 0.55;
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(x + ox, y + oy, r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  };

  const sampleForSmudge = (canvas, x, y, s) => {
    const patch = document.createElement("canvas");
    patch.width = s; patch.height = s;
    patch.getContext("2d").drawImage(canvas, x - s / 2, y - s / 2, s, s, 0, 0, s, s);
    return patch;
  };

  const applySmudge = (canvas, x, y, sz, alphaVal) => {
    const ctx = canvas.getContext("2d");
    if (smudgeSnap.current) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(x, y, sz / 2, 0, Math.PI * 2);
      ctx.clip();
      ctx.globalAlpha = alphaVal * 0.6;
      ctx.drawImage(smudgeSnap.current, x - sz / 2, y - sz / 2);
      ctx.restore();
    }
    smudgeSnap.current = sampleForSmudge(canvas, x, y, sz);
  };

  const onPointerDown = (e) => {
    activePointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (activePointers.current.size >= 2) {
      // A second finger landed: cancel any in-progress stroke and start a pinch gesture.
      if (drawing.current) { drawing.current = false; preSnapshot.current = null; }
      const pts = Array.from(activePointers.current.values());
      const dist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
      pinchState.current = { startDist: dist, startZoom: zoom };
      return;
    }

    if (activeLayer.locked) return;
    const pos = getPos(e);

    if (tool === "text") {
      setPendingText({ x: pos.x, y: pos.y, value: "" });
      return;
    }

    if (tool === "eyedropper") {
      const ctx = compositeRef.current.getContext("2d");
      const [r, g, b] = ctx.getImageData(pos.x, pos.y, 1, 1).data;
      const hex = "#" + [r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("");
      setColor(hex);
      addRecentColor(hex);
      return;
    }

    // Long-press with the brush tool quickly samples a color (if enabled in settings)
    if (tool === "brush" && appSettings.quickEyedropper) {
      longPressTimer.current = setTimeout(() => {
        if (drawing.current) {
          const ctx = compositeRef.current.getContext("2d");
          const [r, g, b] = ctx.getImageData(pos.x, pos.y, 1, 1).data;
          const hex = "#" + [r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("");
          setColor(hex);
          addRecentColor(hex);
          drawing.current = false;
          preSnapshot.current = null;
        }
      }, 480);
    }

    drawing.current = true;
    snapshotBefore();
    lastPt.current = pos;
    shapeStart.current = pos;
    lastStampPt.current = pos;
    smudgeSnap.current = null;

    const ctx = activeLayer.canvas.getContext("2d");
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.globalAlpha = opacity / 100;

    if (tool === "brush" && brushType === "grass") {
      stampGrass(ctx, pos.x, pos.y, pos.x - 1, pos.y, size, color, opacity / 100);
      recomposite();
    } else if (tool === "brush" && brushType === "clouds") {
      stampCloud(ctx, pos.x, pos.y, size, color, opacity / 100);
      recomposite();
    } else if (tool === "brush" && brushType === "blend") {
      applySmudge(activeLayer.canvas, pos.x, pos.y, Math.max(16, size * 2), opacity / 100);
      recomposite();
    } else if (tool === "brush" || tool === "eraser") {
      ctx.globalCompositeOperation = tool === "eraser" ? "destination-out" : "source-over";
      ctx.strokeStyle = color;
      ctx.lineWidth = size;
      ctx.beginPath();
      ctx.moveTo(pos.x, pos.y);
      ctx.lineTo(pos.x + 0.01, pos.y + 0.01);
      ctx.stroke();
      recomposite();
    }
  };

  const onPointerMove = (e) => {
    if (activePointers.current.has(e.pointerId)) {
      activePointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    }

    if (activePointers.current.size >= 2 && pinchState.current) {
      const pts = Array.from(activePointers.current.values());
      const dist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
      const scale = dist / pinchState.current.startDist;
      const newZoom = Math.min(3, Math.max(0.15, pinchState.current.startZoom * scale));
      setZoom(newZoom);
      return;
    }

    if (!drawing.current) return;
    const pos = getPos(e);

    // Any real movement cancels the long-press-to-sample-color timer
    if (longPressTimer.current) {
      const d = Math.hypot(pos.x - shapeStart.current.x, pos.y - shapeStart.current.y);
      if (d > 6) { clearTimeout(longPressTimer.current); longPressTimer.current = null; }
    }

    const overlay = overlayRef.current;
    const octx = overlay?.getContext("2d");

    if (tool === "brush" && brushType === "grass") {
      const last = lastStampPt.current || pos;
      const d = Math.hypot(pos.x - last.x, pos.y - last.y);
      if (d > Math.max(6, size * 0.4)) {
        const ctx = activeLayer.canvas.getContext("2d");
        stampGrass(ctx, pos.x, pos.y, last.x, last.y, size, color, opacity / 100);
        lastStampPt.current = pos;
        recomposite();
      }
    } else if (tool === "brush" && brushType === "clouds") {
      const last = lastStampPt.current || pos;
      const d = Math.hypot(pos.x - last.x, pos.y - last.y);
      if (d > Math.max(8, size * 0.5)) {
        const ctx = activeLayer.canvas.getContext("2d");
        stampCloud(ctx, pos.x, pos.y, size, color, opacity / 100);
        lastStampPt.current = pos;
        recomposite();
      }
    } else if (tool === "brush" && brushType === "blend") {
      applySmudge(activeLayer.canvas, pos.x, pos.y, Math.max(16, size * 2), opacity / 100);
      recomposite();
    } else if (tool === "brush" || tool === "eraser") {
      const ctx = activeLayer.canvas.getContext("2d");
      ctx.beginPath();
      ctx.moveTo(lastPt.current.x, lastPt.current.y);
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
      lastPt.current = pos;
      recomposite();
    } else if (["rect", "ellipse", "line", "triangle"].includes(tool)) {
      octx.clearRect(0, 0, overlay.width, overlay.height);
      octx.globalAlpha = opacity / 100;
      octx.strokeStyle = color;
      octx.lineWidth = size;
      octx.lineCap = "round";
      drawShape(octx, tool, shapeStart.current, pos);
    }
  };

  const drawShape = (ctx, kind, start, end) => {
    ctx.beginPath();
    if (kind === "rect") {
      ctx.strokeRect(start.x, start.y, end.x - start.x, end.y - start.y);
    } else if (kind === "triangle") {
      const apexX = start.x + (end.x - start.x) / 2;
      ctx.moveTo(apexX, start.y);
      ctx.lineTo(end.x, end.y);
      ctx.lineTo(start.x, end.y);
      ctx.closePath();
      ctx.stroke();
    } else if (kind === "ellipse") {
      const rx = Math.abs(end.x - start.x) / 2;
      const ry = Math.abs(end.y - start.y) / 2;
      const cx = (start.x + end.x) / 2;
      const cy = (start.y + end.y) / 2;
      ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
      ctx.stroke();
    } else if (kind === "line") {
      ctx.moveTo(start.x, start.y);
      ctx.lineTo(end.x, end.y);
      ctx.stroke();
    }
  };

  const onPointerUp = (e) => {
    activePointers.current.delete(e.pointerId);
    if (activePointers.current.size < 2) pinchState.current = null;
    if (activePointers.current.size >= 1) return; // still mid-gesture with a remaining finger

    if (longPressTimer.current) { clearTimeout(longPressTimer.current); longPressTimer.current = null; }
    if (!drawing.current) return;
    drawing.current = false;
    smudgeSnap.current = null;

    if (["rect", "ellipse", "line", "triangle"].includes(tool)) {
      const pos = getPos(e);
      const ctx = activeLayer.canvas.getContext("2d");
      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = opacity / 100;
      ctx.strokeStyle = color;
      ctx.lineWidth = size;
      ctx.lineCap = "round";
      drawShape(ctx, tool, shapeStart.current, pos);
      const overlay = overlayRef.current;
      overlay.getContext("2d").clearRect(0, 0, overlay.width, overlay.height);
      recomposite();
    }
    addRecentColor(color);
    commitSnapshot();
  };

  const confirmText = () => {
    if (!pendingText || !pendingText.value.trim()) { setPendingText(null); return; }
    snapshotBefore();
    const ctx = activeLayer.canvas.getContext("2d");
    ctx.globalCompositeOperation = "source-over";
    ctx.globalAlpha = opacity / 100;
    ctx.fillStyle = color;
    ctx.font = `${size * 2}px Inter, sans-serif`;
    ctx.direction = dir;
    ctx.textAlign = dir === "rtl" ? "right" : "left";
    ctx.fillText(pendingText.value, pendingText.x, pendingText.y);
    recomposite();
    commitSnapshot();
    setPendingText(null);
  };

  /* ---------------- canvas size & background ---------------- */
  const applyCanvasResize = (newW, newH) => {
    newW = Math.max(64, Math.round(newW));
    newH = Math.max(64, Math.round(newH));
    setLayers((prev) => prev.map((l) => {
      const c = makeLayerCanvas(newW, newH);
      c.getContext("2d").drawImage(l.canvas, 0, 0);
      return { ...l, canvas: c };
    }));
    setCanvasSize({ w: newW, h: newH });
    setCanvasSettingsOpen(false);
    setThumbTick((n) => n + 1);
  };

  /* ---------------- layers ---------------- */
  const addLayer = () => {
    const c = makeLayerCanvas(CANVAS_W, CANVAS_H);
    const newLayer = { id: uid(), name: `${t.layer} ${layers.length + 1}`, canvas: c, visible: true, locked: false, opacity: 100, blendMode: "source-over" };
    setLayers((prev) => [newLayer, ...prev]);
    setActiveLayerId(newLayer.id);
  };

  const deleteLayer = (id) => {
    if (layers.length === 1) return;
    setLayers((prev) => {
      const next = prev.filter((l) => l.id !== id);
      if (activeLayerId === id) setActiveLayerId(next[0].id);
      return next;
    });
  };

  const toggleVisible = (id) => setLayers((p) => p.map((l) => l.id === id ? { ...l, visible: !l.visible } : l));
  const toggleLock = (id) => setLayers((p) => p.map((l) => l.id === id ? { ...l, locked: !l.locked } : l));
  const setLayerOpacity = (id, val) => setLayers((p) => p.map((l) => l.id === id ? { ...l, opacity: val } : l));
  const setLayerBlendMode = (id, mode) => setLayers((p) => p.map((l) => l.id === id ? { ...l, blendMode: mode } : l));

  const moveLayer = (id, dir2) => {
    setLayers((prev) => {
      const idx = prev.findIndex((l) => l.id === id);
      const swapIdx = dir2 === "up" ? idx - 1 : idx + 1;
      if (swapIdx < 0 || swapIdx >= prev.length) return prev;
      const next = [...prev];
      [next[idx], next[swapIdx]] = [next[swapIdx], next[idx]];
      return next;
    });
  };

  /* ---------------- reference image ---------------- */
  const onReferenceFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setReference({ src: reader.result, x: 24, y: 24, w: 220, h: 220, opacity: 100, flipped: false });
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  /* ---------------- timelapse ---------------- */
  const generateTimelapse = async () => {
    const frames = timelapseFrames.current;
    if (!frames.length) {
      setFinishModal({ status: "empty" });
      return;
    }
    setFinishModal({ status: "generating" });

    const cv = finishCanvasRef.current;
    cv.width = CANVAS_W;
    cv.height = CANVAS_H;
    const ctx = cv.getContext("2d");
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, cv.width, cv.height);

    const stream = cv.captureStream(30);
    const mimeType = MediaRecorder.isTypeSupported("video/webm;codecs=vp9")
      ? "video/webm;codecs=vp9" : "video/webm";
    const recorder = new MediaRecorder(stream, { mimeType });
    const chunks = [];
    recorder.ondataavailable = (e) => { if (e.data.size) chunks.push(e.data); };

    const done = new Promise((resolve) => {
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: "video/webm" });
        const url = URL.createObjectURL(blob);
        resolve({ url, blob });
      };
    });

    recorder.start();

    const totalDuration = Math.min(8000, Math.max(2500, frames.length * 60));
    const perFrame = Math.max(30, totalDuration / frames.length);

    for (const f of frames) {
      await new Promise((res) => {
        const img = new Image();
        img.onload = () => {
          ctx.fillStyle = "#FFFFFF";
          ctx.fillRect(0, 0, cv.width, cv.height);
          ctx.drawImage(img, 0, 0);
          res();
        };
        img.src = f;
      });
      await new Promise((res) => setTimeout(res, perFrame));
    }
    // hold the final frame briefly
    await new Promise((res) => setTimeout(res, 400));
    recorder.stop();

    const { url } = await done;
    setFinishModal({ status: "ready", url });
  };

  const downloadTimelapse = () => {
    if (!finishModal?.url) return;
    const a = document.createElement("a");
    a.href = finishModal.url;
    a.download = "inkframe-timelapse.webm";
    a.click();
  };

  const shareTimelapse = async () => {
    if (!finishModal?.url) return;
    try {
      const res = await fetch(finishModal.url);
      const blob = await res.blob();
      const file = new File([blob], "inkframe-timelapse.webm", { type: "video/webm" });
      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file], title: t.timelapseTitle });
      } else {
        downloadTimelapse();
      }
    } catch {
      downloadTimelapse();
    }
  };
  const exportPNG = () => {
    recomposite();
    const link = document.createElement("a");
    link.download = "inkframe-export.png";
    link.href = compositeRef.current.toDataURL("image/png");
    link.click();
  };

  /* ---------------- theme tokens ---------------- */
  const isDark = theme === "dark";
  const bg = isDark ? "#0E0F13" : "#F3F3F6";
  const panelBg = isDark ? "#17181D" : "#FFFFFF";
  const border = isDark ? "#26272E" : "#E3E3E8";
  const text = isDark ? "#EDEDF2" : "#17181D";
  const textMuted = isDark ? "#8A8B96" : "#6B6C76";
  const accent = "#7C5CFF";
  const accent2 = "#34D1BF";

  const tools = [
    { id: "brush", icon: Pencil, label: t.brush },
    { id: "eraser", icon: Eraser, label: t.eraser },
    { id: "rect", icon: Square, label: t.rect },
    { id: "triangle", icon: Triangle, label: t.triangle },
    { id: "ellipse", icon: CircleIcon, label: t.ellipse },
    { id: "line", icon: Minus, label: t.line },
    { id: "text", icon: TypeIcon, label: t.text },
    { id: "eyedropper", icon: Pipette, label: t.eyedropper },
  ];

  const brushTypes = [
    { id: "basic", icon: Pencil, label: t.brush_basic },
    { id: "grass", icon: Wind, label: t.brush_grass },
    { id: "clouds", icon: Cloud, label: t.brush_clouds },
    { id: "blend", icon: Droplet, label: t.brush_blend },
  ];

  return (
    <div dir={dir} style={{
      fontFamily: "'Inter', system-ui, sans-serif",
      background: bg, color: text, height: "100vh", width: "100%",
      display: "flex", flexDirection: "column", overflow: "hidden",
      transition: "background .25s ease, color .25s ease",
    }}>
      {/* Top bar */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: isMobile ? "8px 10px" : "10px 18px", borderBottom: `1px solid ${border}`, background: panelBg,
        flexShrink: 0, gap: 8,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
          {onExit && (
            <button onClick={onExit} title="الرئيسية" style={{
              width: 32, height: 32, borderRadius: 8, border: `1px solid ${border}`, background: panelBg,
              color: text, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}><ArrowRight size={16} /></button>
          )}
          <div style={{
            width: 26, height: 26, borderRadius: 8, flexShrink: 0,
            background: `linear-gradient(135deg, ${accent}, ${accent2})`,
          }} />
          {!isMobile && <span style={{ fontWeight: 700, fontSize: 15, letterSpacing: "-0.01em" }}>{t.appName}</span>}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: isMobile ? 4 : 8 }}>
          <IconBtn onClick={undo} disabled={historyRef.current.length === 0} title={t.undo} border={border} panelBg={panelBg} text={text}><Undo2 size={16} /></IconBtn>
          <IconBtn onClick={redo} disabled={redoRef.current.length === 0} title={t.redo} border={border} panelBg={panelBg} text={text}><Redo2 size={16} /></IconBtn>

          {!isMobile && (<>
            <div style={{ width: 1, height: 22, background: border, margin: "0 4px" }} />
            <IconBtn onClick={() => setZoom((z) => Math.max(0.2, z - 0.1))} title={t.zoomOut} border={border} panelBg={panelBg} text={text}><ZoomOut size={17} /></IconBtn>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: textMuted, minWidth: 42, textAlign: "center" }}>
              {Math.round(zoom * 100)}%
            </span>
            <IconBtn onClick={() => setZoom((z) => Math.min(2, z + 0.1))} title={t.zoomIn} border={border} panelBg={panelBg} text={text}><ZoomIn size={17} /></IconBtn>
            <div style={{ width: 1, height: 22, background: border, margin: "0 4px" }} />
          </>)}

          <button onClick={exportPNG} style={{
            display: "flex", alignItems: "center", gap: 6, padding: isMobile ? "7px 10px" : "7px 14px",
            borderRadius: 8, border: "none", background: accent, color: "#fff",
            fontSize: 13, fontWeight: 600, cursor: "pointer", flexShrink: 0,
          }}>
            <Download size={15} /> {!isMobile && t.export}
          </button>

          {!isMobile && (
            <IconBtn onClick={() => reference ? setReference((r) => ({ ...r, hidden: !r.hidden })) : refFileInputRef.current.click()}
              title={t.reference} border={border} panelBg={reference && !reference.hidden ? accent : panelBg} text={reference && !reference.hidden ? "#fff" : text}>
              <ImageIcon size={16} />
            </IconBtn>
          )}

          {!isMobile && (
            <button onClick={() => generateTimelapse()} style={{
              display: "flex", alignItems: "center", gap: 6, padding: "7px 14px",
              borderRadius: 8, border: `1px solid ${border}`, background: "transparent", color: text,
              fontSize: 13, fontWeight: 600, cursor: "pointer", flexShrink: 0,
            }}>
              <Film size={15} /> {t.finish}
            </button>
          )}

          {!isMobile && (
            <IconBtn onClick={() => { setSizeDraft(canvasSize); setCanvasSettingsOpen(true); }} title={t.canvasSettings} border={border} panelBg={panelBg} text={text}>
              <Maximize2 size={16} />
            </IconBtn>
          )}

          <input ref={refFileInputRef} type="file" accept="image/*" onChange={onReferenceFile} style={{ display: "none" }} />

          {!isMobile && (
            <IconBtn onClick={() => setLang((l) => (l === "en" ? "ar" : "en"))} title="Language" border={border} panelBg={panelBg} text={text}>
              <Languages size={17} />
            </IconBtn>
          )}
          {!isMobile && (
            <IconBtn onClick={() => setTheme((th) => (th === "dark" ? "light" : "dark"))} title={isDark ? t.light : t.dark} border={border} panelBg={panelBg} text={text}>
              {isDark ? <Sun size={17} /> : <Moon size={17} />}
            </IconBtn>
          )}
          <IconBtn onClick={() => setSettingsOpen(true)} title={t.settings} border={border} panelBg={panelBg} text={text}>
            <Settings size={16} />
          </IconBtn>
          {isMobile && (
            <IconBtn onClick={() => setSheetOpen(true)} title={t.tools} border={border} panelBg={panelBg} text={text}>
              <SlidersHorizontal size={16} />
            </IconBtn>
          )}
        </div>
      </div>

      <div style={{ flex: 1, display: "flex", flexDirection: isMobile ? "column" : "row", overflow: "hidden", position: "relative" }}>
        {/* Tool rail */}
        <div style={{
          width: isMobile ? "100%" : 64, height: isMobile ? 58 : "auto",
          background: panelBg,
          borderInlineEnd: isMobile ? "none" : `1px solid ${border}`,
          borderBottom: isMobile ? `1px solid ${border}` : "none",
          display: "flex", flexDirection: isMobile ? "row" : "column",
          alignItems: "center", justifyContent: isMobile ? "flex-start" : "flex-start",
          padding: isMobile ? "0 8px" : "14px 0", gap: 6,
          flexShrink: 0, overflowX: isMobile ? "auto" : "visible",
          order: isMobile ? 2 : 0,
        }}>
          {tools.map(({ id, icon: Icon, label }) => (
            <button key={id} title={label} onClick={() => setTool(id)} style={{
              width: 42, height: 42, borderRadius: 10, border: "none", cursor: "pointer",
              background: tool === id ? accent : "transparent",
              color: tool === id ? "#fff" : text,
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "background .15s ease", flexShrink: 0,
            }}>
              <Icon size={18} />
            </button>
          ))}
        </div>

        {/* Canvas area */}
        <div
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onPointerLeave={(e) => { if (activePointers.current.size < 2) onPointerUp(e); }}
          style={{
            flex: 1, position: "relative", overflow: "auto", order: isMobile ? 1 : 0,
            background: workspaceBg,
            display: "flex", alignItems: "center", justifyContent: "center",
            touchAction: "none",
          }}>
          <div style={{
            position: "relative", transform: `scale(${zoom}) rotate(${viewRotation}deg)`, transformOrigin: "center",
            borderRadius: 2, overflow: "hidden",
          }}>
            <canvas
              ref={compositeRef}
              width={CANVAS_W}
              height={CANVAS_H}
              style={{ display: "block", background: "#FFFFFF", cursor: tool === "eyedropper" ? "crosshair" : "default", touchAction: "none" }}
            />
            <canvas
              ref={overlayRef}
              width={CANVAS_W}
              height={CANVAS_H}
              style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
            />
            {pendingText && (
              <input
                ref={textInputRef}
                autoFocus
                placeholder={t.typeHere}
                value={pendingText.value}
                onChange={(e) => setPendingText((p) => ({ ...p, value: e.target.value }))}
                onKeyDown={(e) => { if (e.key === "Enter") confirmText(); if (e.key === "Escape") setPendingText(null); }}
                onBlur={confirmText}
                style={{
                  position: "absolute",
                  left: dir === "ltr" ? pendingText.x : undefined,
                  right: dir === "rtl" ? CANVAS_W - pendingText.x : undefined,
                  top: pendingText.y - size,
                  fontSize: size * 2, color, background: "transparent",
                  border: `1px dashed ${accent}`, outline: "none", padding: 2,
                  fontFamily: "'Inter', sans-serif", minWidth: 120,
                }}
              />
            )}
          </div>
          {reference && (
            <ReferencePanel
              reference={reference}
              setReference={setReference}
              border={border}
              panelBg={panelBg}
              text={text}
              accent={accent}
              t={t}
            />
          )}
        </div>

        {/* Right panel (desktop) / bottom sheet (mobile) */}
        {(!isMobile || sheetOpen) && (
          <div style={isMobile ? {
            position: "absolute", inset: 0, zIndex: 20, display: "flex", flexDirection: "column",
          } : {
            width: 260, background: panelBg, borderInlineStart: `1px solid ${border}`,
            display: "flex", flexDirection: "column", flexShrink: 0, overflowY: "auto",
          }}>
            {isMobile && (
              <div onClick={() => setSheetOpen(false)} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,.4)" }} />
            )}
            <div style={isMobile ? {
              position: "absolute", left: 0, right: 0, bottom: 0, maxHeight: "78vh",
              background: panelBg, borderRadius: "18px 18px 0 0", overflowY: "auto",
              boxShadow: "0 -10px 40px rgba(0,0,0,.35)", paddingBottom: 12,
            } : {}}>
              {isMobile && (
                <div style={{ padding: "12px 16px 8px" }}>
                  <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 8 }}>
                    <button onClick={() => setSheetOpen(false)} style={{
                      width: 32, height: 32, borderRadius: 8, border: "none", background: "transparent", color: text, cursor: "pointer",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}><X size={18} /></button>
                  </div>
                  <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 2 }}>
                    <IconBtn onClick={() => setZoom((z) => Math.max(0.15, z - 0.1))} title={t.zoomOut} border={border} panelBg={panelBg} text={text}><ZoomOut size={16} /></IconBtn>
                    <IconBtn onClick={() => setZoom((z) => Math.min(3, z + 0.1))} title={t.zoomIn} border={border} panelBg={panelBg} text={text}><ZoomIn size={16} /></IconBtn>
                    <IconBtn onClick={() => setLang((l) => (l === "en" ? "ar" : "en"))} title="Language" border={border} panelBg={panelBg} text={text}><Languages size={16} /></IconBtn>
                    <IconBtn onClick={() => setTheme((th) => (th === "dark" ? "light" : "dark"))} title={isDark ? t.light : t.dark} border={border} panelBg={panelBg} text={text}>
                      {isDark ? <Sun size={16} /> : <Moon size={16} />}
                    </IconBtn>
                    <IconBtn onClick={() => reference ? setReference((r) => ({ ...r, hidden: !r.hidden })) : refFileInputRef.current.click()}
                      title={t.reference} border={border} panelBg={reference && !reference.hidden ? accent : panelBg} text={reference && !reference.hidden ? "#fff" : text}>
                      <ImageIcon size={16} />
                    </IconBtn>
                    <IconBtn onClick={() => { setSizeDraft(canvasSize); setCanvasSettingsOpen(true); }} title={t.canvasSettings} border={border} panelBg={panelBg} text={text}>
                      <Maximize2 size={16} />
                    </IconBtn>
                    <IconBtn onClick={() => setSettingsOpen(true)} title={t.settings} border={border} panelBg={panelBg} text={text}>
                      <Settings size={16} />
                    </IconBtn>
                    <button onClick={() => { setSheetOpen(false); generateTimelapse(); }} style={{
                      display: "flex", alignItems: "center", gap: 6, padding: "0 14px", height: 34, flexShrink: 0,
                      borderRadius: 8, border: `1px solid ${border}`, background: "transparent", color: text,
                      fontSize: 12.5, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap",
                    }}>
                      <Film size={14} /> {t.finish}
                    </button>
                  </div>
                </div>
              )}
          {/* Brush settings */}
          <Section title={t.brush} border={border} textMuted={textMuted}>
            <div style={{ fontSize: 11, color: textMuted, marginBottom: 8, textTransform: "uppercase", letterSpacing: ".05em" }}>{t.brushType}</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 6, marginBottom: 14 }}>
              {brushTypes.map(({ id, icon: BIcon, label }) => (
                <button key={id} title={label} onClick={() => setBrushType(id)} style={{
                  display: "flex", flexDirection: "column", alignItems: "center", gap: 4, padding: "8px 2px",
                  borderRadius: 8, cursor: "pointer",
                  background: brushType === id ? accent : "transparent",
                  color: brushType === id ? "#fff" : text,
                  border: `1px solid ${brushType === id ? accent : border}`,
                }}>
                  <BIcon size={15} />
                  <span style={{ fontSize: 9.5 }}>{label}</span>
                </button>
              ))}
            </div>
            <LabeledSlider label={t.size} value={size} min={1} max={80} onChange={setSize} textMuted={textMuted} accent={accent} unit="px" />
            <LabeledSlider label={t.opacity} value={opacity} min={1} max={100} onChange={setOpacity} textMuted={textMuted} accent={accent} unit="%" />
          </Section>

          {/* View / rotation */}
          <Section title={t.rotation} border={border} textMuted={textMuted}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <RotateCw size={15} color={textMuted} />
              <input type="range" min={-180} max={180} value={viewRotation}
                onChange={(e) => {
                  let v = Number(e.target.value);
                  if (safeRotate) v = Math.round(v / 15) * 15;
                  setViewRotation(v);
                }}
                style={{ flex: 1, accentColor: accent }} />
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11.5, color: textMuted, minWidth: 36, textAlign: "end" }}>{viewRotation}°</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ fontSize: 12, color: textMuted }}>{t.safeRotate}</span>
              <Toggle checked={safeRotate} onChange={() => setSafeRotate((v) => !v)} accent={accent} border={border} />
            </div>
            <button onClick={() => setViewRotation(0)} style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: 6, width: "100%",
              padding: "7px 0", borderRadius: 8, border: `1px solid ${border}`, background: "transparent",
              color: textMuted, fontSize: 12, cursor: "pointer",
            }}>
              <RefreshCw size={12} /> {t.resetRotation}
            </button>
          </Section>

          {/* Color */}
          <Section title={t.color} border={border} textMuted={textMuted}>
            <ColorWheel
              color={color}
              onChange={(c) => { setColor(c); }}
              onCommit={(c) => addRecentColor(c)}
              border={border}
              isDark={isDark}
            />
            <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "14px 0 12px" }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, border: `1px solid ${border}`, background: color, flexShrink: 0 }} />
              <input type="text" value={color} onChange={(e) => { setColor(e.target.value); }} onBlur={(e) => addRecentColor(e.target.value)}
                style={{
                  flex: 1, background: isDark ? "#0E0F13" : "#F3F3F6", border: `1px solid ${border}`,
                  borderRadius: 8, padding: "8px 10px", color: text, fontFamily: "'JetBrains Mono', monospace", fontSize: 12,
                }} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(8, 1fr)", gap: 6, marginBottom: 10 }}>
              {SWATCHES.map((c) => (
                <button key={c} onClick={() => { setColor(c); addRecentColor(c); }} style={{
                  width: "100%", aspectRatio: "1", borderRadius: 6, background: c, cursor: "pointer",
                  border: color === c ? `2px solid ${accent}` : `1px solid ${border}`,
                }} />
              ))}
            </div>
            <div style={{ fontSize: 11, color: textMuted, marginBottom: 6, textTransform: "uppercase", letterSpacing: ".05em" }}>{t.recent}</div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {recentColors.map((c, i) => (
                <button key={c + i} onClick={() => setColor(c)} style={{
                  width: 22, height: 22, borderRadius: 5, background: c, cursor: "pointer", border: `1px solid ${border}`,
                }} />
              ))}
            </div>
          </Section>

          {/* Layers */}
          <Section title={t.layers} border={border} textMuted={textMuted} noBorderBottom>
            <button onClick={addLayer} style={{
              display: "flex", alignItems: "center", gap: 6, width: "100%", justifyContent: "center",
              padding: "8px 0", borderRadius: 8, border: `1px dashed ${border}`, background: "transparent",
              color: textMuted, fontSize: 12.5, cursor: "pointer", marginBottom: 10,
            }}>
              <Plus size={14} /> {t.addLayer}
            </button>

            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {layers.map((l) => (
                <div key={l.id} onClick={() => setActiveLayerId(l.id)} style={{
                  padding: "8px 10px", borderRadius: 8, cursor: "pointer",
                  background: activeLayerId === l.id ? (isDark ? "#232430" : "#EFEDFF") : "transparent",
                  border: `1px solid ${activeLayerId === l.id ? accent : "transparent"}`,
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    {appSettings.showThumbnails && (
                      <LayerThumb layerCanvas={l.canvas} tick={thumbTick} border={border} canvasBgColor="#FFFFFF" />
                    )}
                    <span style={{ fontSize: 12.5, flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{l.name}</span>
                    <MiniIcon onClick={(e) => { e.stopPropagation(); toggleVisible(l.id); }} title={t.visible}>
                      {l.visible ? <Eye size={13} /> : <EyeOff size={13} />}
                    </MiniIcon>
                    <MiniIcon onClick={(e) => { e.stopPropagation(); toggleLock(l.id); }} title={t.locked}>
                      {l.locked ? <Lock size={13} /> : <Unlock size={13} />}
                    </MiniIcon>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 6 }}>
                    <input type="range" min={0} max={100} value={l.opacity}
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) => setLayerOpacity(l.id, Number(e.target.value))}
                      style={{ flex: 1, accentColor: accent, height: 4 }} />
                    <MiniIcon onClick={(e) => { e.stopPropagation(); moveLayer(l.id, "up"); }} title={t.moveUp}><ChevronUp size={13} /></MiniIcon>
                    <MiniIcon onClick={(e) => { e.stopPropagation(); moveLayer(l.id, "down"); }} title={t.moveDown}><ChevronDown size={13} /></MiniIcon>
                    <MiniIcon onClick={(e) => { e.stopPropagation(); deleteLayer(l.id); }} title={t.delete}><Trash2 size={13} /></MiniIcon>
                  </div>
                  <select
                    value={l.blendMode || "source-over"}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => setLayerBlendMode(l.id, e.target.value)}
                    style={{
                      width: "100%", marginTop: 6, fontSize: 11, padding: "5px 6px", borderRadius: 6,
                      border: `1px solid ${border}`, background: isDark ? "#0E0F13" : "#F3F3F6", color: text,
                    }}
                  >
                    {BLEND_MODES.map((m) => (
                      <option key={m} value={m}>{t["blend_" + m.replace(/-/g, "_")]}</option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </Section>
            </div>
          </div>
        )}
      </div>

      {/* Hidden canvas used only to encode the timelapse video */}
      <canvas ref={finishCanvasRef} style={{ display: "none" }} />

      {finishModal && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 100, background: "rgba(0,0,0,.6)",
          display: "flex", alignItems: "center", justifyContent: "center", padding: 20,
        }}>
          <div style={{
            background: panelBg, borderRadius: 16, padding: 22, width: "100%", maxWidth: 420,
            border: `1px solid ${border}`, color: text,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <span style={{ fontWeight: 700, fontSize: 15 }}>
                {finishModal.status === "ready" ? t.timelapseTitle : t.finish}
              </span>
              <button onClick={() => setFinishModal(null)} style={{
                width: 28, height: 28, borderRadius: 8, border: "none", background: "transparent", color: text, cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}><X size={16} /></button>
            </div>

            {finishModal.status === "empty" && (
              <p style={{ fontSize: 13, color: textMuted, lineHeight: 1.6 }}>{t.noStrokesYet}</p>
            )}

            {finishModal.status === "generating" && (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14, padding: "20px 0" }}>
                <div style={{
                  width: 34, height: 34, borderRadius: "50%", border: `3px solid ${border}`,
                  borderTopColor: accent, animation: "spin 0.9s linear infinite",
                }} />
                <span style={{ fontSize: 13, color: textMuted }}>{t.generating}</span>
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
              </div>
            )}

            {finishModal.status === "ready" && (
              <>
                <video src={finishModal.url} controls autoPlay loop
                  style={{ width: "100%", borderRadius: 10, background: "#000", marginBottom: 14 }} />
                <div style={{ display: "flex", gap: 10 }}>
                  <button onClick={downloadTimelapse} style={{
                    flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                    padding: "10px 0", borderRadius: 10, border: `1px solid ${border}`, background: "transparent",
                    color: text, fontSize: 13, fontWeight: 600, cursor: "pointer",
                  }}><Download size={15} /> {t.download}</button>
                  <button onClick={shareTimelapse} style={{
                    flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                    padding: "10px 0", borderRadius: 10, border: "none", background: accent,
                    color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer",
                  }}><Share2 size={15} /> {t.share}</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Canvas settings modal */}
      {canvasSettingsOpen && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 110, background: "rgba(0,0,0,.6)",
          display: "flex", alignItems: "center", justifyContent: "center", padding: 20,
        }} onClick={() => setCanvasSettingsOpen(false)}>
          <div onClick={(e) => e.stopPropagation()} style={{
            background: panelBg, borderRadius: 16, padding: 22, width: "100%", maxWidth: 380,
            border: `1px solid ${border}`, color: text,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <span style={{ fontWeight: 700, fontSize: 15 }}>{t.canvasSettings}</span>
              <button onClick={() => setCanvasSettingsOpen(false)} style={{
                width: 28, height: 28, borderRadius: 8, border: "none", background: "transparent", color: text, cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}><X size={16} /></button>
            </div>

            <div style={{ fontSize: 11, color: textMuted, marginBottom: 8, textTransform: "uppercase", letterSpacing: ".05em" }}>{t.preset}</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, marginBottom: 16 }}>
              {CANVAS_SIZE_PRESETS.map((p) => (
                <button key={p.id} onClick={() => setSizeDraft({ w: p.w, h: p.h })} style={{
                  padding: "10px 4px", borderRadius: 10, cursor: "pointer", fontSize: 11.5,
                  background: (sizeDraft.w === p.w && sizeDraft.h === p.h) ? accent : "transparent",
                  color: (sizeDraft.w === p.w && sizeDraft.h === p.h) ? "#fff" : text,
                  border: `1px solid ${(sizeDraft.w === p.w && sizeDraft.h === p.h) ? accent : border}`,
                }}>{t[p.id]}</button>
              ))}
            </div>

            <div style={{ fontSize: 11, color: textMuted, marginBottom: 8, textTransform: "uppercase", letterSpacing: ".05em" }}>{t.custom}</div>
            <div style={{ display: "flex", gap: 10, marginBottom: 18 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, color: textMuted, marginBottom: 4 }}>{t.width}</div>
                <input type="number" min={64} max={6000} value={sizeDraft.w}
                  onChange={(e) => setSizeDraft((s) => ({ ...s, w: Number(e.target.value) }))}
                  style={{ width: "100%", background: isDark ? "#0E0F13" : "#F3F3F6", border: `1px solid ${border}`, borderRadius: 8, padding: "8px 10px", color: text, fontSize: 12 }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, color: textMuted, marginBottom: 4 }}>{t.height}</div>
                <input type="number" min={64} max={6000} value={sizeDraft.h}
                  onChange={(e) => setSizeDraft((s) => ({ ...s, h: Number(e.target.value) }))}
                  style={{ width: "100%", background: isDark ? "#0E0F13" : "#F3F3F6", border: `1px solid ${border}`, borderRadius: 8, padding: "8px 10px", color: text, fontSize: 12 }} />
              </div>
            </div>

            <div style={{ fontSize: 11, color: textMuted, marginBottom: 8, textTransform: "uppercase", letterSpacing: ".05em" }}>{t.canvasBg}</div>
            <div style={{ fontSize: 11, color: textMuted, marginBottom: 8 }}>{t.canvasBgHint}</div>
            <div style={{ display: "flex", gap: 8, marginBottom: 20, alignItems: "center" }}>
              {CANVAS_BG_PRESETS.map((p) => (
                <button key={p.id} title={t[p.id]} onClick={() => setWorkspaceBg(p.hex)} style={{
                  width: 30, height: 30, borderRadius: 8, cursor: "pointer",
                  background: p.hex === "transparent" ? "repeating-conic-gradient(#00000033 0% 25%, transparent 0% 50%) 50% / 8px 8px" : p.hex,
                  border: workspaceBg === p.hex ? `2px solid ${accent}` : `1px solid ${border}`,
                }} />
              ))}
              <input type="color" value={workspaceBg.startsWith("#") ? workspaceBg : "#4B4F58"}
                onChange={(e) => setWorkspaceBg(e.target.value)}
                style={{ width: 34, height: 30, borderRadius: 8, border: `1px solid ${border}`, background: "none", cursor: "pointer" }} />
            </div>

            <button onClick={() => applyCanvasResize(sizeDraft.w, sizeDraft.h)} style={{
              width: "100%", padding: "11px 0", borderRadius: 10, border: "none", background: accent,
              color: "#fff", fontSize: 13.5, fontWeight: 700, cursor: "pointer",
            }}>{t.apply}</button>
          </div>
        </div>
      )}

      {/* App settings modal */}
      {settingsOpen && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 110, background: "rgba(0,0,0,.6)",
          display: "flex", alignItems: "center", justifyContent: "center", padding: 20,
        }} onClick={() => setSettingsOpen(false)}>
          <div onClick={(e) => e.stopPropagation()} style={{
            background: panelBg, borderRadius: 16, padding: 22, width: "100%", maxWidth: 380,
            border: `1px solid ${border}`, color: text,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <span style={{ fontWeight: 700, fontSize: 15 }}>{t.settings}</span>
              <button onClick={() => setSettingsOpen(false)} style={{
                width: 28, height: 28, borderRadius: 8, border: "none", background: "transparent", color: text, cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}><X size={16} /></button>
            </div>

            <div style={{ fontSize: 11, color: textMuted, marginBottom: 10, textTransform: "uppercase", letterSpacing: ".05em" }}>{t.generalSettings}</div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 0" }}>
              <span style={{ fontSize: 13 }}>{t.language}</span>
              <button onClick={() => setLang((l) => (l === "en" ? "ar" : "en"))} style={{
                display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", borderRadius: 8,
                border: `1px solid ${border}`, background: "transparent", color: text, fontSize: 12, cursor: "pointer",
              }}><Languages size={13} /> {lang === "en" ? "EN" : "AR"}</button>
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 0" }}>
              <span style={{ fontSize: 13 }}>{t.theme}</span>
              <button onClick={() => setTheme((th) => (th === "dark" ? "light" : "dark"))} style={{
                display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", borderRadius: 8,
                border: `1px solid ${border}`, background: "transparent", color: text, fontSize: 12, cursor: "pointer",
              }}>{isDark ? <Moon size={13} /> : <Sun size={13} />} {isDark ? t.dark : t.light}</button>
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 0" }}>
              <span style={{ fontSize: 13 }}>{t.showThumbnails}</span>
              <Toggle checked={appSettings.showThumbnails} onChange={() => setAppSettings((s) => ({ ...s, showThumbnails: !s.showThumbnails }))} accent={accent} border={border} />
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 0" }}>
              <span style={{ fontSize: 13 }}>{t.quickEyedropper}</span>
              <Toggle checked={appSettings.quickEyedropper} onChange={() => setAppSettings((s) => ({ ...s, quickEyedropper: !s.quickEyedropper }))} accent={accent} border={border} />
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 0" }}>
              <span style={{ fontSize: 13 }}>{t.safeRotate}</span>
              <Toggle checked={safeRotate} onChange={() => setSafeRotate((v) => !v)} accent={accent} border={border} />
            </div>

            <button onClick={() => {
              setAppSettings({ showThumbnails: true, quickEyedropper: true });
              setSafeRotate(true);
              setViewRotation(0);
              setWorkspaceBg("#4B4F58");
            }} style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: 6, width: "100%", marginTop: 14,
              padding: "10px 0", borderRadius: 10, border: `1px solid ${border}`, background: "transparent",
              color: textMuted, fontSize: 12.5, cursor: "pointer",
            }}>
              <RefreshCw size={13} /> {t.resetSettings}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------------- small components ---------------- */
function ReferencePanel({ reference, setReference, border, panelBg, text, accent, t }) {
  const dragRef = useRef(null);
  const resizeRef = useRef(null);

  if (reference.hidden) return null;

  const onHeaderDown = (e) => {
    e.stopPropagation();
    dragRef.current = { startX: e.clientX, startY: e.clientY, ox: reference.x, oy: reference.y };
  };
  const onResizeDown = (e) => {
    e.stopPropagation();
    resizeRef.current = { startX: e.clientX, startY: e.clientY, ow: reference.w, oh: reference.h };
  };

  useEffect(() => {
    const onMove = (e) => {
      if (dragRef.current) {
        const d = dragRef.current;
        setReference((r) => ({ ...r, x: d.ox + (e.clientX - d.startX), y: d.oy + (e.clientY - d.startY) }));
      } else if (resizeRef.current) {
        const d = resizeRef.current;
        setReference((r) => ({
          ...r,
          w: Math.max(80, d.ow + (e.clientX - d.startX)),
          h: Math.max(80, d.oh + (e.clientY - d.startY)),
        }));
      }
    };
    const onUp = () => { dragRef.current = null; resizeRef.current = null; };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [setReference]);

  return (
    <div style={{
      position: "absolute", left: reference.x, top: reference.y, width: reference.w, height: reference.h + 54,
      background: panelBg, border: `1px solid ${border}`, borderRadius: 10, overflow: "hidden",
      boxShadow: "0 12px 30px rgba(0,0,0,.3)", zIndex: 15, display: "flex", flexDirection: "column",
    }}>
      <div onPointerDown={onHeaderDown} style={{
        height: 30, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 6px 0 8px", cursor: "grab", background: panelBg, borderBottom: `1px solid ${border}`,
        touchAction: "none",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, color: text, opacity: 0.6 }}>
          <Move size={12} />
          <span style={{ fontSize: 11 }}>{t.reference}</span>
        </div>
        <div style={{ display: "flex", gap: 2 }}>
          <MiniIcon title={t.flipReference} onClick={() => setReference((r) => ({ ...r, flipped: !r.flipped }))}><FlipHorizontal size={13} /></MiniIcon>
          <MiniIcon title={t.removeReference} onClick={() => setReference(null)}><X size={13} /></MiniIcon>
        </div>
      </div>
      <div style={{ position: "relative", flex: 1, overflow: "hidden" }}>
        <img
          src={reference.src}
          alt=""
          draggable={false}
          style={{
            width: "100%", height: "100%", objectFit: "contain",
            opacity: reference.opacity / 100,
            transform: reference.flipped ? "scaleX(-1)" : "none",
            pointerEvents: "none", userSelect: "none",
          }}
        />
        <div
          onPointerDown={onResizeDown}
          style={{
            position: "absolute", right: 2, bottom: 2, width: 16, height: 16, cursor: "nwse-resize",
            borderRight: `2px solid ${accent}`, borderBottom: `2px solid ${accent}`, opacity: 0.7,
            touchAction: "none",
          }}
        />
      </div>
      <div style={{ flexShrink: 0, padding: "4px 10px 8px", display: "flex", alignItems: "center", gap: 6 }}>
        <span style={{ fontSize: 10, color: text, opacity: 0.55, whiteSpace: "nowrap" }}>{t.referenceOpacity}</span>
        <input
          type="range" min={10} max={100} value={reference.opacity}
          onPointerDown={(e) => e.stopPropagation()}
          onChange={(e) => setReference((r) => ({ ...r, opacity: Number(e.target.value) }))}
          style={{ flex: 1, accentColor: accent, height: 4 }}
        />
      </div>
    </div>
  );
}

function Toggle({ checked, onChange, accent, border }) {
  return (
    <button onClick={onChange} style={{
      width: 38, height: 22, borderRadius: 11, border: `1px solid ${checked ? accent : border}`,
      background: checked ? accent : "transparent", cursor: "pointer", position: "relative", flexShrink: 0,
      transition: "background .15s ease, border-color .15s ease",
    }}>
      <span style={{
        position: "absolute", top: 2, insetInlineStart: checked ? 18 : 2, width: 16, height: 16, borderRadius: "50%",
        background: checked ? "#fff" : "#8A8B96", transition: "inset-inline-start .15s ease",
      }} />
    </button>
  );
}

function LayerThumb({ layerCanvas, tick, border, canvasBgColor }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !layerCanvas) return;
    const ctx = el.getContext("2d");
    ctx.clearRect(0, 0, el.width, el.height);
    if (canvasBgColor && canvasBgColor !== "transparent") {
      ctx.fillStyle = canvasBgColor;
      ctx.fillRect(0, 0, el.width, el.height);
    }
    ctx.drawImage(layerCanvas, 0, 0, layerCanvas.width, layerCanvas.height, 0, 0, el.width, el.height);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [layerCanvas, tick]);
  return (
    <canvas ref={ref} width={40} height={30} style={{
      width: 40, height: 30, borderRadius: 5, border: `1px solid ${border}`, flexShrink: 0,
      background: "repeating-conic-gradient(#00000022 0% 25%, transparent 0% 50%) 50% / 8px 8px",
    }} />
  );
}

function IconBtn({ children, onClick, disabled, title, border, panelBg, text }) {
  return (
    <button onClick={onClick} disabled={disabled} title={title} style={{
      width: 34, height: 34, borderRadius: 8, border: `1px solid ${border}`,
      background: panelBg, color: text, opacity: disabled ? 0.35 : 1,
      display: "flex", alignItems: "center", justifyContent: "center",
      cursor: disabled ? "default" : "pointer",
    }}>
      {children}
    </button>
  );
}

function MiniIcon({ children, onClick, title }) {
  return (
    <button onClick={onClick} title={title} style={{
      width: 22, height: 22, borderRadius: 5, border: "none", background: "transparent",
      color: "inherit", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
      opacity: 0.8,
    }}>
      {children}
    </button>
  );
}

function Section({ title, children, border, textMuted, noBorderBottom }) {
  return (
    <div style={{ padding: 16, borderBottom: noBorderBottom ? "none" : `1px solid ${border}` }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: textMuted, textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 12 }}>
        {title}
      </div>
      {children}
    </div>
  );
}

function ColorWheel({ color, onChange, onCommit, border, isDark }) {
  const size = 176;
  const radius = size / 2;
  const wheelRef = useRef(null);
  const dragging = useRef(false);

  const { r, g, b } = hexToRgb(color);
  const { h, s, v } = rgbToHsv(r, g, b);

  const pickFromEvent = (clientX, clientY, keepV) => {
    const rect = wheelRef.current.getBoundingClientRect();
    const cx = rect.left + radius, cy = rect.top + radius;
    const dx = clientX - cx, dy = clientY - cy;
    const dist = Math.min(Math.sqrt(dx * dx + dy * dy), radius);
    const sat = dist / radius;
    let angle = (Math.atan2(dy, dx) * 180) / Math.PI;
    if (angle < 0) angle += 360;
    const rgb = hsvToRgb(angle, sat, keepV ? v : v);
    onChange(rgbToHex(rgb.r, rgb.g, rgb.b));
  };

  const onDown = (e) => {
    dragging.current = true;
    pickFromEvent(e.clientX, e.clientY);
  };
  useEffect(() => {
    const onMove = (e) => { if (dragging.current) pickFromEvent(e.clientX, e.clientY); };
    const onUp = () => {
      if (dragging.current) { dragging.current = false; onCommit(color); }
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [color]);

  const dotX = radius + Math.cos((h * Math.PI) / 180) * s * radius;
  const dotY = radius + Math.sin((h * Math.PI) / 180) * s * radius;

  const setBrightness = (newV) => {
    const rgb = hsvToRgb(h, s, newV);
    const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
    onChange(hex);
    onCommit(hex);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
      <div
        ref={wheelRef}
        onPointerDown={onDown}
        style={{
          width: size, height: size, borderRadius: "50%", position: "relative", cursor: "crosshair",
          background: `conic-gradient(from 90deg, red, magenta, blue, cyan, lime, yellow, red)`,
          boxShadow: isDark ? "0 0 0 1px rgba(255,255,255,.06)" : "0 0 0 1px rgba(0,0,0,.06)",
        }}
      >
        <div style={{
          position: "absolute", inset: 0, borderRadius: "50%",
          background: "radial-gradient(circle, #fff 0%, rgba(255,255,255,0) 72%)",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", inset: 0, borderRadius: "50%",
          background: `radial-gradient(circle, rgba(0,0,0,0) 0%, rgba(0,0,0,${1 - v}) 100%)`,
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", left: dotX - 8, top: dotY - 8, width: 16, height: 16,
          borderRadius: "50%", background: color, border: "2px solid #fff",
          boxShadow: "0 1px 4px rgba(0,0,0,.4)", pointerEvents: "none",
        }} />
      </div>
      <input
        type="range" min={0} max={100} value={Math.round(v * 100)}
        onChange={(e) => setBrightness(Number(e.target.value) / 100)}
        style={{
          width: "100%", height: 10, borderRadius: 5, appearance: "none", cursor: "pointer",
          background: `linear-gradient(90deg, #000, ${rgbToHex(hsvToRgb(h, s, 1).r, hsvToRgb(h, s, 1).g, hsvToRgb(h, s, 1).b)})`,
          accentColor: "#fff",
        }}
      />
    </div>
  );
}

function LabeledSlider({ label, value, min, max, onChange, textMuted, accent, unit }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 6, color: textMuted }}>
        <span>{label}</span>
        <span style={{ fontFamily: "'JetBrains Mono', monospace" }}>{value}{unit}</span>
      </div>
      <input type="range" min={min} max={max} value={value} onChange={(e) => onChange(Number(e.target.value))}
        style={{ width: "100%", accentColor: accent }} />
    </div>
  );
}

/* ---------------- mock data ---------------- */
const USER = { name: "سارة القحطاني", handle: "@sara.draws", tier: "Pro", avatarGrad: ["#3B82F6", "#8B5CF6"] };

const NAV = [
  { id: "home", label: "الرئيسية", icon: HomeIcon },
  { id: "drawings", label: "رسماتي", icon: Layers },
  { id: "gallery", label: "المعرض", icon: ImageIcon },
  { id: "challenges", label: "التحديات", icon: Trophy },
  { id: "profile", label: "الملف الشخصي", icon: User },
];

const RECENT_DRAWINGS = [
  { id: 1, title: "أميرة الغيوم", updated: "قبل ساعتين", progress: 78, grad: ["#1e3a8a", "#7c3aed"] },
  { id: 2, title: "مدينة الليل", updated: "أمس", progress: 45, grad: ["#0f172a", "#334155"] },
  { id: 3, title: "طائر الفينيق", updated: "قبل 3 أيام", progress: 92, grad: ["#7c2d12", "#ea580c"] },
  { id: 4, title: "بورتريه شخصي", updated: "الأسبوع الماضي", progress: 30, grad: ["#134e4a", "#0d9488"] },
];

const FRIENDS_ONLINE = [
  { id: 1, name: "نورة", online: true, grad: ["#3B82F6", "#06b6d4"] },
  { id: 2, name: "فيصل", online: true, grad: ["#8B5CF6", "#ec4899"] },
  { id: 3, name: "ريم", online: true, grad: ["#F5A623", "#ea580c"] },
  { id: 4, name: "عبدالله", online: false, grad: ["#22C55E", "#0d9488"] },
  { id: 5, name: "لمى", online: true, grad: ["#3B82F6", "#1e3a8a"] },
  { id: 6, name: "خالد", online: false, grad: ["#8B5CF6", "#3B82F6"] },
];

const GALLERY_HIGHLIGHTS = [
  { id: 1, artist: "عمر الشمري", likes: "2.4k", views: "18k", grad: ["#312e81", "#4c1d95"] },
  { id: 2, artist: "هدى ناصر", likes: "1.9k", views: "12k", grad: ["#7c2d12", "#c2410c"] },
  { id: 3, artist: "يوسف علي", likes: "3.1k", views: "27k", grad: ["#134e4a", "#065f46"] },
  { id: 4, artist: "منى فهد", likes: "980", views: "6.2k", grad: ["#1e3a8a", "#3B82F6"] },
];

const RECENT_ACTIVITY = [
  { id: 1, text: "أعجبت هدى ناصر برسمتك \"أميرة الغيوم\"", time: "قبل 12 دقيقة", icon: Heart, color: "#F5A623" },
  { id: 2, text: "دعاك فيصل لغرفة رسم جماعي", time: "قبل 40 دقيقة", icon: Users, color: "#3B82F6" },
  { id: 3, text: "بدأ متابعتك عمر الشمري", time: "قبل ساعة", icon: User, color: "#22C55E" },
  { id: 4, text: "علّقت نورة على \"مدينة الليل\"", time: "قبل 3 ساعات", icon: Sparkles, color: "#8B5CF6" },
];

const NOTIFICATIONS = [
  { id: 1, text: "أعجبت هدى ناصر برسمتك \"أميرة الغيوم\"", time: "قبل 12 دقيقة", icon: Heart, color: "#F5A623", unread: true },
  { id: 2, text: "دعاك فيصل لغرفة رسم جماعي \"ليلة الرسم\"", time: "قبل 40 دقيقة", icon: Users, color: "#3B82F6", unread: true },
  { id: 3, text: "بدأ متابعتك عمر الشمري", time: "قبل ساعة", icon: User, color: "#22C55E", unread: false },
  { id: 4, text: "تذكير: تحدي الأسبوع ينتهي خلال يومين", time: "قبل 5 ساعات", icon: Flame, color: "#F43F5E", unread: false },
];

const SEARCH_INDEX = [
  { type: "رسمة", label: "أميرة الغيوم" },
  { type: "رسمة", label: "مدينة الليل" },
  { type: "رسمة", label: "طائر الفينيق" },
  { type: "فنان", label: "عمر الشمري" },
  { type: "فنان", label: "هدى ناصر" },
  { type: "فنان", label: "يوسف علي" },
  { type: "غرفة", label: "ليلة الرسم الجماعي" },
];

/* ---------------- helpers ---------------- */
const grad = (colors, deg = 135) => `linear-gradient(${deg}deg, ${colors[0]}, ${colors[1]})`;
const initials = (name) => name.trim().split(" ")[0]?.[0] || "?";

function HomePage({ onOpenStudio }) {
  const [activeNav, setActiveNav] = useState("home");
  const [collapsed, setCollapsed] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [joinCode, setJoinCode] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [notifOpen, setNotifOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(NOTIFICATIONS.filter((n) => n.unread).length);
  const [darkMode, setDarkMode] = useState(true);

  const searchWrapRef = useRef(null);
  const notifWrapRef = useRef(null);
  const settingsWrapRef = useRef(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 900);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Close any open dropdown when clicking outside of it
  useEffect(() => {
    const onDocClick = (e) => {
      if (notifWrapRef.current && !notifWrapRef.current.contains(e.target)) setNotifOpen(false);
      if (settingsWrapRef.current && !settingsWrapRef.current.contains(e.target)) setSettingsOpen(false);
      if (searchWrapRef.current && !searchWrapRef.current.contains(e.target)) setSearchFocused(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  const [searchFocused, setSearchFocused] = useState(false);
  const searchResults = searchQuery.trim()
    ? SEARCH_INDEX.filter((s) => s.label.includes(searchQuery.trim()))
    : [];

  const openNotifications = () => {
    setNotifOpen((v) => !v);
    setSettingsOpen(false);
    if (!notifOpen) setUnreadCount(0);
  };
  const openSettings = () => {
    setSettingsOpen((v) => !v);
    setNotifOpen(false);
  };

  const scrollRef = useRef(null);
  const onScroll = (e) => setScrolled(e.target.scrollTop > 8);

  /* ---- palette ---- */
  const bg = "#070C18";
  const bgGradient = "radial-gradient(1200px 600px at 15% -10%, #14224a 0%, transparent 60%), radial-gradient(900px 500px at 100% 0%, #1b1140 0%, transparent 55%), #070C18";
  const panel = "#0E1730";
  const panelBorder = "rgba(255,255,255,0.07)";
  const glass = "rgba(18,27,54,0.55)";
  const textPrimary = "#EEF2FC";
  const textMuted = "#8B96B8";
  const accent = "#3B82F6";
  const accent2 = "#8B5CF6";

  return (
    <div dir="rtl" style={{
      fontFamily: "'Almarai','Inter',system-ui,sans-serif",
      background: bgGradient, color: textPrimary, height: "100vh", width: "100%",
      display: "flex", overflow: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Almarai:wght@400;700;800&family=Inter:wght@400;600;700&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.12); border-radius: 10px; }
        .hoverlift { transition: transform .22s ease, box-shadow .22s ease, border-color .22s ease; }
        .hoverlift:hover { transform: translateY(-3px); box-shadow: 0 18px 40px rgba(0,0,0,.35); }
        .scrollx { display: flex; gap: 14px; overflow-x: auto; padding-bottom: 6px; scroll-snap-type: x proximity; }
        .scrollx::-webkit-scrollbar { display: none; }
        .fade-row { position: relative; }
        input::placeholder { color: #6B7699; }
      `}</style>

      {/* -------- Sidebar (desktop) -------- */}
      {!isMobile && (
        <div style={{
          width: collapsed ? 76 : 232, flexShrink: 0, background: panel,
          borderInlineStart: `1px solid ${panelBorder}`, display: "flex", flexDirection: "column",
          padding: "20px 14px", transition: "width .25s ease", zIndex: 5,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 30, padding: "0 6px" }}>
            <div style={{
              width: 32, height: 32, borderRadius: 10, flexShrink: 0,
              background: grad([accent, accent2]), boxShadow: `0 0 20px ${accent}55`,
            }} />
            {!collapsed && <span style={{ fontWeight: 800, fontSize: 16, letterSpacing: "-0.01em" }}>لوحة</span>}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 4, flex: 1 }}>
            {NAV.map(({ id, label, icon: Icon }) => {
              const active = activeNav === id;
              return (
                <button key={id} onClick={() => setActiveNav(id)} style={{
                  display: "flex", alignItems: "center", gap: 12, padding: "11px 12px",
                  borderRadius: 12, border: "none", cursor: "pointer", textAlign: "start",
                  background: active ? "rgba(59,130,246,0.14)" : "transparent",
                  color: active ? "#DCE7FF" : textMuted,
                  fontSize: 13.5, fontWeight: active ? 700 : 500,
                  transition: "background .18s ease, color .18s ease",
                  position: "relative",
                }}>
                  {active && <span style={{
                    position: "absolute", insetInlineEnd: 0, top: 8, bottom: 8, width: 3,
                    borderRadius: 4, background: grad([accent, accent2], 180),
                  }} />}
                  <Icon size={18} style={{ flexShrink: 0 }} />
                  {!collapsed && <span>{label}</span>}
                </button>
              );
            })}
          </div>

          <button onClick={() => setCollapsed((c) => !c)} style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            padding: "9px 10px", borderRadius: 10, border: `1px solid ${panelBorder}`,
            background: "transparent", color: textMuted, cursor: "pointer", fontSize: 12,
          }}>
            {collapsed ? <ChevronLeft size={15} /> : <><ChevronRight size={15} /> طي القائمة</>}
          </button>
        </div>
      )}

      {/* -------- Main column -------- */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, position: "relative" }}>

        {/* Header */}
        <div style={{
          position: "sticky", top: 0, zIndex: 10, flexShrink: 0,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: isMobile ? "12px 16px" : "14px 28px",
          background: scrolled ? glass : "transparent",
          backdropFilter: scrolled ? "blur(18px)" : "none",
          borderBottom: scrolled ? `1px solid ${panelBorder}` : "1px solid transparent",
          transition: "background .25s ease, border-color .25s ease",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0 }}>
            <div style={{ width: 34, height: 34, borderRadius: "50%", flexShrink: 0, background: grad(USER.avatarGrad), display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800 }}>
              {initials(USER.name)}
            </div>
            {!isMobile && (
              <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.25, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ fontWeight: 700, fontSize: 13.5, whiteSpace: "nowrap" }}>{USER.name}</span>
                  <span style={{
                    fontSize: 10, fontWeight: 800, padding: "2px 7px", borderRadius: 999,
                    background: "rgba(139,92,246,0.18)", color: "#C9B7FF", letterSpacing: ".02em",
                  }}>{USER.tier}</span>
                </div>
                <span style={{ fontSize: 11.5, color: textMuted }}>{USER.handle}</span>
              </div>
            )}
          </div>

          {!isMobile && (
            <div ref={searchWrapRef} style={{ flex: 1, maxWidth: 420, margin: "0 24px", position: "relative" }}>
              <Search size={16} style={{ position: "absolute", insetInlineStart: 14, top: "50%", transform: "translateY(-50%)", color: textMuted }} />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                placeholder="ابحث عن رسومات، فنانين، غرف…"
                style={{
                  width: "100%", background: "rgba(255,255,255,0.05)", border: `1px solid ${panelBorder}`,
                  borderRadius: 999, padding: "10px 40px 10px 16px", color: textPrimary, fontSize: 13,
                  fontFamily: "inherit", outline: "none",
                }} />
              {searchFocused && searchQuery.trim() && (
                <div style={{
                  position: "absolute", top: "calc(100% + 8px)", insetInlineStart: 0, insetInlineEnd: 0,
                  background: panel, border: `1px solid ${panelBorder}`, borderRadius: 14, overflow: "hidden",
                  boxShadow: "0 20px 50px rgba(0,0,0,.45)", zIndex: 30,
                }}>
                  {searchResults.length ? searchResults.map((r, i) => (
                    <div key={i} style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      padding: "10px 14px", fontSize: 12.5, cursor: "pointer",
                      borderBottom: i < searchResults.length - 1 ? `1px solid ${panelBorder}` : "none",
                    }}>
                      <span>{r.label}</span>
                      <span style={{ fontSize: 10.5, color: textMuted }}>{r.type}</span>
                    </div>
                  )) : (
                    <div style={{ padding: "14px", fontSize: 12.5, color: textMuted }}>لا توجد نتائج لـ "{searchQuery}"</div>
                  )}
                </div>
              )}
            </div>
          )}

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div ref={notifWrapRef} style={{ position: "relative" }}>
              <HeaderIcon border={panelBorder} onClick={openNotifications}>
                <Bell size={17} />
                {unreadCount > 0 && <Dot color="#F5A623" />}
              </HeaderIcon>
              {notifOpen && (
                <div style={{
                  position: "absolute", top: "calc(100% + 10px)", insetInlineEnd: 0, width: 300,
                  background: panel, border: `1px solid ${panelBorder}`, borderRadius: 16,
                  boxShadow: "0 20px 50px rgba(0,0,0,.45)", zIndex: 30, overflow: "hidden",
                }}>
                  <div style={{ padding: "14px 16px", fontWeight: 800, fontSize: 13, borderBottom: `1px solid ${panelBorder}` }}>الإشعارات</div>
                  <div style={{ maxHeight: 320, overflowY: "auto" }}>
                    {NOTIFICATIONS.map((n) => {
                      const Icon = n.icon;
                      return (
                        <div key={n.id} style={{
                          display: "flex", gap: 10, alignItems: "flex-start", padding: "12px 16px",
                          borderBottom: `1px solid ${panelBorder}`, background: n.unread ? "rgba(59,130,246,0.06)" : "transparent",
                        }}>
                          <div style={{
                            width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
                            background: `${n.color}22`, color: n.color,
                            display: "flex", alignItems: "center", justifyContent: "center",
                          }}><Icon size={13} /></div>
                          <div style={{ minWidth: 0 }}>
                            <div style={{ fontSize: 12, lineHeight: 1.5, color: "#DCE3F7" }}>{n.text}</div>
                            <div style={{ fontSize: 10.5, color: textMuted, marginTop: 2 }}>{n.time}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <div ref={settingsWrapRef} style={{ position: "relative" }}>
              <HeaderIcon border={panelBorder} onClick={openSettings}><Settings size={17} /></HeaderIcon>
              {settingsOpen && (
                <div style={{
                  position: "absolute", top: "calc(100% + 10px)", insetInlineEnd: 0, width: 220,
                  background: panel, border: `1px solid ${panelBorder}`, borderRadius: 16,
                  boxShadow: "0 20px 50px rgba(0,0,0,.45)", zIndex: 30, padding: 8,
                }}>
                  <SettingsRow label="الوضع الداكن" value={darkMode ? "مفعّل" : "متوقف"} onClick={() => setDarkMode((d) => !d)} />
                  <SettingsRow label="اللغة" value="العربية" />
                  <SettingsRow label="الإشعارات" value="الكل" />
                  <div style={{ height: 1, background: panelBorder, margin: "6px 4px" }} />
                  <SettingsRow label="تسجيل الخروج" danger />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Scrollable content */}
        <div ref={scrollRef} onScroll={onScroll} style={{ flex: 1, overflowY: "auto", padding: isMobile ? "8px 16px 90px" : "8px 28px 40px" }}>
          {activeNav === "drawings" ? (
            <DrawingsPage panel={panel} panelBorder={panelBorder} textPrimary={textPrimary} textMuted={textMuted} accent={accent} accent2={accent2} isMobile={isMobile} onOpenStudio={onOpenStudio} />
          ) : activeNav === "challenges" ? (
            <ChallengesPage panel={panel} panelBorder={panelBorder} textPrimary={textPrimary} textMuted={textMuted} accent={accent} accent2={accent2} isMobile={isMobile} onOpenStudio={onOpenStudio} />
          ) : activeNav === "profile" ? (
            <ProfilePage panel={panel} panelBorder={panelBorder} textPrimary={textPrimary} textMuted={textMuted} accent={accent} accent2={accent2} isMobile={isMobile} />
          ) : activeNav !== "home" ? (
            <ComingSoon nav={NAV.find((n) => n.id === activeNav)} panel={panel} panelBorder={panelBorder} textMuted={textMuted} accent={accent} onBack={() => setActiveNav("home")} />
          ) : (
          <>

          {/* Hero actions */}
          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1.3fr 1fr 1fr",
            gap: 14, marginTop: 14, marginBottom: 34,
          }}>
            <HeroCard
              icon={<Plus size={22} />}
              title="رسمة جديدة"
              subtitle="ابدئي مشروعًا فارغًا أو من قالب جاهز"
              gradient={`linear-gradient(135deg, ${accent} 0%, ${accent2} 100%)`}
              onClick={onOpenStudio}
              big
            />
            <div className="hoverlift" style={{
              borderRadius: 20, padding: 18, background: panel, border: `1px solid ${panelBorder}`,
              display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 12,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <IconBubble color="#22C55E"><LogIn size={17} /></IconBubble>
                <span style={{ fontWeight: 700, fontSize: 14 }}>الانضمام إلى غرفة</span>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <input value={joinCode} onChange={(e) => setJoinCode(e.target.value)} placeholder="أدخلي كود الغرفة"
                  style={{
                    flex: 1, background: "rgba(255,255,255,0.05)", border: `1px solid ${panelBorder}`,
                    borderRadius: 10, padding: "8px 12px", color: textPrimary, fontSize: 12.5, outline: "none", fontFamily: "inherit",
                  }} />
                <button style={{
                  padding: "8px 16px", borderRadius: 10, border: "none", background: "#22C55E",
                  color: "#06210f", fontWeight: 800, fontSize: 12.5, cursor: "pointer", whiteSpace: "nowrap",
                }}>دخول</button>
              </div>
            </div>
            <div className="hoverlift" style={{
              borderRadius: 20, padding: 18, background: panel, border: `1px solid ${panelBorder}`,
              display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 12, cursor: "pointer",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <IconBubble color="#F5A623"><Users size={17} /></IconBubble>
                <span style={{ fontWeight: 700, fontSize: 14 }}>إنشاء غرفة</span>
              </div>
              <div style={{ display: "flex", gap: 8, fontSize: 11.5 }}>
                <span style={{ padding: "6px 12px", borderRadius: 999, background: "rgba(245,166,35,0.14)", color: "#FFD9A0" }}>عامة</span>
                <span style={{ padding: "6px 12px", borderRadius: 999, border: `1px solid ${panelBorder}`, color: textMuted }}>خاصة</span>
              </div>
            </div>
          </div>

          {/* Two-column: main feed + activity rail */}
          <div style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
            <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 34 }}>

              {/* Recent drawings */}
              <HomeSection title="آخر الرسومات" action="عرض الكل">
                <div className="scrollx">
                  {RECENT_DRAWINGS.map((d) => (
                    <div key={d.id} className="hoverlift" onClick={onOpenStudio} style={{
                      minWidth: 190, width: 190, flexShrink: 0, borderRadius: 16, overflow: "hidden",
                      border: `1px solid ${panelBorder}`, background: panel, cursor: "pointer", scrollSnapAlign: "start",
                    }}>
                      <div style={{ height: 130, position: "relative", background: grad(d.grad) }}>
                        <div style={{
                          position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
                          background: "rgba(0,0,0,0.18)", opacity: 0, transition: "opacity .2s ease",
                        }} className="playOverlay">
                          <div style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(255,255,255,0.9)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Play size={16} color="#0B1220" fill="#0B1220" />
                          </div>
                        </div>
                        <div style={{
                          position: "absolute", bottom: 8, insetInlineStart: 8, insetInlineEnd: 8, height: 4,
                          borderRadius: 4, background: "rgba(255,255,255,0.25)", overflow: "hidden",
                        }}>
                          <div style={{ width: `${d.progress}%`, height: "100%", background: "#fff" }} />
                        </div>
                      </div>
                      <div style={{ padding: "10px 12px" }}>
                        <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 3 }}>{d.title}</div>
                        <div style={{ fontSize: 11, color: textMuted, display: "flex", alignItems: "center", gap: 4 }}>
                          <Clock size={11} /> {d.updated}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </HomeSection>

              {/* Friends online */}
              <HomeSection title="الأصدقاء المتصلون الآن">
                <div className="scrollx">
                  {FRIENDS_ONLINE.map((f) => (
                    <div key={f.id} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, flexShrink: 0, width: 62 }}>
                      <div style={{ position: "relative" }}>
                        <div style={{
                          width: 52, height: 52, borderRadius: "50%", background: grad(f.grad),
                          display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, fontWeight: 800,
                          border: f.online ? "2px solid #22C55E" : `2px solid ${panelBorder}`,
                        }}>{initials(f.name)}</div>
                        {f.online && <span style={{
                          position: "absolute", bottom: 1, insetInlineEnd: 1, width: 11, height: 11, borderRadius: "50%",
                          background: "#22C55E", border: "2px solid " + bg,
                        }} />}
                      </div>
                      <span style={{ fontSize: 11, color: textMuted, whiteSpace: "nowrap" }}>{f.name}</span>
                    </div>
                  ))}
                </div>
              </HomeSection>

              {/* Active challenge */}
              <HomeSection title="التحدي النشط">
                <div className="hoverlift" style={{
                  borderRadius: 20, padding: 22, position: "relative", overflow: "hidden",
                  background: "linear-gradient(120deg, #16224a 0%, #241455 100%)", border: `1px solid ${panelBorder}`,
                  display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: isMobile ? "wrap" : "nowrap",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, position: "absolute", top: 16, insetInlineStart: 22, fontSize: 11, color: "#FFB4B4", fontWeight: 700 }}>
                    <Flame size={13} /> ينتهي خلال 2 يوم 6 ساعات
                  </div>
                  <div style={{ marginTop: 20 }}>
                    <div style={{ fontSize: 11, color: "#B9C4EE", marginBottom: 6, fontWeight: 700 }}>تحدي الأسبوع</div>
                    <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>ارسمي شخصية أسطورية</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <div style={{ display: "flex" }}>
                        {[0, 1, 2].map((i) => (
                          <div key={i} style={{
                            width: 24, height: 24, borderRadius: "50%", background: grad(FRIENDS_ONLINE[i].grad),
                            border: `2px solid #16224a`, marginInlineStart: i === 0 ? 0 : -8, fontSize: 10,
                            display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800,
                          }}>{initials(FRIENDS_ONLINE[i].name)}</div>
                        ))}
                      </div>
                      <span style={{ fontSize: 12, color: textMuted }}>وأكثر من 340 مشاركة</span>
                    </div>
                  </div>
                  <button style={{
                    padding: "11px 22px", borderRadius: 12, border: "none", background: "#fff", color: "#111832",
                    fontWeight: 800, fontSize: 13, cursor: "pointer", flexShrink: 0,
                  }}>شاركي الآن</button>
                </div>
              </HomeSection>

              {/* Gallery highlights */}
              <HomeSection title="أحدث المعرض" action="استكشاف المزيد">
                <div style={{
                  display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)", gap: 14,
                }}>
                  {GALLERY_HIGHLIGHTS.map((g) => (
                    <div key={g.id} className="hoverlift" style={{
                      borderRadius: 16, overflow: "hidden", border: `1px solid ${panelBorder}`, cursor: "pointer",
                    }}>
                      <div style={{ height: 140, background: grad(g.grad) }} />
                      <div style={{ padding: "10px 12px", background: panel }}>
                        <div style={{ fontSize: 12.5, fontWeight: 700, marginBottom: 6 }}>{g.artist}</div>
                        <div style={{ display: "flex", gap: 10, fontSize: 11, color: textMuted }}>
                          <span style={{ display: "flex", alignItems: "center", gap: 3 }}><Heart size={11} /> {g.likes}</span>
                          <span style={{ display: "flex", alignItems: "center", gap: 3 }}><Eye size={11} /> {g.views}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </HomeSection>
            </div>

            {/* Activity rail */}
            {!isMobile && (
              <div style={{
                width: 268, flexShrink: 0, position: "sticky", top: 0,
                background: panel, border: `1px solid ${panelBorder}`, borderRadius: 18, padding: 18,
              }}>
                <div style={{ fontSize: 13, fontWeight: 800, marginBottom: 14 }}>النشاط الأخير</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {RECENT_ACTIVITY.map((a) => {
                    const Icon = a.icon;
                    return (
                      <div key={a.id} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                        <div style={{
                          width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
                          background: `${a.color}22`, color: a.color,
                          display: "flex", alignItems: "center", justifyContent: "center",
                        }}><Icon size={13} /></div>
                        <div style={{ minWidth: 0 }}>
                          <div style={{ fontSize: 12, lineHeight: 1.5, color: "#DCE3F7" }}>{a.text}</div>
                          <div style={{ fontSize: 10.5, color: textMuted, marginTop: 2 }}>{a.time}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
          </>
          )}
        </div>
      </div>

      {/* -------- Bottom nav (mobile) -------- */}
      {isMobile && (
        <div style={{
          position: "fixed", bottom: 0, insetInlineStart: 0, insetInlineEnd: 0, zIndex: 20,
          display: "flex", justifyContent: "space-around", alignItems: "center",
          background: glass, backdropFilter: "blur(18px)", borderTop: `1px solid ${panelBorder}`,
          padding: "10px 6px 14px",
        }}>
          {NAV.map(({ id, label, icon: Icon }) => {
            const active = activeNav === id;
            return (
              <button key={id} onClick={() => setActiveNav(id)} style={{
                display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
                background: "none", border: "none", color: active ? "#DCE7FF" : textMuted, cursor: "pointer",
                fontSize: 10, fontWeight: 700,
              }}>
                <Icon size={19} color={active ? accent : textMuted} />
                {label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ---------------- sub components ---------------- */
function HeroCard({ icon, title, subtitle, gradient, big, onClick }) {
  return (
    <div className="hoverlift" onClick={onClick} style={{
      borderRadius: 20, padding: 24, background: gradient, position: "relative", overflow: "hidden",
      minHeight: big ? 150 : 130, display: "flex", flexDirection: "column", justifyContent: "space-between",
      cursor: "pointer", boxShadow: "0 20px 50px rgba(59,130,246,0.25)",
    }}>
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(circle at 85% 15%, rgba(255,255,255,0.25), transparent 55%)",
      }} />
      <div style={{
        width: 42, height: 42, borderRadius: 12, background: "rgba(255,255,255,0.2)",
        display: "flex", alignItems: "center", justifyContent: "center", position: "relative",
      }}>{icon}</div>
      <div style={{ position: "relative" }}>
        <div style={{ fontSize: 19, fontWeight: 800, marginBottom: 4 }}>{title}</div>
        <div style={{ fontSize: 12.5, color: "rgba(255,255,255,0.85)" }}>{subtitle}</div>
      </div>
      <ArrowUpRight size={18} style={{ position: "absolute", top: 20, insetInlineStart: 20, opacity: 0.85 }} />
    </div>
  );
}

function HomeSection({ title, action, children }) {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
        <h3 style={{ fontSize: 15.5, fontWeight: 800, margin: 0 }}>{title}</h3>
        {action && (
          <button style={{
            background: "none", border: "none", color: "#8FB3FF", fontSize: 12, fontWeight: 700, cursor: "pointer",
            display: "flex", alignItems: "center", gap: 3,
          }}>{action} <ChevronLeft size={13} /></button>
        )}
      </div>
      {children}
    </div>
  );
}

function SettingsRow({ label, value, onClick, danger }) {
  return (
    <button onClick={onClick} style={{
      width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "9px 10px", borderRadius: 10, border: "none", background: "transparent",
      color: danger ? "#F87171" : "#DCE3F7", cursor: onClick ? "pointer" : "default", fontSize: 12.5,
      fontFamily: "inherit", textAlign: "start",
    }}>
      <span>{label}</span>
      {value && <span style={{ fontSize: 11, color: "#8B96B8" }}>{value}</span>}
    </button>
  );
}

/* =====================================================================
   صفحة "رسماتي"
===================================================================== */
const FOLDERS_MOCK = [
  { id: "f1", name: "شخصيات", count: 5 },
  { id: "f2", name: "مناظر طبيعية", count: 3 },
  { id: "f3", name: "دراسات سريعة", count: 8 },
];

const DRAWINGS_MOCK = [
  { id: 1, title: "أميرة الغيوم", created: "2026/06/02", updated: "قبل ساعتين", layers: 12, size: "24.8 MB", dims: "2500×1800", drawTime: "6س 40د", favorite: true, trashed: false, grad: ["#1e3a8a", "#7c3aed"] },
  { id: 2, title: "مدينة الليل", created: "2026/05/28", updated: "أمس", layers: 7, size: "14.1 MB", dims: "1920×1080", drawTime: "3س 15د", favorite: false, trashed: false, grad: ["#0f172a", "#334155"] },
  { id: 3, title: "طائر الفينيق", created: "2026/05/20", updated: "قبل 3 أيام", layers: 15, size: "31.4 MB", dims: "3000×2000", drawTime: "9س 02د", favorite: true, trashed: false, grad: ["#7c2d12", "#ea580c"] },
  { id: 4, title: "بورتريه شخصي", created: "2026/05/10", updated: "الأسبوع الماضي", layers: 9, size: "18.6 MB", dims: "2000×2000", drawTime: "4س 55د", favorite: false, trashed: false, grad: ["#134e4a", "#0d9488"] },
  { id: 5, title: "غابة الصنوبر", created: "2026/04/30", updated: "قبل أسبوعين", layers: 6, size: "11.2 MB", dims: "1800×1200", drawTime: "2س 10د", favorite: false, trashed: false, grad: ["#166534", "#22c55e"] },
  { id: 6, title: "تجربة ألوان", created: "2026/04/18", updated: "قبل شهر", layers: 3, size: "5.4 MB", dims: "1200×1200", drawTime: "0س 45د", favorite: false, trashed: true, grad: ["#701a75", "#c026d3"] },
];

const SORT_OPTIONS = [
  { id: "updated", label: "آخر تعديل" },
  { id: "created", label: "تاريخ الإنشاء" },
  { id: "name", label: "الاسم" },
  { id: "size", label: "الحجم" },
];

function DrawingsPage({ panel, panelBorder, textPrimary, textMuted, accent, accent2, isMobile, onOpenStudio }) {
  const [view, setView] = useState("grid");
  const [tab, setTab] = useState("all");
  const [sortBy, setSortBy] = useState("updated");
  const [query, setQuery] = useState("");
  const [menuOpenId, setMenuOpenId] = useState(null);
  const [favorites, setFavorites] = useState(() => new Set(DRAWINGS_MOCK.filter((d) => d.favorite).map((d) => d.id)));
  const [trashed, setTrashed] = useState(() => new Set(DRAWINGS_MOCK.filter((d) => d.trashed).map((d) => d.id)));
  const [timelapse, setTimelapse] = useState(null); // drawing object
  const [tlPlaying, setTlPlaying] = useState(true);
  const [tlSpeed, setTlSpeed] = useState(1);

  let items = DRAWINGS_MOCK.filter((d) => {
    if (tab === "favorites") return favorites.has(d.id) && !trashed.has(d.id);
    if (tab === "trash") return trashed.has(d.id);
    return !trashed.has(d.id);
  });
  if (query.trim()) items = items.filter((d) => d.title.includes(query.trim()));
  if (sortBy === "name") items = [...items].sort((a, b) => a.title.localeCompare(b.title, "ar"));
  if (sortBy === "size") items = [...items].sort((a, b) => parseFloat(b.size) - parseFloat(a.size));

  const toggleFav = (id) => setFavorites((s) => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const moveTrash = (id) => { setTrashed((s) => new Set(s).add(id)); setMenuOpenId(null); };
  const restore = (id) => { setTrashed((s) => { const n = new Set(s); n.delete(id); return n; }); setMenuOpenId(null); };

  const actionsFor = (d) => tab === "trash"
    ? [{ label: "استرجاع", onClick: () => restore(d.id) }]
    : [
        { label: "فتح", onClick: () => { onOpenStudio(); setMenuOpenId(null); } },
        { label: "تعديل", onClick: () => { onOpenStudio(); setMenuOpenId(null); } },
        { label: "نسخ", icon: Copy, onClick: () => setMenuOpenId(null) },
        { label: "إعادة تسمية", onClick: () => setMenuOpenId(null) },
        { label: "نقل إلى مجلد", icon: FolderOpen, onClick: () => setMenuOpenId(null) },
        { label: favorites.has(d.id) ? "إزالة من المفضلة" : "إضافة إلى المفضلة", icon: Star, onClick: () => { toggleFav(d.id); setMenuOpenId(null); } },
        { label: "مشاركة", icon: Share2, onClick: () => setMenuOpenId(null) },
        { label: "تنزيل", icon: Download, onClick: () => setMenuOpenId(null) },
        { label: "حذف", icon: Trash2, danger: true, onClick: () => moveTrash(d.id) },
      ];

  return (
    <div>
      {/* Controls */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center", marginTop: 14, marginBottom: 18 }}>
        <div style={{ position: "relative", flex: isMobile ? "1 1 100%" : "0 1 260px" }}>
          <Search size={14} style={{ position: "absolute", insetInlineStart: 12, top: "50%", transform: "translateY(-50%)", color: textMuted }} />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="ابحثي داخل رسماتي…" style={{
            width: "100%", background: "rgba(255,255,255,0.05)", border: `1px solid ${panelBorder}`, borderRadius: 999,
            padding: "8px 36px 8px 12px", color: textPrimary, fontSize: 12.5, outline: "none", fontFamily: "inherit",
          }} />
        </div>

        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={{
          background: panel, border: `1px solid ${panelBorder}`, borderRadius: 10, padding: "8px 10px",
          color: textPrimary, fontSize: 12.5, fontFamily: "inherit",
        }}>
          {SORT_OPTIONS.map((o) => <option key={o.id} value={o.id}>{o.label}</option>)}
        </select>

        <div style={{ display: "flex", border: `1px solid ${panelBorder}`, borderRadius: 10, overflow: "hidden" }}>
          <button onClick={() => setView("grid")} style={{
            padding: "8px 10px", border: "none", cursor: "pointer",
            background: view === "grid" ? accent : "transparent", color: view === "grid" ? "#fff" : textMuted,
          }}><LayoutGrid size={15} /></button>
          <button onClick={() => setView("list")} style={{
            padding: "8px 10px", border: "none", cursor: "pointer",
            background: view === "list" ? accent : "transparent", color: view === "list" ? "#fff" : textMuted,
          }}><List size={15} /></button>
        </div>

        <button onClick={onOpenStudio} style={{
          marginInlineStart: "auto", display: "flex", alignItems: "center", gap: 6, padding: "9px 16px",
          borderRadius: 10, border: "none", background: `linear-gradient(135deg, ${accent}, ${accent2})`,
          color: "#fff", fontWeight: 700, fontSize: 12.5, cursor: "pointer",
        }}><Plus size={15} /> رسمة جديدة</button>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        {[["all", "الكل"], ["favorites", "المفضلة"], ["trash", "سلة المحذوفات"]].map(([id, label]) => (
          <button key={id} onClick={() => setTab(id)} style={{
            padding: "7px 16px", borderRadius: 999, border: `1px solid ${tab === id ? accent : panelBorder}`,
            background: tab === id ? "rgba(59,130,246,0.14)" : "transparent",
            color: tab === id ? "#DCE7FF" : textMuted, fontSize: 12.5, fontWeight: 700, cursor: "pointer",
          }}>{label}</button>
        ))}
      </div>

      {!items.length && (
        <div style={{ padding: "60px 0", textAlign: "center", color: textMuted, fontSize: 13 }}>لا توجد رسومات هنا بعد.</div>
      )}

      {view === "grid" ? (
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(auto-fill, minmax(200px, 1fr))", gap: 14 }}>
          {items.map((d) => (
            <div key={d.id} className="hoverlift" style={{
              borderRadius: 16, overflow: "visible", border: `1px solid ${panelBorder}`, background: panel, position: "relative",
            }}>
              <div style={{ borderRadius: "16px 16px 0 0", overflow: "hidden" }}>
                <div onClick={onOpenStudio} style={{
                  height: 130, background: grad(d.grad), position: "relative", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: "50%", background: "rgba(255,255,255,0.92)",
                    display: "flex", alignItems: "center", justifyContent: "center", opacity: 0.9,
                  }} onClick={(e) => { e.stopPropagation(); setTimelapse(d); }}>
                    <Play size={14} color="#0B1220" fill="#0B1220" />
                  </div>
                  {favorites.has(d.id) && (
                    <Star size={14} fill="#F5A623" color="#F5A623" style={{ position: "absolute", top: 8, insetInlineStart: 8 }} />
                  )}
                </div>
              </div>
              <div style={{ padding: "10px 12px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 6 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 4 }}>{d.title}</div>
                  <button onClick={() => setMenuOpenId(menuOpenId === d.id ? null : d.id)} style={{
                    background: "none", border: "none", color: textMuted, cursor: "pointer", flexShrink: 0, padding: 2,
                  }}><MoreHorizontal size={16} /></button>
                </div>
                <div style={{ fontSize: 10.5, color: textMuted, display: "flex", alignItems: "center", gap: 4 }}>
                  <Clock size={10} /> {d.updated} · {d.layers} طبقة · {d.size}
                </div>
              </div>

              {menuOpenId === d.id && (
                <DrawingMenu actions={actionsFor(d)} panel={panel} panelBorder={panelBorder} textPrimary={textPrimary} onClose={() => setMenuOpenId(null)} />
              )}
            </div>
          ))}
        </div>
      ) : (
        <div style={{ border: `1px solid ${panelBorder}`, borderRadius: 14, overflow: "hidden" }}>
          <div style={{
            display: "grid", gridTemplateColumns: "2fr 1fr 1fr 0.6fr 0.8fr 1fr 0.6fr 40px",
            padding: "10px 14px", fontSize: 11, color: textMuted, borderBottom: `1px solid ${panelBorder}`, background: panel,
          }}>
            <span>الاسم</span><span>الإنشاء</span><span>آخر تعديل</span><span>طبقات</span><span>الحجم</span><span>الأبعاد</span><span>الوقت</span><span></span>
          </div>
          {items.map((d) => (
            <div key={d.id} style={{
              display: "grid", gridTemplateColumns: "2fr 1fr 1fr 0.6fr 0.8fr 1fr 0.6fr 40px",
              padding: "10px 14px", fontSize: 12, alignItems: "center", borderBottom: `1px solid ${panelBorder}`,
              position: "relative",
            }}>
              <span style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }} onClick={onOpenStudio}>
                <span style={{ width: 30, height: 22, borderRadius: 5, background: grad(d.grad), flexShrink: 0 }} />
                {d.title}
              </span>
              <span style={{ color: textMuted }}>{d.created}</span>
              <span style={{ color: textMuted }}>{d.updated}</span>
              <span style={{ color: textMuted }}>{d.layers}</span>
              <span style={{ color: textMuted }}>{d.size}</span>
              <span style={{ color: textMuted }}>{d.dims}</span>
              <span style={{ color: textMuted }}>{d.drawTime}</span>
              <button onClick={() => setMenuOpenId(menuOpenId === d.id ? null : d.id)} style={{
                background: "none", border: "none", color: textMuted, cursor: "pointer",
              }}><MoreHorizontal size={16} /></button>
              {menuOpenId === d.id && (
                <DrawingMenu actions={actionsFor(d)} panel={panel} panelBorder={panelBorder} textPrimary={textPrimary} onClose={() => setMenuOpenId(null)} />
              )}
            </div>
          ))}
        </div>
      )}

      {timelapse && (
        <div style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(0,0,0,.7)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <div style={{ width: "100%", maxWidth: 640, background: panel, borderRadius: 18, border: `1px solid ${panelBorder}`, overflow: "hidden" }}>
            <div style={{ height: 320, background: grad(timelapse.grad), display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
              <span style={{ color: "rgba(255,255,255,0.75)", fontSize: 12 }}>معاينة الفيديو المسرّع — نموذج عرض</span>
              <button onClick={() => setTimelapse(null)} style={{
                position: "absolute", top: 12, insetInlineEnd: 12, width: 30, height: 30, borderRadius: "50%",
                background: "rgba(0,0,0,0.4)", border: "none", color: "#fff", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}><X size={15} /></button>
            </div>
            <div style={{ padding: 14, display: "flex", alignItems: "center", gap: 12 }}>
              <button onClick={() => setTlPlaying((p) => !p)} style={{
                width: 34, height: 34, borderRadius: "50%", border: "none", background: accent, color: "#fff",
                cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}>{tlPlaying ? <span style={{ fontSize: 12 }}>❚❚</span> : <Play size={13} fill="#fff" />}</button>
              <div style={{ flex: 1, height: 4, borderRadius: 4, background: "rgba(255,255,255,0.12)" }}>
                <div style={{ width: "42%", height: "100%", borderRadius: 4, background: accent }} />
              </div>
              <select value={tlSpeed} onChange={(e) => setTlSpeed(Number(e.target.value))} style={{
                background: "transparent", border: `1px solid ${panelBorder}`, borderRadius: 8, color: textPrimary,
                fontSize: 11, padding: "4px 6px",
              }}>
                {[0.5, 1, 2, 4].map((s) => <option key={s} value={s}>{s}x</option>)}
              </select>
              <button style={{ background: "none", border: "none", color: textMuted, cursor: "pointer" }}><Download size={16} /></button>
              <button style={{ background: "none", border: "none", color: textMuted, cursor: "pointer" }}><Share2 size={16} /></button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function DrawingMenu({ actions, panel, panelBorder, textPrimary, onClose }) {
  return (
    <>
      <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 39 }} />
      <div style={{
        position: "absolute", top: 44, insetInlineEnd: 10, zIndex: 40, width: 190,
        background: panel, border: `1px solid ${panelBorder}`, borderRadius: 12,
        boxShadow: "0 20px 50px rgba(0,0,0,.45)", padding: 6,
      }}>
        {actions.map((a, i) => (
          <button key={i} onClick={a.onClick} style={{
            width: "100%", display: "flex", alignItems: "center", gap: 8, padding: "8px 10px",
            border: "none", background: "transparent", cursor: "pointer", borderRadius: 8,
            color: a.danger ? "#F87171" : textPrimary, fontSize: 12, fontFamily: "inherit", textAlign: "start",
          }}>
            {a.icon && <a.icon size={13} />}
            {a.label}
          </button>
        ))}
      </div>
    </>
  );
}

function ComingSoon({ nav, panel, panelBorder, textMuted, accent, onBack }) {
  if (!nav) return null;
  const Icon = nav.icon;
  return (
    <div style={{
      minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      gap: 16, textAlign: "center", padding: "40px 20px",
    }}>
      <div style={{
        width: 64, height: 64, borderRadius: 18, background: "rgba(59,130,246,0.12)", color: accent,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}><Icon size={28} /></div>
      <div>
        <div style={{ fontSize: 17, fontWeight: 800, marginBottom: 6 }}>صفحة "{nav.label}"</div>
        <div style={{ fontSize: 13, color: textMuted, maxWidth: 320 }}>
          هذا القسم مصمَّم في مخطط UX/UI، وسيُبنى بنفس جودة الصفحة الرئيسية في الخطوة القادمة.
        </div>
      </div>
      <button onClick={onBack} style={{
        marginTop: 6, padding: "10px 20px", borderRadius: 12, border: `1px solid ${panelBorder}`,
        background: panel, color: "#DCE3F7", fontSize: 13, fontWeight: 700, cursor: "pointer",
      }}>الرجوع للرئيسية</button>
    </div>
  );
}

function HeaderIcon({ children, border, onClick }) {
  return (
    <button onClick={onClick} style={{
      width: 38, height: 38, borderRadius: "50%", border: `1px solid ${border}`, background: "rgba(255,255,255,0.04)",
      color: "#DCE3F7", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
      position: "relative", flexShrink: 0,
    }}>{children}</button>
  );
}

function IconBubble({ children, color }) {
  return (
    <div style={{
      width: 32, height: 32, borderRadius: 10, background: `${color}22`, color,
      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
    }}>{children}</div>
  );
}

function Dot({ color }) {
  return <span style={{
    position: "absolute", top: 6, insetInlineEnd: 7, width: 7, height: 7, borderRadius: "50%",
    background: color, border: "1.5px solid #0E1730",
  }} />;
}

/* =====================================================================
   App shell — switches between the marketing/home experience and the
   drawing studio, and threads navigation callbacks between them.
===================================================================== */
export default function App() {
  const [page, setPage] = useState("home"); // "home" | "studio"

  if (page === "studio") {
    return <DrawStudio onExit={() => setPage("home")} />;
  }
  return <HomePage onOpenStudio={() => setPage("studio")} />;
}
