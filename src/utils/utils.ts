import fs from 'fs/promises'
import sharp from 'sharp'

export async function fileExists(filePath: string): Promise<boolean> {
    try {
        await fs.access(filePath);
        return true;
    } catch (error) {
        return false;
    }
}

export async function resizeImage(
    originalImagePath: string,
    width: number,
    height: number,
    outputPath: string
): Promise<void> {
    try {
        const imageBuffer = await fs.readFile(originalImagePath);
        const resizedImageBuffer = await sharp(imageBuffer)
            .resize({ width, height })
            .toBuffer();
        await fs.writeFile(outputPath, resizedImageBuffer);
    } catch (error) {
        throw new Error('Error resizing image');
    }
}