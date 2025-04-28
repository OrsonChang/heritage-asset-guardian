
import React from 'react';
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from "@/components/ui/input";

const mockProjects = [
  {
    id: 1,
    name: "國立故宮博物院研究專案",
    code: "NGM-2025-001",
    organization: "國立故宮博物院",
    status: "active",
    manager: "張明德",
    startDate: "2025-01-15",
    endDate: "2025-12-15",
    totalItems: 42,
    subsidyAmount: 1500000,
    selfAmount: 500000,
    totalAmount: 2000000
  },
  {
    id: 2,
    name: "文物數位化保存計畫",
    code: "DCP-2025-018",
    organization: "文化部文化資產局",
    status: "active",
    manager: "李文華",
    startDate: "2025-02-01",
    endDate: "2025-10-30",
    totalItems: 128,
    subsidyAmount: 2500000,
    selfAmount: 800000,
    totalAmount: 3300000
  }
];

export default function Projects() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [pageSize, setPageSize] = React.useState("10");

  const stats = {
    totalProjects: 18,
    activeProjects: 12,
    completedProjects: 5,
    canceledProjects: 1,
    totalBudget: 45800000,
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">專案管理</h1>
      
      <div className="bg-emerald-400 text-white p-6 rounded-lg grid grid-cols-5 gap-4 mb-6">
        <div className="text-center">
          <div className="text-4xl font-bold mb-2">{stats.totalProjects}</div>
          <div>專案總數</div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold mb-2">{stats.activeProjects}</div>
          <div>進行中專案</div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold mb-2">{stats.completedProjects}</div>
          <div>已完成專案</div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold mb-2">{stats.canceledProjects}</div>
          <div>已取消專案</div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold mb-2">{(stats.totalBudget / 1000000).toFixed(2)}M</div>
          <div>總預算</div>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <Button className="bg-green-500 hover:bg-green-600" asChild>
          <Link to="/projects/new">
            <Plus className="w-4 h-4 mr-2" />
            建立專案
          </Link>
        </Button>
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
            <TableHead>專案名稱</TableHead>
            <TableHead>案號</TableHead>
            <TableHead>執行單位</TableHead>
            <TableHead>計畫主持人</TableHead>
            <TableHead>開始日期</TableHead>
            <TableHead>結束日期</TableHead>
            <TableHead>文物數量</TableHead>
            <TableHead>總預算</TableHead>
            <TableHead>狀態</TableHead>
            <TableHead>操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockProjects.map((project) => (
            <TableRow key={project.id}>
              <TableCell>{project.id}</TableCell>
              <TableCell>{project.name}</TableCell>
              <TableCell>{project.code}</TableCell>
              <TableCell>{project.organization}</TableCell>
              <TableCell>{project.manager}</TableCell>
              <TableCell>{project.startDate}</TableCell>
              <TableCell>{project.endDate}</TableCell>
              <TableCell>{project.totalItems}</TableCell>
              <TableCell>{project.totalAmount.toLocaleString()}</TableCell>
              <TableCell>
                <span className="px-2 py-1 rounded bg-green-100 text-green-800 text-xs">
                  進行中
                </span>
              </TableCell>
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
