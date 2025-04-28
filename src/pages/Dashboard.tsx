
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
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

const COLORS = ['#4d8169', '#699b83', '#96b9a7', '#bfd5c9'];
const CLASSIFICATION_COLORS = ['#8B5CF6', '#D946EF', '#F97316', '#0EA5E9'];

export default function Dashboard() {
  const totalAssets = mockAssets.length;
  const totalRegistry = mockRegistry.length;
  const totalProjects = mockProjects.length;
  const totalOrgs = mockCustodialOrgs.length;

  const customTooltipFormatter = (value: number, name: string, item: any) => {
    if (name === "案件數") return [`${value.toLocaleString()} 案`, name];
    return [`${value.toLocaleString()} 件`, name];
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
                展示系統中各類別文物的件數及案件數統計
              </CardDescription>
            </CardHeader>
            <CardContent className="pl-0">
              <ResponsiveContainer width="100%" height={400}>
                <BarChart
                  data={categoryStats}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 60
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="category" 
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis />
                  <Tooltip formatter={customTooltipFormatter} />
                  <Legend />
                  <Bar dataKey="value" name="文物件數" fill="#4d8169" />
                  <Bar dataKey="cases" name="案件數" fill="#8B5CF6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="classification">
          <Card>
            <CardHeader>
              <CardTitle>依文物分級統計</CardTitle>
              <CardDescription>
                展示系統中依文物暫行分級的件數及案件數統計
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={classificationStats}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="classification"
                        label={({ classification, percent }) => 
                          `${classification}: ${(percent * 100).toFixed(1)}%`
                        }
                      >
                        {classificationStats.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={CLASSIFICATION_COLORS[index % CLASSIFICATION_COLORS.length]} 
                          />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `${Number(value).toLocaleString()} 件`} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={classificationStats}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="cases"
                        nameKey="classification"
                        label={({ classification, percent }) => 
                          `${classification}: ${(percent * 100).toFixed(1)}%`
                        }
                      >
                        {classificationStats.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={COLORS[index % COLORS.length]} 
                          />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `${Number(value).toLocaleString()} 案`} />
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
