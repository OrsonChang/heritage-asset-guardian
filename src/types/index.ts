
export interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'user';
  createdAt: string;
  status: 'active' | 'pending' | 'inactive';
}

export interface CustodialOrganization {
  id: string;
  code: string;
  name: string;
  type: string;
  address: string;
  contact: string;
  phone: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface HeritageAsset {
  id: string;
  name: string;
  assetCode: string;
  category: string;
  temporaryClassification: string;
  era: string;
  description: string;
  custodialOrganizationId: string;
  custodialOrganization?: CustodialOrganization;
  imageUrl?: string;
  registryId?: string;
  projectId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Registry {
  id: string;
  name: string;
  registryNumber: string;
  status: 'draft' | 'submitted' | 'approved' | 'rejected';
  submissionDate: string;
  approvalDate?: string;
  assets: HeritageAsset[];
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  status: 'active' | 'completed' | 'cancelled';
  assets: HeritageAsset[];
  createdAt: string;
  updatedAt: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface StatsData {
  label: string;
  value: number;
}

export interface StatsByOrganization extends StatsData {
  organizationName: string;
}

export interface StatsByCategory extends StatsData {
  category: string;
}

export interface StatsByClassification extends StatsData {
  classification: string;
}

export interface StatsByEra extends StatsData {
  era: string;
}

export interface StatsByCustodial extends StatsData {
  custodialOrganization: string;
}

export interface StatsByRegistry extends StatsData {
  registry: string;
}

export interface StatsByProject extends StatsData {
  project: string;
}
