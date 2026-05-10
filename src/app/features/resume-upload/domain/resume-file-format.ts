const DOCX_MIME = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
const LEGACY_DOC_MIME = 'application/msword';

export function isPdfFile(file: File): boolean {
  const name = file.name.toLowerCase();
  return name.endsWith('.pdf') || file.type === 'application/pdf';
}

export function isLegacyWordDoc(file: File): boolean {
  const name = file.name.toLowerCase();
  if (name.endsWith('.docx')) {
    return false;
  }
  return name.endsWith('.doc') || file.type === LEGACY_DOC_MIME;
}

export function isDocxFile(file: File): boolean {
  const name = file.name.toLowerCase();
  return name.endsWith('.docx') || file.type === DOCX_MIME;
}

export function isPlainTextResumeFile(file: File): boolean {
  const name = file.name.toLowerCase();
  const t = file.type;
  return (
    name.endsWith('.txt') || name.endsWith('.md') || t === 'text/plain' || t === 'text/markdown'
  );
}

export function isSupportedResumeFile(file: File): boolean {
  return isPdfFile(file) || isDocxFile(file) || isPlainTextResumeFile(file);
}
