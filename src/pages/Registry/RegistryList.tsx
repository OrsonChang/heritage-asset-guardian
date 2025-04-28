
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { FileText, Plus } from "lucide-react";

interface RegistryRecord {
  registryNumber: string;
  title: string;
  caseCount: number;
  itemCount: number;
  status: string;
  updatedAt: string;
}

const mockData: RegistryRecord[] = [
  {
    registryNumber: "A60000000E-109001",
    title: "94年12月19日國立故宮博物院申報院藏古物自行分級清冊",
    caseCount: 3546,
    itemCount: 84924,
    status: "草案",
    updatedAt: "2020-06-08 08:22:39"
  },
  {
    registryNumber: "A60000000E-110001",
    title: "11005國立故宮博物院暫行分級",
    caseCount: 4,
    itemCount: 4,
    status: "同意備查",
    updatedAt: "2021-05-18 06:39:12"
  },
  // ... more mock data can be added here
];

export default function RegistryList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState("10");

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">備查管理</h1>
        <Button asChild>
          <Link to="/registry/new" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            建立備查
          </Link>
        </Button>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span>顯示</span>
          <select
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(e.target.value)}
            className="w-20 rounded-md border border-input bg-background px-3 py-1"
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>
          <span>項結果</span>
        </div>
        <div className="flex items-center gap-2">
          <span>搜尋:</span>
          <Input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-64"
          />
        </div>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>備查編號</TableHead>
              <TableHead>主旨</TableHead>
              <TableHead>案數</TableHead>
              <TableHead>件數</TableHead>
              <TableHead>狀態</TableHead>
              <TableHead>更新時間</TableHead>
              <TableHead>操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockData.map((record) => (
              <TableRow key={record.registryNumber}>
                <TableCell>{record.registryNumber}</TableCell>
                <TableCell className="max-w-md truncate">{record.title}</TableCell>
                <TableCell>{record.caseCount}</TableCell>
                <TableCell>{record.itemCount}</TableCell>
                <TableCell>{record.status}</TableCell>
                <TableCell>{record.updatedAt}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    備查歷程
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
