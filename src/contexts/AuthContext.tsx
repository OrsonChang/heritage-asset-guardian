
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, LoginCredentials, RegisterCredentials } from '@/types';
import { mockUsers } from '@/data/mockData';
import { useToast } from '@/components/ui/use-toast';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  register: (credentials: RegisterCredentials) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // Mock login function
  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const foundUser = mockUsers.find(
        u => u.username === credentials.username
      );
      
      if (foundUser) {
        // In a real app, we'd verify password here
        if (credentials.password === 'password') {
          setUser(foundUser);
          localStorage.setItem('currentUser', JSON.stringify(foundUser));
          toast({
            title: "登入成功",
            description: "歡迎回到文化資產守護系統",
          });
          return true;
        }
      }
      
      toast({
        title: "登入失敗",
        description: "帳號或密碼不正確",
        variant: "destructive"
      });
      return false;
    } catch (error) {
      toast({
        title: "登入失敗",
        description: "發生錯誤，請稍後再試",
        variant: "destructive"
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Mock register function
  const register = async (credentials: RegisterCredentials): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Check if username or email already exists
      const userExists = mockUsers.some(
        u => u.username === credentials.username || u.email === credentials.email
      );
      
      if (userExists) {
        toast({
          title: "註冊失敗",
          description: "使用者名稱或電子郵件已存在",
          variant: "destructive"
        });
        return false;
      }
      
      // In a real app, we would create the user in the database
      // For demo purposes, we'll just show success message
      toast({
        title: "註冊申請已送出",
        description: "請等待管理員審核",
      });
      
      return true;
    } catch (error) {
      toast({
        title: "註冊失敗",
        description: "發生錯誤，請稍後再試",
        variant: "destructive"
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
    toast({
      title: "已登出系統",
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        isAuthenticated: !!user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};
