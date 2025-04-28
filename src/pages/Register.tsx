
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { LandPlot } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { RegisterCredentials } from '@/types';

const formSchema = z.object({
  username: z.string()
    .min(3, { message: '使用者名稱至少需要 3 個字元' })
    .max(30, { message: '使用者名稱最多 30 個字元' }),
  email: z.string()
    .email({ message: '請輸入有效的電子郵件地址' }),
  password: z.string()
    .min(6, { message: '密碼至少需要 6 個字元' }),
  confirmPassword: z.string(),
})
.refine(data => data.password === data.confirmPassword, {
  message: "密碼與確認密碼不符",
  path: ["confirmPassword"],
});

export default function Register() {
  const { register, isLoading } = useAuth();
  const navigate = useNavigate();

  const form = useForm<RegisterCredentials>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: RegisterCredentials) => {
    const success = await register(data);
    if (success) {
      // After successful registration, redirect to login
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted/30 px-4">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center mb-8">
          <LandPlot className="h-12 w-12 text-heritage-600" />
          <h1 className="text-3xl font-bold text-heritage-700 ml-2">文化資產守護系統</h1>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-center">申請帳號</CardTitle>
            <CardDescription className="text-center">填寫資料申請系統帳號</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>使用者名稱</FormLabel>
                      <FormControl>
                        <Input placeholder="請輸入使用者名稱" {...field} disabled={isLoading} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>電子郵件</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="請輸入電子郵件" {...field} disabled={isLoading} />
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

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>確認密碼</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="請再次輸入密碼" {...field} disabled={isLoading} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? '處理中...' : '申請帳號'}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-muted-foreground">
              已有帳號? <Link to="/login" className="text-primary hover:underline">登入系統</Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
