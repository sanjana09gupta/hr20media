"use client";

import { useEffect, useState } from "react";
import Gallery from "./Gallery";
import { fetchDriveShots } from "@/lib/drive";
import type { Shot } from "@/lib/gallery";

export default function GalleryWithLiveDrive({
  shots,
  accent,
  driveFolderIds,
}: {
  shots: Shot[];
  accent: string;
  driveFolderIds?: string[];
}) {
  const [liveShots, setLiveShots] = useState<Shot[]>([]);

  useEffect(() => {
    if (!driveFolderIds?.length) return;
    let cancelled = false;
    fetchDriveShots(driveFolderIds).then((s) => {
      if (!cancelled) setLiveShots(s);
    });
    return () => {
      cancelled = true;
    };
  }, [driveFolderIds]);

  return <Gallery shots={[...shots, ...liveShots]} accent={accent} />;
}
