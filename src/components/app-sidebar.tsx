
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarTrigger
} from '@/components/ui/sidebar';
import { 
  Home, 
  ClipboardList, 
  FolderKanban, 
  Building2, 
  LandPlot, 
  Users, 
  UserCog, 
  Settings, 
  BarChart4, 
  LogOut 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function AppSidebar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [open, setOpen] = useState(true);

  if (!user) return null;

  const isAdmin = user.role === 'admin';

  const navigationItems = [
    { name: "首頁", icon: Home, path: "/dashboard", access: ["user", "admin"] },
    { name: "備查管理", icon: ClipboardList, path: "/registry", access: ["user", "admin"] },
    { name: "專案管理", icon: FolderKanban, path: "/projects", access: ["user", "admin"] },
    { name: "保管單位管理", icon: Building2, path: "/custodial-orgs", access: ["user", "admin"] },
    { name: "文物管理", icon: LandPlot, path: "/heritage-assets", access: ["user", "admin"] },
    { name: "使用者管理", icon: Users, path: "/users", access: ["admin"] },
    { name: "帳號申請管理", icon: UserCog, path: "/user-applications", access: ["admin"] },
    { name: "系統管理", icon: Settings, path: "/system", access: ["admin"] },
    { name: "統計報表", icon: BarChart4, path: "/reports", access: ["user", "admin"] },
  ];

  // Filter navigation items based on user role
  const authorizedItems = navigationItems.filter(
    item => item.access.includes(user.role)
  );

  return (
    <Sidebar className="border-r border-border">
      <SidebarHeader className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <LandPlot className="h-6 w-6 text-sidebar-primary" />
          <h2 className="text-lg font-bold text-sidebar-primary">文化資產守護系統</h2>
        </div>
        <SidebarTrigger onClick={() => setOpen(!open)} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>功能選單</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {authorizedItems.map(item => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton asChild>
                    <Link 
                      to={item.path}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                        location.pathname === item.path 
                          ? "bg-sidebar-accent text-sidebar-accent-foreground" 
                          : "text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4 border-t border-sidebar-border">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-sidebar-accent flex items-center justify-center">
              {user.username[0].toUpperCase()}
            </div>
            <div>
              <p className="text-sm font-medium text-sidebar-foreground">{user.username}</p>
              <p className="text-xs text-sidebar-foreground/70">{user.role === 'admin' ? '管理員' : '一般使用者'}</p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            className="w-full justify-start gap-2 text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent/50" 
            onClick={logout}
          >
            <LogOut className="h-4 w-4" />
            登出系統
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
