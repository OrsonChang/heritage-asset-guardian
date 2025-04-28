
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Plus, Download } from 'lucide-react';

const mockData = [
  {
    id: 1,
    name: "國家發展委員會檔案管理局",
    teamSize: 3,
    registryCount: 2,
    projectCount: 2,
    caseCount: 3317,
    totalItems: 3958,
    contact: "賀語宸",
    email: "ycho@archives.gov.tw",
    phone: "(02)2838-8168",
    updatedAt: ""
  },
  {
    id: 2,
    name: "國史館臺灣文獻館",
    teamSize: 2,
    registryCount: 1,
    projectCount: 1,
    caseCount: 14,
    totalItems: 112120,
    contact: "張家榮",
    email: "ccj@mail.th.gov.tw",
    phone: "(049)2316881#307",
    updatedAt: "2022-04-12 13:50:00"
  },
];

export default function CustodialOrgList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [pageSize, setPageSize] = useState("10");

  const stats = {
    orgCount: 130,
    registryCount: 151,
    projectCount: 16,
    caseCount: 76733,
    totalItems: 325652,
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">保管單位</h1>
      
      <div className="bg-emerald-400 text-white p-6 rounded-lg grid grid-cols-5 gap-4 mb-6">
        <div className="text-center">
          <div className="text-4xl font-bold mb-2">{stats.orgCount}</div>
          <div>保管單位數</div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold mb-2">{stats.registryCount}</div>
          <div>備查數</div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold mb-2">{stats.projectCount}</div>
          <div>專案數</div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold mb-2">{stats.caseCount}</div>
          <div>案數</div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold mb-2">{stats.totalItems}</div>
          <div>件數</div>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <Button className="bg-green-500 hover:bg-green-600">
          <Plus className="w-4 h-4 mr-2" />
          建立保管單位
        </Button>
        <Button variant="secondary" className="bg-teal-500 text-white hover:bg-teal-600">
          <Download className="w-4 h-4 mr-2" />
          匯出保管單位
        </Button>
        <Button variant="secondary" className="bg-sky-500 text-white hover:bg-sky-600">機關代碼</Button>
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <span>顯示</span>
          <select 
            value={pageSize} 
            onChange={(e) => setPageSize(e.target.value)}
            className="border rounded p-1"
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>
          <span>項結果</span>
        </div>
        <div className="flex gap-2 items-center">
          <span>搜尋:</span>
          <Input
            type="search"
            placeholder="搜尋..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-sm"
          />
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>保管單位名稱</TableHead>
            <TableHead>團隊成員數</TableHead>
            <TableHead>備查數</TableHead>
            <TableHead>專案數</TableHead>
            <TableHead>案數</TableHead>
            <TableHead>件數</TableHead>
            <TableHead>聯絡窗口</TableHead>
            <TableHead>聯絡人信箱</TableHead>
            <TableHead>聯絡人電話</TableHead>
            <TableHead>修改時間</TableHead>
            <TableHead>操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockData.map((org) => (
            <TableRow key={org.id}>
              <TableCell>{org.id}</TableCell>
              <TableCell>{org.name}</TableCell>
              <TableCell>{org.teamSize}</TableCell>
              <TableCell>{org.registryCount}</TableCell>
              <TableCell>{org.projectCount}</TableCell>
              <TableCell>{org.caseCount}</TableCell>
              <TableCell>{org.totalItems}</TableCell>
              <TableCell>{org.contact}</TableCell>
              <TableCell>{org.email}</TableCell>
              <TableCell>{org.phone}</TableCell>
              <TableCell>{org.updatedAt}</TableCell>
              <TableCell>
                <Button variant="secondary" className="bg-blue-500 text-white hover:bg-blue-600">
                  編輯
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
