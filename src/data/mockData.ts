
import { User, CustodialOrganization, HeritageAsset, Registry, Project, StatsData } from "@/types";

// Mock Users
export const mockUsers: User[] = [
  {
    id: "1",
    username: "admin",
    email: "admin@example.com",
    role: "admin",
    createdAt: "2023-01-01T00:00:00Z",
    status: "active"
  },
  {
    id: "2",
    username: "user1",
    email: "user1@example.com",
    role: "user",
    createdAt: "2023-01-10T00:00:00Z",
    status: "active"
  },
  {
    id: "3",
    username: "user2",
    email: "user2@example.com",
    role: "user",
    createdAt: "2023-02-15T00:00:00Z",
    status: "pending"
  }
];

// Mock Custodial Organizations
export const mockCustodialOrgs: CustodialOrganization[] = [
  {
    id: "1",
    code: "NCM001",
    name: "國立故宮博物院",
    type: "National Museum",
    address: "台北市士林區至善路二段221號",
    contact: "游俊廷",
    phone: "02-2881-2021",
    email: "contact@npm.gov.tw",
    createdAt: "2022-01-01T00:00:00Z",
    updatedAt: "2022-01-01T00:00:00Z"
  },
  {
    id: "2",
    code: "NTM002",
    name: "國立臺灣博物館",
    type: "National Museum",
    address: "台北市中正區襄陽路2號",
    contact: "陳依倫",
    phone: "02-2382-2566",
    email: "contact@ntm.gov.tw",
    createdAt: "2022-01-02T00:00:00Z",
    updatedAt: "2022-01-02T00:00:00Z"
  },
  {
    id: "3",
    code: "NTH003",
    name: "國立臺灣歷史博物館",
    type: "National Museum",
    address: "台南市安南區長和路一段250號",
    contact: "李明哲",
    phone: "06-356-8889",
    email: "contact@nmth.gov.tw",
    createdAt: "2022-01-03T00:00:00Z",
    updatedAt: "2022-01-03T00:00:00Z"
  }
];

// Mock Heritage Assets
export const mockAssets: HeritageAsset[] = [
  {
    id: "1",
    name: "翠玉白菜",
    assetCode: "HA001",
    category: "玉器",
    temporaryClassification: "一級",
    era: "清朝",
    description: "翠玉白菜是一座由整塊翠色玉石雕琢而成的白菜雕刻品，著名的藏品之一。",
    custodialOrganizationId: "1",
    custodialOrganization: mockCustodialOrgs[0],
    imageUrl: "https://images.unsplash.com/photo-1599030302844-879134b62a84?q=80&w=500",
    registryId: "1",
    createdAt: "2023-03-01T00:00:00Z",
    updatedAt: "2023-03-01T00:00:00Z"
  },
  {
    id: "2",
    name: "肉形石",
    assetCode: "HA002",
    category: "石器",
    temporaryClassification: "一級",
    era: "清朝",
    description: "肉形石是以玫瑰石英為材質，雕琢成東坡肉的形狀，栩栩如生。",
    custodialOrganizationId: "1",
    custodialOrganization: mockCustodialOrgs[0],
    imageUrl: "https://images.unsplash.com/photo-1600093112536-b8b1d350e08e?q=80&w=500",
    projectId: "1",
    createdAt: "2023-03-02T00:00:00Z",
    updatedAt: "2023-03-02T00:00:00Z"
  },
  {
    id: "3",
    name: "南管樂器組",
    assetCode: "HA003",
    category: "樂器",
    temporaryClassification: "二級",
    era: "明清",
    description: "傳統南管音樂使用的一組樂器，包括琵琶、三絃、洞簫等。",
    custodialOrganizationId: "3",
    custodialOrganization: mockCustodialOrgs[2],
    imageUrl: "https://images.unsplash.com/photo-1508025690966-2a9a1957da31?q=80&w=500",
    registryId: "2",
    createdAt: "2023-03-03T00:00:00Z",
    updatedAt: "2023-03-03T00:00:00Z"
  },
  {
    id: "4",
    name: "青花瓷瓶",
    assetCode: "HA004",
    category: "陶瓷",
    temporaryClassification: "二級",
    era: "明朝",
    description: "青花瓷瓶，明代作品，瓶身繪有雲龍紋樣。",
    custodialOrganizationId: "2",
    custodialOrganization: mockCustodialOrgs[1],
    imageUrl: "https://images.unsplash.com/photo-1490931232288-74271c7452bf?q=80&w=500",
    projectId: "2",
    createdAt: "2023-03-04T00:00:00Z",
    updatedAt: "2023-03-04T00:00:00Z"
  },
  {
    id: "5",
    name: "龍袍",
    assetCode: "HA005",
    category: "織品",
    temporaryClassification: "一級",
    era: "清朝",
    description: "清朝皇帝穿著的龍袍，以絲織品製成，繡有五爪金龍。",
    custodialOrganizationId: "1",
    custodialOrganization: mockCustodialOrgs[0],
    imageUrl: "https://images.unsplash.com/photo-1567730282926-fec53ee77db9?q=80&w=500",
    registryId: "1",
    projectId: "1",
    createdAt: "2023-03-05T00:00:00Z",
    updatedAt: "2023-03-05T00:00:00Z"
  }
];

