import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  PieChart, 
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend
} from 'recharts';
import { 
  ClipboardList, 
  FolderKanban, 
  Building2, 
  LandPlot
} from 'lucide-react';
import { 
  mockAssets, 
  mockCustodialOrgs, 
  mockRegistry, 
  mockProjects,
  categoryStats,
  classificationStats
} from '@/data/mockData';

const CATEGORY_COLORS = ['#1A1F2C', '#7E69AB', '#9b87f5', '#D6BCFA'];
const CLASSIFICATION_COLORS = ['#2D3748', '#553C9A', '#805AD5', '#B794F4'];

export default function Dashboard() {
  const totalAssets = mockAssets.length;
  const totalRegistry = mockRegistry.length;
  const totalProjects = mockProjects.length;
  const totalOrgs = mockCustodialOrgs.length;

  const renderCustomizedLabel = (props: any) => {
    const { cx, cy, midAngle, innerRadius, outerRadius, value, name, percent } = props;
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        className="text-xs"
      >
        {`${name} (${(percent * 100).toFixed(1)}%)`}
      </text>
    );
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-heritage-800">系統總覽</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground">文物總數</p>
                <p className="text-3xl font-bold">{totalAssets}</p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-heritage-100 flex items-center justify-center">
                <LandPlot className="h-6 w-6 text-heritage-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground">備查案件</p>
                <p className="text-3xl font-bold">{totalRegistry}</p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-amber-100 flex items-center justify-center">
                <ClipboardList className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground">進行中專案</p>
                <p className="text-3xl font-bold">{totalProjects}</p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center">
                <FolderKanban className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground">保管單位</p>
                <p className="text-3xl font-bold">{totalOrgs}</p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center">
                <Building2 className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="category" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="category">文物類別分布</TabsTrigger>
          <TabsTrigger value="classification">文物分級分布</TabsTrigger>
        </TabsList>
        
        <TabsContent value="category">
          <Card>
            <CardHeader>
              <CardTitle>依文物類別統計</CardTitle>
              <CardDescription>
                藝術作品: 227 案 248 件<br/>
                生活及儀禮器物: 2516 案 4166 件<br/>
                圖書文獻及影音資料: 3475 案 117548 件<br/>
                其他(功能未明者): 61 案 61 件
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-center font-medium mb-4">文物件數分布</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={categoryStats}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={2}
                        dataKey="value"
                        labelLine={false}
                        label={renderCustomizedLabel}
                      >
                        {categoryStats.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={CATEGORY_COLORS[index % CATEGORY_COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value: number) => `${value.toLocaleString()} 件`}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div>
                  <h3 className="text-center font-medium mb-4">案件數分布</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={categoryStats}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={2}
                        dataKey="cases"
                        labelLine={false}
                        label={renderCustomizedLabel}
                      >
                        {categoryStats.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={CATEGORY_COLORS[index % CATEGORY_COLORS.length]} 
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value: number) => `${value.toLocaleString()} 案`}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="classification">
          <Card>
            <CardHeader>
              <CardTitle>依文物分級統計</CardTitle>
              <CardDescription>
                國寶: 759 案 52963 件<br/>
                重要古物: 3899 案 43875 件<br/>
                一般古物: 70076 案 113378 件<br/>
                暫無古物文化資產價值: 1999 案 115436 件
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-center font-medium mb-4">文物件數分布</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={classificationStats}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={2}
                        dataKey="value"
                        labelLine={false}
                        label={renderCustomizedLabel}
                      >
                        {classificationStats.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={CLASSIFICATION_COLORS[index % CLASSIFICATION_COLORS.length]} 
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value: number) => `${value.toLocaleString()} 件`}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div>
                  <h3 className="text-center font-medium mb-4">案件數分布</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={classificationStats}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={2}
                        dataKey="cases"
                        labelLine={false}
                        label={renderCustomizedLabel}
                      >
                        {classificationStats.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={CLASSIFICATION_COLORS[index % CLASSIFICATION_COLORS.length]} 
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value: number) => `${value.toLocaleString()} 案`}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>最近備查案件</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {mockRegistry.map((registry) => (
                <li key={registry.id} className="flex items-center justify-between border-b pb-2">
                  <div>
                    <p className="font-medium">{registry.name}</p>
                    <p className="text-sm text-muted-foreground">狀態: {
                      registry.status === 'approved' ? '已審核' : 
                      registry.status === 'submitted' ? '已提交' : 
                      registry.status === 'rejected' ? '已駁回' : '草稿'
                    }</p>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {new Date(registry.submissionDate).toLocaleDateString('zh-TW')}
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>進行中專案</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {mockProjects.map((project) => (
                <li key={project.id} className="flex items-center justify-between border-b pb-2">
                  <div>
                    <p className="font-medium">{project.name}</p>
                    <p className="text-sm text-muted-foreground">
                      文物數量: {project.assets.length}
                    </p>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {new Date(project.startDate).toLocaleDateString('zh-TW')}
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
