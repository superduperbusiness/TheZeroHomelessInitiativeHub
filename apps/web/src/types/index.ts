// ============================================================
// THE ZERO HOMELESS INITIATIVE HUB — TYPE DEFINITIONS
// ============================================================

export type UserRole =
  | 'client'
  | 'case_manager'
  | 'church'
  | 'street_team'
  | 'crisis_team'
  | 'housing_agency'
  | 'homeless_service_provider'
  | 'nonprofit'
  | 'corporation'
  | 'foundation'
  | 'religious_org'
  | 'mental_health_counselor'
  | 'mental_health_program'
  | 'psychiatric_provider'
  | 'substance_abuse_inpatient'
  | 'substance_abuse_outpatient'
  | 'substance_abuse_livein'
  | 'supportive_housing'
  | 'shelter_provider'
  | 'local_business'
  | 'state_agency'
  | 'federal_agency'
  | 'service_provider'
  | 'grant_giver'
  | 'emergency_help'
  | 'assisted_living'
  | 'educational_program'
  | 'funding_resource'
  | 'healthcare'
  | 'hospital'
  | 'therapist'
  | 'food_bank'
  | 'donation_resource'
  | 'housing_authority'
  | 'apartment_manager'
  | 'homeowner'
  | 'ownership_program'
  | 'hud_resource'
  | 'other';

export interface GeoLocation {
  lat: number;
  lng: number;
  address: string;
  city: string;
  state: string;
  zip: string;
  county?: string;
}

export interface BaseProfile {
  id: string;
  role: UserRole;
  email: string;
  phone?: string;
  fullName: string;
  orgName?: string;
  avatar?: string;
  bio?: string;
  location: GeoLocation;
  verified: boolean;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  languages?: string[];
  website?: string;
  socialLinks?: { platform: string; url: string }[];
}

export interface ClientProfile extends BaseProfile {
  role: 'client';
  dob?: string;
  gender?: string;
  ethnicity?: string;
  veteranStatus?: boolean;
  disabilityStatus?: boolean;
  currentHousingStatus:
    | 'unsheltered'
    | 'sheltered'
    | 'transitional'
    | 'doubled_up'
    | 'at_risk'
    | 'housed';
  incomeLevel?: string;
  employmentStatus?: string;
  needsAssessment: NeedsAssessment;
  assignedCaseManagerId?: string;
  caseHistory: CaseNote[];
  applications: Application[];
  documents: Document[];
  emergencyContacts: EmergencyContact[];
  hmisId?: string;
}

export interface NeedsAssessment {
  housing: boolean;
  food: boolean;
  mentalHealth: boolean;
  substanceAbuse: boolean;
  medicalCare: boolean;
  employment: boolean;
  legalAid: boolean;
  childcare: boolean;
  transportation: boolean;
  education: boolean;
  clothing: boolean;
  other: string;
  viScore?: number; // VI-SPDAT vulnerability score
  priorityLevel: 'critical' | 'high' | 'medium' | 'low';
  notes: string;
}

export interface CaseManagerProfile extends BaseProfile {
  role: 'case_manager';
  licenseNumber?: string;
  certifications: string[];
  specializations: string[];
  caseload: number;
  maxCaseload: number;
  availability: Availability;
  activeClients: string[];
  organization?: string;
}

export interface ShelterProfile extends BaseProfile {
  role: 'shelter_provider';
  totalBeds: number;
  availableBeds: number;
  reservableBeds: number;
  reservations: BedReservation[];
  amenities: string[];
  restrictions: string[];
  intakeHours: string;
  emergencyBeds: number;
  familyBeds: number;
  veteranBeds: number;
  lgbtqFriendly: boolean;
  petFriendly: boolean;
  sobrietyRequired: boolean;
  lastUpdated: string;
}

export interface BedReservation {
  id: string;
  clientId: string;
  shelterProviderId: string;
  date: string;
  bedType: 'standard' | 'emergency' | 'family' | 'veteran';
  status: 'pending' | 'confirmed' | 'checked_in' | 'no_show' | 'cancelled';
  createdAt: string;
  notes?: string;
}

export interface Availability {
  monday: string[];
  tuesday: string[];
  wednesday: string[];
  thursday: string[];
  friday: string[];
  saturday: string[];
  sunday: string[];
}

export interface CaseNote {
  id: string;
  caseManagerId: string;
  clientId: string;
  date: string;
  type: 'intake' | 'follow_up' | 'crisis' | 'referral' | 'closing' | 'general';
  content: string;
  attachments?: string[];
  nextSteps?: string;
  sharedWith?: string[];
}

export interface Application {
  id: string;
  clientId: string;
  providerId: string;
  programId: string;
  status: 'draft' | 'submitted' | 'under_review' | 'approved' | 'denied' | 'waitlisted';
  submittedAt?: string;
  reviewedAt?: string;
  notes?: string;
  documents: string[];
}

export interface Document {
  id: string;
  name: string;
  type: string;
  url: string;
  uploadedAt: string;
  expiresAt?: string;
}

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
  email?: string;
}

export interface Program {
  id: string;
  providerId: string;
  name: string;
  description: string;
  type: string;
  eligibilityCriteria: string[];
  capacity: number;
  currentEnrollment: number;
  waitlistCount: number;
  applicationRequired: boolean;
  cost: 'free' | 'sliding_scale' | 'paid';
  duration?: string;
  location: GeoLocation;
  active: boolean;
  fundingSources: string[];
  tags: string[];
}

export interface MatchResult {
  clientId: string;
  providerId: string;
  programId?: string;
  matchScore: number;
  matchReasons: string[];
  distance: number;
  available: boolean;
  recommended: boolean;
}

export interface Message {
  id: string;
  fromUserId: string;
  toUserId: string;
  content: string;
  sentAt: string;
  readAt?: string;
  smsDelivered?: boolean;
  attachments?: string[];
  threadId: string;
}

export interface LiveDataFeed {
  source: string;
  url: string;
  lastFetched: string;
  type: 'shelter_beds' | 'services' | 'grants' | 'housing' | 'healthcare';
  data: Record<string, unknown>;
}