// Mock Registry Records
export const mockRegistry: Registry[] = [
  {
    id: "1",
    name: "古物指定備查案2023-A",
    registryNumber: "R2023001",
    status: "approved",
    submissionDate: "2023-04-01T00:00:00Z",
    approvalDate: "2023-04-15T00:00:00Z",
    assets: mockAssets.filter(asset => asset.registryId === "1"),
    createdAt: "2023-04-01T00:00:00Z",
    updatedAt: "2023-04-15T00:00:00Z"
  },
  {
    id: "2",
    name: "文化資產備查案2023-B",
    registryNumber: "R2023002",
    status: "submitted",
    submissionDate: "2023-05-10T00:00:00Z",
    assets: mockAssets.filter(asset => asset.registryId === "2"),
    createdAt: "2023-05-10T00:00:00Z",
    updatedAt: "2023-05-10T00:00:00Z"
  }
];

// Mock Projects
export const mockProjects: Project[] = [
  {
    id: "1",
    name: "故宮數位保存計畫",
    description: "針對故宮珍貴文物的數位化保存計畫，包含3D掃描與高解析度影像紀錄。",
    startDate: "2023-01-15T00:00:00Z",
    status: "active",
    assets: mockAssets.filter(asset => asset.projectId === "1"),
    createdAt: "2023-01-15T00:00:00Z",
    updatedAt: "2023-01-15T00:00:00Z"
  },
  {
    id: "2",
    name: "台灣古文物修復專案",
    description: "針對損壞的古文物進行專業修復的計畫，著重在陶瓷與書畫類文物。",
    startDate: "2023-02-01T00:00:00Z",
    endDate: "2023-12-31T00:00:00Z",
    status: "active",
    assets: mockAssets.filter(asset => asset.projectId === "2"),
    createdAt: "2023-02-01T00:00:00Z",
    updatedAt: "2023-02-01T00:00:00Z"
  }
];

// Mock Stats Data
export const orgStats = [
  { organizationName: "國立故宮博物院", label: "文物數量", value: 3 },
  { organizationName: "國立臺灣博物館", label: "文物數量", value: 1 },
  { organizationName: "國立臺灣歷史博物館", label: "文物數量", value: 1 }
];

export const categoryStats = [
  { category: "玉器", label: "文物數量", value: 1 },
  { category: "石器", label: "文物數量", value: 1 },
  { category: "樂器", label: "文物數量", value: 1 },
  { category: "陶瓷", label: "文物數量", value: 1 },
  { category: "織品", label: "文物數量", value: 1 }
];

export const classificationStats = [
  { classification: "一級", label: "文物數量", value: 3 },
  { classification: "二級", label: "文物數量", value: 2 }
];

export const eraStats = [
  { era: "明朝", label: "文物數量", value: 1 },
  { era: "清朝", label: "文物數量", value: 3 },
  { era: "明清", label: "文物數量", value: 1 }
];

export const registryStats = [
  { registry: "古物指定備查案2023-A", label: "文物數量", value: 2 },
  { registry: "文化資產備查案2023-B", label: "文物數量", value: 1 },
  { registry: "未納入備查", label: "文物數量", value: 2 }
];

export const projectStats = [
  { project: "故宮數位保存計畫", label: "文物數量", value: 2 },
  { project: "台灣古文物修復專案", label: "文物數量", value: 1 },
  { project: "未納入專案", label: "文物數量", value: 2 }
];
