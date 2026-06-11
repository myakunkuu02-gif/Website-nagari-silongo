'use client';

import { useState, useRef, useCallback, type DragEvent, type ChangeEvent } from 'react';
import { Upload, X, Loader2, ImageIcon, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  folder: string;
  label?: string;
  className?: string;
  maxHeight?: string;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

export default function ImageUploader({
  value,
  onChange,
  folder,
  label = 'Upload Gambar',
  className = '',
  maxHeight = '192px',
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [dragOver, setDragOver] = useState(false);
  const [localPreview, setLocalPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const displayUrl = localPreview || value;

  const validateFile = useCallback((file: File): string | null => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      return 'Format tidak didukung. Gunakan: JPG, JPEG, PNG, atau WebP.';
    }
    if (file.size > MAX_FILE_SIZE) {
      const sizeMB = (file.size / 1024 / 1024).toFixed(2);
      return `Ukuran file terlalu besar (${sizeMB}MB). Maksimal 5MB.`;
    }
    return null;
  }, []);

  const uploadFile = useCallback(
    async (file: File) => {
      const error = validateFile(file);
      if (error) {
        toast.error(error);
        return;
      }

      // Show local preview immediately
      const reader = new FileReader();
      reader.onload = (e) => {
        setLocalPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      setUploading(true);
      setProgress(0);

      try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('folder', folder);

        // Simulate progress for UX (since fetch doesn't give progress)
        const progressInterval = setInterval(() => {
          setProgress((prev) => {
            if (prev >= 90) {
              clearInterval(progressInterval);
              return 90;
            }
            return prev + Math.random() * 15;
          });
        }, 200);

        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        clearInterval(progressInterval);

        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || 'Upload gagal');
        }

        const data = await res.json();
        setProgress(100);
        onChange(data.url);
        setLocalPreview(null);
        toast.success('Gambar berhasil diupload');
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Gagal mengupload gambar';
        toast.error(message);
        setLocalPreview(null);
      } finally {
        setUploading(false);
        setProgress(0);
      }
    },
    [folder, onChange, validateFile]
  );

  const handleDragOver = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);
  }, []);

  const handleDrop = useCallback(
    (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragOver(false);

      const files = e.dataTransfer.files;
      if (files.length > 0) {
        uploadFile(files[0]);
      }
    },
    [uploadFile]
  );

  const handleFileChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        uploadFile(files[0]);
      }
      // Reset input so same file can be re-selected
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    },
    [uploadFile]
  );

  const handleRemove = useCallback(() => {
    onChange('');
    setLocalPreview(null);
  }, [onChange]);

  const handlePaste = useCallback(
    (e: React.ClipboardEvent) => {
      const items = e.clipboardData.items;
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.startsWith('image/')) {
          const file = items[i].getAsFile();
          if (file) {
            uploadFile(file);
            break;
          }
        }
      }
    },
    [uploadFile]
  );

  return (
    <div className={cn('space-y-2', className)}>
      {label && (
        <p className="text-sm font-medium text-foreground">{label}</p>
      )}

      {/* Preview */}
      {displayUrl ? (
        <div className="relative group rounded-lg overflow-hidden border border-border/30" style={{ maxHeight }}>
          <img
            src={displayUrl}
            alt="Preview"
            className="w-full h-full object-cover"
            style={{ maxHeight }}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2">
            <Button
              size="sm"
              variant="secondary"
              className="h-8 text-xs bg-white/90 hover:bg-white text-foreground"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
            >
              <Upload className="w-3.5 h-3.5 mr-1" />
              Ganti
            </Button>
            <Button
              size="sm"
              variant="secondary"
              className="h-8 text-xs bg-red-500/90 hover:bg-red-500 text-white"
              onClick={handleRemove}
            >
              <X className="w-3.5 h-3.5 mr-1" />
              Hapus
            </Button>
          </div>
          {/* Uploading overlay on preview */}
          {uploading && (
            <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-2">
              <Loader2 className="w-8 h-8 animate-spin text-white" />
              <p className="text-xs text-white">Mengupload... {Math.round(progress)}%</p>
              <div className="w-32 h-1.5 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gold rounded-full transition-all duration-300"
                  style={{ width: `${Math.max(progress, 5)}%` }}
                />
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Drop zone */
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onPaste={handlePaste}
          className={cn(
            'relative flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed cursor-pointer transition-all duration-200',
            dragOver
              ? 'border-gold bg-gold/5 scale-[1.01]'
              : 'border-border/50 hover:border-gold/50 hover:bg-muted/30',
            uploading && 'pointer-events-none opacity-60'
          )}
          style={{ minHeight: '120px' }}
          onClick={() => !uploading && fileInputRef.current?.click()}
        >
          {uploading ? (
            <div className="flex flex-col items-center gap-2 py-4">
              <Loader2 className="w-8 h-8 animate-spin text-gold" />
              <p className="text-xs text-muted-foreground">Mengupload... {Math.round(progress)}%</p>
              <div className="w-32 h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-gold rounded-full transition-all duration-300"
                  style={{ width: `${Math.max(progress, 5)}%` }}
                />
              </div>
            </div>
          ) : (
            <>
              <div
                className={cn(
                  'w-12 h-12 rounded-xl flex items-center justify-center transition-colors',
                  dragOver ? 'bg-gold/10' : 'bg-muted/50'
                )}
              >
                {dragOver ? (
                  <Upload className="w-6 h-6 text-gold" />
                ) : (
                  <ImageIcon className="w-6 h-6 text-muted-foreground" />
                )}
              </div>
              <div className="text-center px-4">
                <p className="text-sm font-medium text-foreground">
                  {dragOver ? 'Lepaskan file di sini' : 'Klik atau seret gambar ke sini'}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  JPG, JPEG, PNG, WebP — Maks. 5MB
                </p>
              </div>
            </>
          )}
        </div>
      )}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        className="hidden"
        onChange={handleFileChange}
        disabled={uploading}
      />

      {/* Manual URL input */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground shrink-0">
          <AlertCircle className="w-3 h-3" />
          <span>atau URL:</span>
        </div>
        <input
          type="text"
          value={localPreview ? '' : value}
          placeholder="https://example.com/image.jpg"
          onChange={(e) => {
            setLocalPreview(null);
            onChange(e.target.value);
          }}
          className="flex-1 h-8 text-xs px-2 rounded-md border border-border/50 bg-transparent text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-gold/50"
          disabled={uploading}
        />
      </div>
    </div>
  );
}
