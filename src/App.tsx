import React, { useState, useEffect, useRef } from 'react';
import { Download, AlignLeft, AlignCenter, AlignRight, ChevronLeft, ChevronRight, Type, Space, Palette, Moon, Sun } from 'lucide-react';

// Types
interface LoadedImages {
  [key: string]: HTMLImageElement;
}
type Alignment = 'left' | 'center' | 'right';
type AspectRatio = 'auto' | 'square' | 'wide' | 'portrait' | 'ultrawide';

// Sidebar Component
interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  text: string;
  setText: (text: string) => void;
  alignment: Alignment;
  setAlignment: (align: Alignment) => void;
  letterSize: number;
  setLetterSize: (size: number) => void;
  lineSpacing: number;
  setLineSpacing: (spacing: number) => void;
  bgColor: string;
  setBgColor: (color: string) => void;
  aspectRatio: AspectRatio;
  setAspectRatio: (ratio: AspectRatio) => void;
  onDownload: () => void;
  isDark: boolean;
  toggleTheme: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onToggle,
  text,
  setText,
  alignment,
  setAlignment,
  letterSize,
  setLetterSize,
  lineSpacing,
  setLineSpacing,
  bgColor,
  setBgColor,
  aspectRatio,
  setAspectRatio,
  onDownload,
  isDark,
  toggleTheme,
}) => {
  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className="fixed top-4 left-4 z-50 shadow-lg backdrop-blur-sm p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
      >
        {isOpen ? <ChevronLeft className="h-5 w-5 text-gray-700 dark:text-gray-200" /> : <ChevronRight className="h-5 w-5 text-gray-700 dark:text-gray-200" />}
      </button>
      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className="fixed top-4 right-4 z-50 shadow-lg backdrop-blur-sm p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        aria-label="Toggle theme"
      >
        {isDark ? <Sun className="h-5 w-5 text-gray-700 dark:text-gray-200" /> : <Moon className="h-5 w-5 text-gray-700 dark:text-gray-200" />}
      </button>
      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full w-80 bg-background/95 backdrop-blur-sm border-r  flex flex-col overflow-y-auto transition-transform duration-300 ease-in-out z-40 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 mt-15">
          <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
            KTM
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Create trendy text with KweenSans Text Maker</p>
        </div>
        <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent" />
        <div className="p-6 flex-1 space-y-6">
          <TextInput text={text} setText={setText} />
          <AlignmentControl alignment={alignment} setAlignment={setAlignment} />
          <AspectRatioControl aspectRatio={aspectRatio} setAspectRatio={setAspectRatio} />
          <SliderControl
            label="Letter Size"
            icon={<Type className="h-4 w-4" />}
            value={letterSize}
            onChange={setLetterSize}
            min={30}
            max={1000}
            unit="px"
          />
          <SliderControl
            label="Line Spacing"
            icon={<Space className="h-4 w-4" />}
            value={lineSpacing}
            onChange={setLineSpacing}
            min={0}
            max={100}
            unit="px"
          />
          <ColorPicker bgColor={bgColor} setBgColor={setBgColor} />
          <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent" />
          <button
            onClick={onDownload}
            className="w-full px-4 py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <Download className="h-5 w-5" />
            Download
          </button>
        </div>
      </div>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
          onClick={onToggle}
        />
      )}
    </>
  );
};

// Text Input Component
interface TextInputProps {
  text: string;
  setText: (text: string) => void;
}

const TextInput: React.FC<TextInputProps> = ({ text, setText }) => {
  return (
    <div className="space-y-2">
      <label htmlFor="text-input" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
        Text Content
      </label>
      <textarea
        id="text-input"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type your text here...&#10;Supports multiple lines!"
        className="w-full min-h-[120px] px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent resize-y transition-all"
      />
    </div>
  );
};

// Aspect Ratio Control Component
interface AspectRatioControlProps {
  aspectRatio: AspectRatio;
  setAspectRatio: (ratio: AspectRatio) => void;
}

