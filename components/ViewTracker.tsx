"use client";

import { useEffect } from "react";

interface ViewTrackerProps {
  slug: string;
}

export default function ViewTracker({ slug }: ViewTrackerProps) {
  useEffect(() => {
    // 조회수 증가
    const viewKey = `post-views-${slug}`;
    const sessionKey = `post-session-${slug}`;

    const hasViewedInSession = sessionStorage.getItem(sessionKey);

    if (!hasViewedInSession) {
      const currentViews = localStorage.getItem(viewKey);
      const newViews = (parseInt(currentViews || "0") + 1).toString();
      localStorage.setItem(viewKey, newViews);
      sessionStorage.setItem(sessionKey, "true");
    }
  }, [slug]);

  return null;
}
