export function getExtensionFile(file) {
    return file.substring(file.indexOf('/') + 1, file.indexOf(';base64')).toLowerCase();
};