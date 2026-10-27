"use client";

function getOrCreateVisitorId(): string {
  if (typeof window === "undefined") return "";
  let vid = localStorage.getItem("moody_vid");
  if (!vid) {
    vid = "v_" + Math.random().toString(36).substring(2, 10) + Date.now().toString(36);
    localStorage.setItem("moody_vid", vid);
  }
  return vid;
}

function getOrCreateSessionId(): string {
  if (typeof window === "undefined") return "";
  let sid = sessionStorage.getItem("moody_sid");
  if (!sid) {
    sid = "s_" + Math.random().toString(36).substring(2, 10);
    sessionStorage.setItem("moody_sid", sid);
  }
  return sid;
}

function getUtmParams(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const utm: Record<string, string> = {};
  for (const [key, val] of params.entries()) {
    if (key.startsWith("utm_") || key === "ref") {
      utm[key] = val;
    }
  }
  return utm;
}

export function trackTelemetry(type: "page_view" | "cta_click", path?: string) {
  if (typeof window === "undefined") return;

  const payload = {
    type,
    path: path || window.location.pathname + window.location.hash,
    referrer: document.referrer || "",
    session_id: getOrCreateSessionId(),
    visitor_id: getOrCreateVisitorId(),
    utm: getUtmParams(),
  };

  // Use sendBeacon for fire-and-forget or fetch fallback
  const jsonStr = JSON.stringify(payload);
  if (navigator.sendBeacon) {
    const blob = new Blob([jsonStr], { type: "application/json" });
    navigator.sendBeacon("/api/events", blob);
  } else {
    fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: jsonStr,
      keepalive: true,
    }).catch(() => {});
  }
}
