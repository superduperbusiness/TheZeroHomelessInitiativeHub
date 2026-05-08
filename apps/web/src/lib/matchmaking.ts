// ============================================================
// MATCHMAKING ENGINE — Zero Homeless Initiative Hub
// ============================================================

import { ClientProfile, MatchResult, NeedsAssessment, Program, GeoLocation } from '../types';

const EARTH_RADIUS_KM = 6371;

export function haversineDistance(a: GeoLocation, b: GeoLocation): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return EARTH_RADIUS_KM * 2 * Math.asin(Math.sqrt(h));
}

export function scoreMatch(
  client: ClientProfile,
  program: Program,
  providerLocation: GeoLocation
): MatchResult {
  let score = 0;
  const reasons: string[] = [];
  const needs = client.needsAssessment;

  // Distance scoring (max 30 pts)
  const distKm = haversineDistance(client.location, providerLocation);
  const distScore = Math.max(0, 30 - distKm * 2);
  score += distScore;
  if (distKm < 5) reasons.push(`Within ${distKm.toFixed(1)}km of client`);

  // Needs matching (max 40 pts)
  const needMap: { need: keyof NeedsAssessment; tags: string[] }[] = [
    { need: 'housing', tags: ['housing', 'shelter', 'transitional'] },
    { need: 'food', tags: ['food', 'meals', 'nutrition'] },
    { need: 'mentalHealth', tags: ['mental_health', 'counseling', 'therapy'] },
    { need: 'substanceAbuse', tags: ['substance_abuse', 'recovery', 'rehab'] },
    { need: 'medicalCare', tags: ['healthcare', 'medical', 'clinic'] },
    { need: 'employment', tags: ['employment', 'job_training', 'workforce'] },
    { need: 'legalAid', tags: ['legal', 'legal_aid', 'advocacy'] },
    { need: 'education', tags: ['education', 'ged', 'literacy'] },
  ];

  let needScore = 0;
  for (const { need, tags } of needMap) {
    if (needs[need as keyof NeedsAssessment] === true) {
      const overlap = tags.filter((t) => program.tags.includes(t));
      if (overlap.length > 0) {
        needScore += 5;
        reasons.push(`Matches need: ${need}`);
      }
    }
  }
  score += Math.min(40, needScore);

  // Availability scoring (max 20 pts)
  const available = program.capacity > program.currentEnrollment;
  if (available) {
    score += 20;
    reasons.push('Has open capacity');
  } else if (program.waitlistCount < 10) {
    score += 5;
    reasons.push('Short waitlist');
  }

  // Priority scoring (max 10 pts)
  if (needs.priorityLevel === 'critical') score += 10;
  else if (needs.priorityLevel === 'high') score += 7;
  else if (needs.priorityLevel === 'medium') score += 4;

  // Veteran bonus
  if (client.veteranStatus && program.tags.includes('veteran')) {
    score += 5;
    reasons.push('Veteran-specific program');
  }

  // Cost factor
  if (program.cost === 'free') {
    score += 5;
    reasons.push('Free program');
  }

  return {
    clientId: client.id,
    providerId: program.providerId,
    programId: program.id,
    matchScore: Math.min(100, score),
    matchReasons: reasons,
    distance: distKm,
    available,
    recommended: score >= 60,
  };
}

export function rankMatches(matches: MatchResult[]): MatchResult[] {
  return [...matches].sort((a, b) => {
    if (b.recommended !== a.recommended) return b.recommended ? 1 : -1;
    return b.matchScore - a.matchScore;
  });
}
