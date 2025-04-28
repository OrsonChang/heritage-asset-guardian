import {
  User,
  CustodialOrganization,
  HeritageAsset,
  Registry,
  Project,
} from "@/types";

export const mockUsers: User[] = [
  {
    id: "1",
    username: "admin",
    email: "admin@example.com",
    role: "admin",
    createdAt: "2024-03-01T12:00:00Z",
    status: "active",
  },
  {
    id: "2",
    username: "user1",
    email: "user1@example.com",
    role: "user",
    createdAt: "2024-03-05T10:00:00Z",
    status: "active",
  },
  {
    id: "3",
    username: "user2",
    email: "user2@example.com",
    role: "user",
    createdAt: "2024-03-10T14:00:00Z",
    status: "pending",
  },
];

export const mockCustodialOrgs: CustodialOrganization[] = [
  {
    id: "1",
    code: "ORG001",
    name: "文化部文化資產局",
    type: "政府機關",
    address: "臺中市新社區",
    contact: "王小明",
    phone: "04-22290280",
    email: "info@boch.gov.tw",
    createdAt: "2024-03-01T08:00:00Z",
    updatedAt: "2024-03-01T08:00:00Z",
  },
  {
    id: "2",
    code: "ORG002",
    name: "國立故宮博物院",
    type: "博物館",
    address: "臺北市士林區",
    contact: "陳大文",
    phone: "02-28812021",
    email: "service@npm.gov.tw",
    createdAt: "2024-03-02T09:00:00Z",
    updatedAt: "2024-03-02T09:00:00Z",
  },
];

export const mockAssets: HeritageAsset[] = [
  {
    id: "1",
    name: "清 乾隆 霽青描金游魚轉心瓶",
    assetCode: "ASSET001",
    category: "陶瓷器",
    temporaryClassification: "國寶",
    era: "清",
    description: "瓶作撇口，短頸，溜肩，圈足。頸部套有可以轉動的內瓶...",
    custodialOrganizationId: "2",
    imageUrl: "/images/asset1.jpeg",
    registryId: "1",
    projectId: "1",
    createdAt: "2024-03-03T10:00:00Z",
    updatedAt: "2024-03-03T10:00:00Z",
  },
  {
    id: "2",
    name: "明 永樂 青花穿蓮龍紋天球瓶",
    assetCode: "ASSET002",
    category: "陶瓷器",
    temporaryClassification: "重要古物",
    era: "明",
    description: "瓶圓口，直頸，豐肩，腹碩大，平底。通體青花紋飾...",
    custodialOrganizationId: "2",
    imageUrl: "/images/asset2.jpeg",
    registryId: "1",
    projectId: "2",
    createdAt: "2024-03-04T11:00:00Z",
    updatedAt: "2024-03-04T11:00:00Z",
  },
  {
    id: "3",
    name: " Test Heritage Asset",
    assetCode: "ASSET003",
    category: "其他",
    temporaryClassification: "一般古物",
    era: "現代",
    description: "測試文物",
    custodialOrganizationId: "1",
    createdAt: "2024-03-04T11:00:00Z",
    updatedAt: "2024-03-04T11:00:00Z",
  },
];

export const mockRegistry: Registry[] = [
  {
    id: "1",
    name: "第一批國寶/重要古物提報",
    registryNumber: "REG001",
    status: "approved",
    submissionDate: "2024-03-15T14:00:00Z",
    approvalDate: "2024-03-20T14:00:00Z",
    assets: [mockAssets[0], mockAssets[1]],
    createdAt: "2024-03-10T10:00:00Z",
    updatedAt: "2024-03-20T14:00:00Z",
  },
  {
    id: "2",
    name: "新增一般古物提報",
    registryNumber: "REG002",
    status: "submitted",
    submissionDate: "2024-03-22T10:00:00Z",
    assets: [mockAssets[2]],
    createdAt: "2024-03-15T10:00:00Z",
    updatedAt: "2024-03-22T10:00:00Z",
  },
  {
    id: "3",
    name: " Another Registry",
    registryNumber: "REG003",
    status: "draft",
    submissionDate: "2024-03-22T10:00:00Z",
    assets: [],
    createdAt: "2024-03-15T10:00:00Z",
    updatedAt: "2024-03-22T10:00:00Z",
  },
];

export const mockProjects: Project[] = [
  {
    id: "1",
    name: "故宮文物數位典藏計畫",
    description: "針對故���博物院藏品進行數位化保存與研究...",
    startDate: "2024-01-01T00:00:00Z",
    endDate: "2024-12-31T00:00:00Z",
    status: "active",
    assets: [mockAssets[0]],
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-03-25T16:00:00Z",
  },
  {
    id: "2",
    name: "文化資產價值評估研究",
    description: "評估臺灣重要文化資產的歷史、藝術與科學價值...",
    startDate: "2024-02-15T00:00:00Z",
    status: "completed",
    assets: [mockAssets[1]],
    createdAt: "2024-02-15T00:00:00Z",
    updatedAt: "2024-03-25T16:00:00Z",
  },
];

export const categoryStats = [
  {
    category: "藝術作品",
    value: 248,
    cases: 227
  },
  {
    category: "生活及儀禮器物",
    value: 4166,
    cases: 2516
  },
  {
    category: "圖書文獻及影音資料",
    value: 117548,
    cases: 3475
  },
  {
    category: "其他(功能未明者)",
    value: 61,
    cases: 61
  }
];

export const classificationStats = [
  {
    classification: "國寶",
    value: 52963,
    cases: 759
  },
  {
    classification: "重要古物",
    value: 43875,
    cases: 3899
  },
  {
    classification: "一般古物",
    value: 113378,
    cases: 70076
  },
  {
    classification: "暫無古物文化資產價值",
    value: 115436,
    cases: 1999
  }
];