const AspectRatioControl: React.FC<AspectRatioControlProps> = ({ aspectRatio, setAspectRatio }) => {
  const ratios: { value: AspectRatio; label: string; description: string }[] = [
    { value: 'auto', label: 'Auto', description: 'Fit content' },
    { value: 'square', label: 'Square', description: '1:1' },
    { value: 'wide', label: 'Wide', description: '16:9' },
    { value: 'ultrawide', label: 'Ultra Wide', description: '21:9' },
    { value: 'portrait', label: 'Portrait', description: '9:16' },
  ];
  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
        Canvas Ratio
      </label>
      <div className="grid grid-cols-2 gap-2">
        {ratios.map(({ value, label, description }) => (
          <button
            key={value}
            onClick={() => setAspectRatio(value)}
            className={`px-3 py-2.5 rounded-lg font-medium text-xs transition-all ${
              aspectRatio === value
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/50'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600'
            }`}
          >
            <div className="font-semibold">{label}</div>
            <div className={`text-[10px] ${
              aspectRatio === value ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
            }`}>
              {description}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

// Alignment Control Component
interface AlignmentControlProps {
  alignment: Alignment;
  setAlignment: (align: Alignment) => void;
}

const AlignmentControl: React.FC<AlignmentControlProps> = ({ alignment, setAlignment }) => {
  const alignments: { value: Alignment; icon: React.ReactNode; label: string }[] = [
    { value: 'left', icon: <AlignLeft className="h-4 w-4" />, label: 'Left' },
    { value: 'center', icon: <AlignCenter className="h-4 w-4" />, label: 'Center' },
    { value: 'right', icon: <AlignRight className="h-4 w-4" />, label: 'Right' },
  ];
  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
        Alignment
      </label>
      <div className="flex gap-2">
        {alignments.map(({ value, icon, label }) => (
          <button
            key={value}
            onClick={() => setAlignment(value)}
            className={`flex-1 p-3 flex justify-center items-center rounded-lg font-medium text-sm transition-all  ${
              alignment === value
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/50'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600'
            }`}
            aria-label={label}
          >
            {icon}
          </button>
        ))}
      </div>
    </div>
  );
};

// Slider Control Component
interface SliderControlProps {
  label: string;
  icon: React.ReactNode;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  unit: string;
}

const SliderControl: React.FC<SliderControlProps> = ({
  label,
  icon,
  value,
  onChange,
  min,
  max,
  unit,
}) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
          {icon}
          {label}
        </label>
        <span className="text-sm font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950 px-3 py-1 rounded-full">
          {value}{unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
      />
    </div>
  );
};

// Color Picker Component
interface ColorPickerProps {
  bgColor: string;
  setBgColor: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ bgColor, setBgColor }) => {
  return (
    <div className="space-y-2">
      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
        <Palette className="h-4 w-4" />
        Background Color
      </label>
      <div className="flex items-center gap-3">
        <input
          type="color"
          value={bgColor}
          onChange={(e) => setBgColor(e.target.value)}
          className="h-12 w-16 rounded-lg border-2 border-gray-300 dark:border-gray-600 cursor-pointer"
        />
        <span className="text-sm font-mono font-semibold text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600">
          {bgColor}
        </span>
      </div>
    </div>
  );
};

// Canvas Component
interface CanvasProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  sidebarOpen: boolean;
}

const Canvas: React.FC<CanvasProps> = ({ canvasRef, sidebarOpen }) => {
  return (
    <div
      className={`flex-1 flex items-center justify-center p-10 overflow-auto transition-all duration-300 bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-blue-950/20 dark:to-purple-950/20 ${
        sidebarOpen ? 'lg:ml-80' : 'ml-0'
      }`}
    >
      <div className=" rounded-2xl shadow-2xl border-2 border-gray-200 dark:border-gray-700 overflow-hidden">
        <canvas
          ref={canvasRef}
          className="max-w-full h-auto rounded-xl "
        />
      </div>
    </div>
  );
};

