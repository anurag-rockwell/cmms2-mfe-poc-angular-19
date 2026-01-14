import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';

export interface RouteConfig {
  path: string;
  label: string;
  icon?: string;
  description?: string;
}

export interface MfeManifest {
  name: string;
  displayName: string;
  icon: string;
  version: string;
  owner?: string;
  routes: RouteConfig[];
}

export interface MfeRegistryEntry {
  name: string;
  url: string;
  manifestPath: string;
}

export interface CentralManifest {
  version: string;
  lastUpdated: string;
  mfes: MfeRegistryEntry[];
}

/**
 * MFE MANIFEST SERVICE - TRULY DECOUPLED ARCHITECTURE
 * 
 * Shell only knows:
 * 1. List of MFEs and their URLs (from central manifest)
 * 2. Fetches each MFE's manifest dynamically
 * 
 * Shell does NOT know:
 * - Component names
 * - Component paths
 * - Route details
 * - How to load components
 */
@Injectable({
  providedIn: 'root'
})
export class MfeManifestService {
  private centralManifestUrl = '/mfe-mainfest-registry.json';
  
  
  constructor(private http: HttpClient) {}
  
  /**
   * Load all MFE manifests from their respective URLs
   * Always fetches fresh - no caching
   */
  getMfes(): Observable<MfeManifest[]> {
    console.log('[MfeManifestService] Loading manifest from:', this.centralManifestUrl);
    
    return this.http.get<CentralManifest>(this.centralManifestUrl).pipe(
      switchMap(central => {
        console.log('[MfeManifestService] Found', central.mfes.length, 'registered MFEs');
        
        // Fetch each MFE's manifest from its URL
        const manifestRequests = central.mfes.map(entry => 
          this.http.get<MfeManifest>(`${entry.url}${entry.manifestPath}`).pipe(
            map(manifest => ({
              ...manifest,
              name: entry.name // Ensure name matches registry
            })),
            catchError(error => {
              console.error(`[MfeManifestService] Failed to load manifest for ${entry.name}:`, error);
              return of(null);
            })
          )
        );
        
        return forkJoin(manifestRequests);
      }),
      map(manifests => {
        const validManifests = manifests.filter(m => m !== null) as MfeManifest[];
        console.log('[MfeManifestService] Loaded', validManifests.length, 'MFEs:', validManifests.map(m => m.name));
        return validManifests;
      }),
      catchError(error => {
        console.error('[MfeManifestService] Failed to load central manifest:', error);
        return of([]);
      })
    );
  }

}
