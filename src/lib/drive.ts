import type { Shot } from "./gallery";

/**
 * Live-fetches images from public Google Drive folders (client-side) so new
 * photos the client uploads show up without a rebuild. Requires
 * NEXT_PUBLIC_GOOGLE_DRIVE_API_KEY (a Drive-API-only, referrer-restricted
 * key — see README/setup notes) and the folders shared as "anyone with the
 * link can view". Fails silently (returns []) if the key is missing or a
 * request errors, so the static gallery still works without it.
 */
export async function fetchDriveShots(folderIds: string[]): Promise<Shot[]> {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_DRIVE_API_KEY;
  if (!apiKey || folderIds.length === 0) return [];

  const results = await Promise.all(
    folderIds.map((id) => fetchFolder(id, apiKey).catch(() => []))
  );
  return results.flat();
}

async function fetchFolder(folderId: string, apiKey: string): Promise<Shot[]> {
  const q = `'${folderId}' in parents and mimeType contains 'image/' and trashed = false`;
  const fields = "files(id,name,imageMediaMetadata(width,height))";
  const url =
    `https://www.googleapis.com/drive/v3/files` +
    `?q=${encodeURIComponent(q)}` +
    `&fields=${encodeURIComponent(fields)}` +
    `&pageSize=1000&key=${apiKey}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Drive API error ${res.status}`);
  const data: {
    files?: { id: string; name?: string; imageMediaMetadata?: { width?: number; height?: number } }[];
  } = await res.json();

  return (data.files ?? []).map((f) => ({
    src: `https://lh3.googleusercontent.com/d/${f.id}=w1280`,
    w: f.imageMediaMetadata?.width ?? 1024,
    h: f.imageMediaMetadata?.height ?? 1280,
    alt: f.name ?? "People photography",
  }));
}