// Main App Component
export default function LetterImageGenerator() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isDark, setIsDark] = useState(false);
  const [text, setText] = useState('');
  const [alignment, setAlignment] = useState<Alignment>('center');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('square');
  const [letterSize, setLetterSize] = useState(60);
  const [lineSpacing, setLineSpacing] = useState(10);
  const [bgColor, setBgColor] = useState('#ffffff');
  const [loadedImages, setLoadedImages] = useState<LoadedImages>({});
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const SCALE_FACTOR = 5;

  // Theme toggle effect
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  // Resize event listener
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
      setScreenHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const preloadImage = (char: string): Promise<HTMLImageElement | null> => {
    return new Promise((resolve) => {
      if (loadedImages[char]) {
        resolve(loadedImages[char]);
        return;
      }
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        setLoadedImages(prev => ({ ...prev, [char]: img }));
        resolve(img);
      };
      img.onerror = () => {
        resolve(null);
      };
      img.src = `img/${char}.png`;
    });
  };

  const renderCanvas = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const upperText = text.toUpperCase();
    let canvasWidth = 800;
    let canvasHeight = 600;

    // Use screen dimensions to scale the canvas
    const maxCanvasWidth = screenWidth * 0.8; // 80% of screen width
    const maxCanvasHeight = screenHeight * 0.8; // 80% of screen height

    // Set fixed dimensions based on aspect ratio
    switch (aspectRatio) {
      case 'auto':
        canvasWidth = Math.min(maxCanvasWidth, 800);
        canvasHeight = Math.min(maxCanvasHeight, 600);
        break;
      case 'square':
        canvasWidth = Math.min(maxCanvasWidth, maxCanvasHeight, 1067);
        canvasHeight = canvasWidth;
        break;
      case 'wide':
        canvasWidth = Math.min(maxCanvasWidth, 1200);
        canvasHeight = (canvasWidth * 9) / 16; // 16:9
        break;
      case 'ultrawide':
        canvasWidth = Math.min(maxCanvasWidth, 1400);
        canvasHeight = (canvasWidth * 9) / 21; // 21:9
        break;
      case 'portrait':
        canvasHeight = Math.min(maxCanvasHeight, 1067);
        canvasWidth = (canvasHeight * 9) / 16; // 9:16
        break;
    }

    if (!upperText.trim()) {
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#94a3b8';
      ctx.font = '18px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('Start typing to see your text as images', canvas.width / 2, canvas.height / 2);
      return;
    }

    const lines = upperText.split('\n');
    // Load all unique characters
    const uniqueChars = [...new Set(upperText.replace(/\s/g, ''))];
    const imagePromises = uniqueChars.map(char => {
      if (/[A-Z0-9]/.test(char)) {
        return preloadImage(char);
      }
      return Promise.resolve(null);
    });
    await Promise.all(imagePromises);

    const padding = 40;
    const spacing = letterSize * -0.1  ;
    const spaceWidth = letterSize * 0.5;
    const lineHeight = letterSize + lineSpacing;

    // Calculate width of each line
    let maxLineWidth = 0;
    const lineWidths = lines.map(line => {
      let width = 0;
      for (let char of line) {
        if (char === ' ') {
          width += spaceWidth;
        } else if (/[A-Z0-9]/.test(char)) {
          width += letterSize + spacing;
        }
      }
      width -= spacing;
      maxLineWidth = Math.max(maxLineWidth, width);
      return width;
    });

    // For auto mode, adjust canvas to fit content
    if (aspectRatio === 'auto') {
      canvasWidth = Math.max(maxLineWidth + padding * 2, 400);
      canvasHeight = (lines.length * lineHeight) + padding * 2 - lineSpacing;
    }

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    // Fill background
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // Calculate vertical and horizontal centering
    const totalContentHeight = (lines.length * lineHeight) - lineSpacing;
    // const totalContentWidth = maxLineWidth;
    const verticalOffset = (canvasHeight - totalContentHeight) / 2;

    // Draw each line
    let y = verticalOffset;
    for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
      const line = lines[lineIndex];
      const lineWidth = lineWidths[lineIndex];
      let startX: number;
      if (alignment === 'center') {
        startX = (canvasWidth - (lineWidth/1.06)) / 2;
      } else if (alignment === 'right') {
        startX = canvasWidth - lineWidth - padding;
      } else {
        startX = padding;
      }
      let x = startX;
      for (let char of line) {
        if (char === ' ') {
          x += spaceWidth;
        } else if (/[A-Z0-9]/.test(char)) {
          const img = loadedImages[char];
          if (img) {
            const imgAspect = img.width / img.height;
            let drawWidth = letterSize;
            let drawHeight = letterSize;
            if (imgAspect > 1) {
              drawHeight = letterSize / imgAspect;
            } else if (imgAspect < 1) {
              drawWidth = letterSize * imgAspect;
            }
            const offsetY = (letterSize - drawHeight) / 2;
            ctx.drawImage(img, x, y + offsetY, drawWidth, drawHeight);
          } else {
            ctx.fillStyle = '#3b82f6';
            ctx.font = `bold ${letterSize * 0.7}px sans-serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(char, x + letterSize / 2, y + letterSize / 2);
          }
          x += letterSize + spacing;
        }
      }
      y += lineHeight;
    }
  };

  const handleDownload = async () => {
    const displayCanvas = canvasRef.current;
    if (!displayCanvas) return;

    // Create a high-resolution canvas
    const highResCanvas = document.createElement('canvas');
    const highResCtx = highResCanvas.getContext('2d');
    if (!highResCtx) return;

    // Use screen dimensions for high-res canvas
    const maxCanvasWidth = screenWidth * 0.8 * SCALE_FACTOR;
    const maxCanvasHeight = screenHeight * 0.8 * SCALE_FACTOR;

    let canvasWidth = 800 * SCALE_FACTOR;
    let canvasHeight = 600 * SCALE_FACTOR;

    switch (aspectRatio) {
      case 'auto':
        canvasWidth = Math.min(maxCanvasWidth, 800 * SCALE_FACTOR);
        canvasHeight = Math.min(maxCanvasHeight, 600 * SCALE_FACTOR);
        break;
      case 'square':
        canvasWidth = Math.min(maxCanvasWidth, maxCanvasHeight, 600 * SCALE_FACTOR);
        canvasHeight = canvasWidth;
        break;
      case 'wide':
        canvasWidth = Math.min(maxCanvasWidth, 1200 * SCALE_FACTOR);
        canvasHeight = (canvasWidth * 9) / 16; // 16:9
        break;
      case 'ultrawide':
        canvasWidth = Math.min(maxCanvasWidth, 1400 * SCALE_FACTOR);
        canvasHeight = (canvasWidth * 9) / 21; // 21:9
        break;
      case 'portrait':
        canvasHeight = Math.min(maxCanvasHeight, 1067 * SCALE_FACTOR);
        canvasWidth = (canvasHeight * 9) / 16; // 9:16
        break;
    }

    highResCanvas.width = canvasWidth;
    highResCanvas.height = canvasHeight;

    // Fill background
    highResCtx.fillStyle = bgColor;
    highResCtx.fillRect(0, 0, highResCanvas.width, highResCanvas.height);

    const upperText = text.toUpperCase();
    const lines = upperText.split('\n');

    if (!upperText.trim()) {
      const link = document.createElement('a');
      link.download = 'kweensans.png';
      link.href = highResCanvas.toDataURL('image/png');
      link.click();
      return;
    }

    // Calculate line widths at high resolution
    const scaledLetterSize = letterSize * SCALE_FACTOR;
    const scaledPadding = 40 * SCALE_FACTOR;
    const scaledSpacing = scaledLetterSize * 0.1;
    const scaledSpaceWidth = scaledLetterSize * 0.5;
    const scaledLineSpacing = lineSpacing * SCALE_FACTOR;
    const scaledLineHeight = scaledLetterSize + scaledLineSpacing;

    const lineWidths = lines.map(line => {
      let width = 0;
      for (let char of line) {
        if (char === ' ') {
          width += scaledSpaceWidth;
        } else if (/[A-Z0-9]/.test(char)) {
          width += scaledLetterSize + scaledSpacing;
        }
      }
      width -= scaledSpacing;
      return width;
    });

    // const maxLineWidth = Math.max(...lineWidths);
    const totalContentHeight = (lines.length * scaledLineHeight) - scaledLineSpacing;
    const verticalOffset = (highResCanvas.height - totalContentHeight) / 2;

    // Draw each line at high resolution
    let y = verticalOffset;
    for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
      const line = lines[lineIndex];
      const lineWidth = lineWidths[lineIndex];
      let startX: number;
      if (alignment === 'center') {
        startX = (highResCanvas.width - lineWidth) / 2;
      } else if (alignment === 'right') {
        startX = highResCanvas.width - lineWidth - scaledPadding;
      } else {
        startX = scaledPadding;
      }
      let x = startX;
      for (let char of line) {
        if (char === ' ') {
          x += scaledSpaceWidth;
        } else if (/[A-Z0-9]/.test(char)) {
          const img = loadedImages[char];
          if (img) {
            const imgAspect = img.width / img.height;
            let drawWidth = scaledLetterSize;
            let drawHeight = scaledLetterSize;
            if (imgAspect > 1) {
              drawHeight = scaledLetterSize / imgAspect;
            } else if (imgAspect < 1) {
              drawWidth = scaledLetterSize * imgAspect;
            }
            const offsetY = (scaledLetterSize - drawHeight) / 2;
            highResCtx.drawImage(img, x, y + offsetY, drawWidth, drawHeight);
          } else {
            highResCtx.fillStyle = '#3b82f6';
            highResCtx.font = `bold ${scaledLetterSize * 0.7}px sans-serif`;
            highResCtx.textAlign = 'center';
            highResCtx.textBaseline = 'middle';
            highResCtx.fillText(char, x + scaledLetterSize / 2, y + scaledLetterSize / 2);
          }
          x += scaledLetterSize + scaledSpacing;
        }
      }
      y += scaledLineHeight;
    }

    // Download
    const link = document.createElement('a');
    link.download = 'kweensans.png';
    link.href = highResCanvas.toDataURL('image/png');
    link.click();
  };

  useEffect(() => {
    renderCanvas();
  }, [text, alignment, letterSize, lineSpacing, bgColor, aspectRatio, loadedImages, screenWidth, screenHeight]);

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        text={text}
        setText={setText}
        alignment={alignment}
        setAlignment={setAlignment}
        letterSize={letterSize}
        setLetterSize={setLetterSize}
        lineSpacing={lineSpacing}
        setLineSpacing={setLineSpacing}
        bgColor={bgColor}
        setBgColor={setBgColor}
        aspectRatio={aspectRatio}
        setAspectRatio={setAspectRatio}
        onDownload={handleDownload}
        isDark={isDark}
        toggleTheme={toggleTheme}
      />
      <Canvas canvasRef={canvasRef} sidebarOpen={sidebarOpen} />
    </div>
  );
}
