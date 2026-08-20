/**
 * AURA Wardrobe — Retailer Connector Abstraction
 *
 * Architecture: Never allow the core application to depend
 * on a specific retailer. All retailer access goes through
 * this abstraction (per ARCHITECTURE.md §12).
 *
 * Phase 15+: Implement concrete retailer connectors.
 * Legitimate methods only: APIs, affiliate feeds, merchant feeds.
 * Never scrape without authorization.
 */

export interface RetailerProduct {
  id: string;
  retailerName: string;
  retailerProductId: string;
  name: string;
  brand?: string;
  price: number;
  currency: string; // 'INR'
  imageUrls: string[];
  productUrl: string; // Deep link or affiliate link
  isAffiliate: boolean;
  category?: string;
  availability?: 'in-stock' | 'out-of-stock' | 'limited';
  sizes?: string[];
  colors?: string[];
  fetchedAt: string;
}

export interface ProductSearchQuery {
  query: string;
  category?: string;
  maxPrice?: number;
  currency?: string;
  sizes?: string[];
  colors?: string[];
}

/**
 * RetailerConnector interface.
 * All retailer integrations must implement this.
 */
export interface RetailerConnector {
  name: string;
  displayName: string;
  isAvailable: boolean; // false until officially integrated

  searchProducts(query: ProductSearchQuery): Promise<RetailerProduct[]>;
  getProduct(productId: string): Promise<RetailerProduct | null>;
  getAffiliateLink?(productUrl: string): Promise<string>;
}

/**
 * Stub connector for undocumented/unavailable retailers.
 * Used as a placeholder until legitimate API access is established.
 */
export class UnavailableRetailerConnector implements RetailerConnector {
  readonly isAvailable = false;

  constructor(
    readonly name: string,
    readonly displayName: string,
    private readonly reason: string
  ) {}

  async searchProducts(_query: ProductSearchQuery): Promise<RetailerProduct[]> {
    console.warn(
      `RetailerConnector[${this.name}]: Not yet available. ${this.reason}`
    );
    return [];
  }

  async getProduct(_id: string): Promise<null> {
    return null;
  }
}

// ────────────────────────────────────────────────────────────────────────────
// RETAILER REGISTRY
// Documents integration status for all potential Indian retailers
// ────────────────────────────────────────────────────────────────────────────

/**
 * Status of each retailer integration.
 * Updated as legitimate API access is established (Phase 15+).
 */
export const RetailerIntegrationStatus = {
  myntra: { status: 'not-yet-integrated', note: 'No public API. Research affiliate/partner program.' },
  ajio: { status: 'not-yet-integrated', note: 'No public API. Research affiliate/partner program.' },
  hmIndia: { status: 'not-yet-integrated', note: 'Check H&M affiliate program availability in India.' },
  zaraIndia: { status: 'not-yet-integrated', note: 'No public API. Zara does not have a public affiliate program.' },
  uniqloIndia: { status: 'not-yet-integrated', note: 'Research UNIQLO India affiliate options.' },
  tataCLiQ: { status: 'not-yet-integrated', note: 'Check Tata CLiQ affiliate/partner API.' },
  amazonIndia: { status: 'not-yet-integrated', note: 'Amazon Product Advertising API — requires account.' },
  flipkart: { status: 'not-yet-integrated', note: 'Flipkart Affiliate API — requires account.' },
} as const;
