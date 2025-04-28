
import { useState } from 'react';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { LandPlot } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { LoginCredentials } from '@/types';

const formSchema = z.object({
  username: z.string().min(3, { message: '使用者名稱至少需要 3 個字元' }),
  password: z.string().min(6, { message: '密碼至少需要 6 個字元' }),
});

export default function Login() {
  const { login, isLoading, isAuthenticated } = useAuth();
  const [loginError, setLoginError] = useState<string | null>(null);
  const navigate = useNavigate();

  const form = useForm<LoginCredentials>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginCredentials) => {
    setLoginError(null);
    const success = await login(data);
    
    if (success) {
      navigate('/dashboard');
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted/30 px-4">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center mb-8">
          <LandPlot className="h-12 w-12 text-heritage-600" />
          <h1 className="text-3xl font-bold text-heritage-700 ml-2">文化資產守護系統</h1>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-center">系統登入</CardTitle>
            <CardDescription className="text-center">請輸入您的帳號和密碼</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>帳號</FormLabel>
                      <FormControl>
                        <Input placeholder="請輸入帳號" {...field} disabled={isLoading} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>密碼</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="請輸入密碼" {...field} disabled={isLoading} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {loginError && <p className="text-sm text-red-500 mt-2">{loginError}</p>}

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? '登入中...' : '登入'}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-muted-foreground">
              沒有帳號? <Link to="/register" className="text-primary hover:underline">申請帳號</Link>
            </p>
          </CardFooter>
        </Card>
        
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>測試用帳號：admin / password（管理員）</p>
          <p>測試用帳號：user1 / password（一般使用者）</p>
        </div>
      </div>
    </div>
  );
}
