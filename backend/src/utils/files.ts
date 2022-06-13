import * as fs from 'fs-extra';

export function getExtensionFile(file) {
    return file.substring(file.indexOf('/') + 1, file.indexOf(';base64')).toLowerCase();
};

export function deleteIfExists(path: string): void {
    if (fs.existsSync(path))
        fs.unlinkSync(path);
}