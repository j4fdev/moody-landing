// Client and Dual-Mode Proxy for LandingJ4F backend
const API_BASE_URL = process.env.LANDING_API_BASE_URL || "http://localhost:8092";
const API_KEY = process.env.LANDING_API_KEY || "";
const PROJECT_SLUG = process.env.LANDING_PROJECT_SLUG || "moody";

export interface PublicInfo {
  project: {
    id?: string;
    slug: string;
    name: string;
    description: string;
    primary_color: string;
    show_waitlist: boolean;
    show_features: boolean;
  };
  waitlist_count: number;
}

export interface FeatureItem {
  id: string;
  title: string;
  status: "proposed" | "planned" | "in_progress" | "shipped" | "declined";
  votes: number;
  has_voted?: boolean;
  created_at?: string;
}

export interface WaitlistJoinResponse {
  position: number;
  referral_code: string;
  already_joined: boolean;
}

// Fallback in-memory state for development / local offline mode
let fallbackWaitlistCount = 142;
const fallbackWaitlistUsers = new Map<string, { position: number; referral_code: string }>();

const fallbackFeatures: FeatureItem[] = [
  {
    id: "feat-1",
    title: "Paisajes sonoros binaurales y lluvia en bosque nórdico para dormir",
    status: "in_progress",
    votes: 89,
    has_voted: false,
    created_at: "2026-10-20T10:00:00Z",
  },
  {
    id: "feat-2",
    title: "Widgets de respiración rápida 4-7-8 para pantalla de bloqueo (iOS y Android)",
    status: "planned",
    votes: 74,
    has_voted: false,
    created_at: "2026-10-21T12:00:00Z",
  },
  {
    id: "feat-3",
    title: "Exportación cifrada de reflexiones a PDF y Markdown personal",
    status: "planned",
    votes: 56,
    has_voted: false,
    created_at: "2026-10-22T15:30:00Z",
  },
  {
    id: "feat-4",
    title: "Integración con anillos y relojes inteligentes para alertar picos de estrés somático",
    status: "proposed",
    votes: 43,
    has_voted: false,
    created_at: "2026-10-23T09:15:00Z",
  },
  {
    id: "feat-5",
    title: "Caja de Preocupaciones interactiva con ritual de desprendimiento",
    status: "shipped",
    votes: 112,
    has_voted: false,
    created_at: "2026-10-18T08:00:00Z",
  },
];

export async function fetchProjectInfo(): Promise<PublicInfo> {
  try {
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    let url = `${API_BASE_URL}/p/${PROJECT_SLUG}`;

    if (API_KEY) {
      headers["X-API-Key"] = API_KEY;
      url = `${API_BASE_URL}/api/public/v1/`;
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2500);

    const res = await fetch(url, {
      headers,
      signal: controller.signal,
      cache: "no-store",
    });
    clearTimeout(timeout);

    if (res.ok) {
      const data = await res.json();
      return {
        project: data.project || {
          slug: PROJECT_SLUG,
          name: "Moody",
          description: "Santuario Personal de Bienestar Emocional",
          primary_color: "#3F6353",
          show_waitlist: true,
          show_features: true,
        },
        waitlist_count: data.waitlist_count ?? fallbackWaitlistCount,
      };
    }
  } catch {
    // Graceful offline fallback
  }

  return {
    project: {
      slug: PROJECT_SLUG,
      name: "Moody",
      description: "Santuario Personal de Bienestar Emocional",
      primary_color: "#3F6353",
      show_waitlist: true,
      show_features: true,
    },
    waitlist_count: fallbackWaitlistCount,
  };
}

export async function joinWaitlistRemote(params: {
  email: string;
  name: string;
  ref?: string;
  source?: string;
  visitorId?: string;
}): Promise<WaitlistJoinResponse> {
  try {
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    let url = `${API_BASE_URL}/p/${PROJECT_SLUG}/waitlist`;

    if (API_KEY) {
      headers["X-API-Key"] = API_KEY;
      url = `${API_BASE_URL}/api/public/v1/waitlist`;
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3000);

    const res = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify({
        email: params.email,
        name: params.name,
        ref: params.ref || "",
        source: params.source || "landing",
      }),
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (res.ok) {
      return await res.json();
    }
  } catch {
    // Offline simulation
  }

  // Fallback simulation
  const normalizedEmail = params.email.trim().toLowerCase();
  const existing = fallbackWaitlistUsers.get(normalizedEmail);
  if (existing) {
    return {
      position: existing.position,
      referral_code: existing.referral_code,
      already_joined: true,
    };
  }

  fallbackWaitlistCount += 1;
  const referral_code = "MDY" + Math.random().toString(36).substring(2, 6).toUpperCase();
  const entry = {
    position: fallbackWaitlistCount,
    referral_code,
  };
  fallbackWaitlistUsers.set(normalizedEmail, entry);

  return {
    position: entry.position,
    referral_code: entry.referral_code,
    already_joined: false,
  };
}

export async function fetchFeaturesRemote(visitorId?: string): Promise<FeatureItem[]> {
  try {
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    let url = `${API_BASE_URL}/p/${PROJECT_SLUG}/features`;

    if (API_KEY) {
      headers["X-API-Key"] = API_KEY;
      url = `${API_BASE_URL}/api/public/v1/features${visitorId ? `?visitor_id=${encodeURIComponent(visitorId)}` : ""}`;
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2500);

    const res = await fetch(url, {
      headers,
      signal: controller.signal,
      cache: "no-store",
    });
    clearTimeout(timeout);

    if (res.ok) {
      return await res.json();
    }
  } catch {
    // Offline fallback
  }

  return [...fallbackFeatures];
}

export async function voteFeatureRemote(featureId: string, visitorId?: string): Promise<{ votes: number; voted: boolean }> {
  try {
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    let url = `${API_BASE_URL}/p/${PROJECT_SLUG}/features/${featureId}/vote`;

    if (API_KEY) {
      headers["X-API-Key"] = API_KEY;
      url = `${API_BASE_URL}/api/public/v1/features/${featureId}/vote`;
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3000);

    const res = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify({ visitor_id: visitorId || "anon" }),
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (res.ok) {
      return await res.json();
    }
  } catch {
    // Offline fallback
  }

  // Local fallback toggle
  const feat = fallbackFeatures.find((f) => f.id === featureId);
  if (feat) {
    if (feat.has_voted) {
      feat.votes -= 1;
      feat.has_voted = false;
      return { votes: feat.votes, voted: false };
    } else {
      feat.votes += 1;
      feat.has_voted = true;
      return { votes: feat.votes, voted: true };
    }
  }

  return { votes: 0, voted: false };
}

export async function createFeatureRemote(title: string, body?: string, visitorId?: string): Promise<FeatureItem> {
  try {
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    let url = `${API_BASE_URL}/p/${PROJECT_SLUG}/features`;

    if (API_KEY) {
      headers["X-API-Key"] = API_KEY;
      url = `${API_BASE_URL}/api/public/v1/features`;
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3000);

    const res = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify({
        title,
        body: body || "",
        visitor_id: visitorId || "anon",
      }),
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (res.ok) {
      return await res.json();
    }
  } catch {
    // Offline fallback
  }

  const newFeat: FeatureItem = {
    id: "feat-" + Date.now(),
    title,
    status: "proposed",
    votes: 1,
    has_voted: true,
    created_at: new Date().toISOString(),
  };
  fallbackFeatures.unshift(newFeat);
  return newFeat;
}
