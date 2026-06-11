import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';

const UPLOAD_DIR = join(process.cwd(), 'public', 'uploads');
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'];

function checkImageMagic(buffer: Buffer): boolean {
  if (buffer.length < 12) return false;
  // JPEG: FF D8 FF
  if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) return true;
  // PNG: 89 50 4E 47
  if (buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4e && buffer[3] === 0x47) return true;
  // WebP: RIFF....WEBP
  if (
    buffer[0] === 0x52 && buffer[1] === 0x49 && buffer[2] === 0x46 && buffer[3] === 0x46 &&
    buffer[8] === 0x57 && buffer[9] === 0x45 && buffer[10] === 0x42 && buffer[11] === 0x50
  ) return true;
  return false;
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const folder = (formData.get('folder') as string) || 'general';

    if (!file) {
      return NextResponse.json(
        { error: 'File tidak ditemukan' },
        { status: 400 }
      );
    }

    // Validate MIME type
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: `Format file tidak didukung. Gunakan: jpg, jpeg, png, webp` },
        { status: 400 }
      );
    }

    // Validate magic bytes to prevent fake extensions
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const isValidImage = checkImageMagic(buffer);
    if (!isValidImage) {
      return NextResponse.json(
        { error: 'File bukan gambar yang valid. Format yang didukung: JPG, JPEG, PNG, WebP' },
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: `Ukuran file terlalu besar. Maksimal 5MB. File Anda: ${(file.size / 1024 / 1024).toFixed(2)}MB` },
        { status: 400 }
      );
    }

    // Sanitize folder name
    const sanitizedFolder = folder.replace(/[^a-zA-Z0-9-_]/g, '').substring(0, 50);
    const targetDir = join(UPLOAD_DIR, sanitizedFolder);

    // Ensure directory exists
    if (!existsSync(targetDir)) {
      await mkdir(targetDir, { recursive: true });
    }

    // Get file extension
    const ext = file.name.split('.').pop()?.toLowerCase() || '';
    const validExt = ALLOWED_EXTENSIONS.includes(`.${ext}`) ? ext : file.type.split('/')[1];

    // Generate unique filename
    const uniqueId = uuidv4();
    const timestamp = Date.now();
    const safeName = `${timestamp}-${uniqueId}.${validExt}`;

    const filePath = join(targetDir, safeName);

    // Write file
    await writeFile(filePath, buffer);

    // Return URL via API serve endpoint (works in standalone mode)
    const publicUrl = `/api/serve?file=${sanitizedFolder}/${safeName}`;

    return NextResponse.json({
      url: publicUrl,
      filename: safeName,
      size: file.size,
      type: file.type,
      folder: sanitizedFolder,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Gagal mengupload file' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const filePath = searchParams.get('path');

    if (!filePath) {
      return NextResponse.json(
        { error: 'Path file tidak ditemukan' },
        { status: 400 }
      );
    }

    // Only allow deleting from uploads directory
    const fullPath = join(process.cwd(), 'public', filePath);
    if (!fullPath.startsWith(join(process.cwd(), 'public', 'uploads'))) {
      return NextResponse.json(
        { error: 'Tidak diizinkan menghapus file di luar folder uploads' },
        { status: 403 }
      );
    }

    const { unlink } = await import('fs/promises');
    try {
      await unlink(fullPath);
    } catch {
      // File might not exist, that's ok
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json(
      { error: 'Gagal menghapus file' },
      { status: 500 }
    );
  }
}
