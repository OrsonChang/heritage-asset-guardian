
import React from 'react';
import { useForm } from 'react-hook-form';
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const projectFormSchema = z.object({
  name: z.string().min(1, { message: "專案名稱為必填欄位" }),
  description: z.string().min(1, { message: "專案年度計畫編號為必填欄位" }),
  manager: z.string().min(1, { message: "計畫主持人為必填欄位" }),
  code: z.string().min(1, { message: "案號為必填欄位" }),
  organization: z.string().min(1, { message: "執行單位為必填欄位" }),
  startDate: z.date({
    required_error: "請選擇專案開始日期",
  }),
  endDate: z.date({
    required_error: "請選擇專案結束日期",
  }),
  subsidyAmount: z.string().min(1, { message: "補助款為必填欄位" }),
  selfAmount: z.string().min(1, { message: "自籌款為必填欄位" }),
  totalAmount: z.string().min(1, { message: "總金額為必填欄位" }),
  process: z.string().min(1, { message: "專案期程為必填欄位" }),
  notes: z.string().optional(),
});

type ProjectFormValues = z.infer<typeof projectFormSchema>;

export default function ProjectForm() {
  const { toast } = useToast();
  
  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      name: "",
      description: "",
      manager: "",
      code: "",
      organization: "",
      subsidyAmount: "",
      selfAmount: "",
      process: "",
      notes: "",
    },
  });

  const calculateTotal = () => {
    const subsidy = parseFloat(form.watch("subsidyAmount") || "0");
    const self = parseFloat(form.watch("selfAmount") || "0");
    const total = subsidy + self;
    form.setValue("totalAmount", total.toString());
    return total.toString();
  };

  function onSubmit(data: ProjectFormValues) {
    console.log(data);
    toast({
      title: "專案建立成功",
      description: `專案 "${data.name}" 已成功建立`,
    });
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center gap-2 mb-6">
        <h1 className="text-2xl font-bold">國立故宮博物院 | 建立專案</h1>
        <Button variant="outline" className="text-purple-600 border-purple-600">
          <span className="mr-2">回到保管單位</span>
        </Button>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center">
                  專案名稱
                  <span className="text-red-500 ml-1">*</span>
                </FormLabel>
                <FormControl>
                  <Input {...field} placeholder="請輸入專案名稱" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center">
                  專案年度計畫編號
                  <span className="text-red-500 ml-1">*</span>
                </FormLabel>
                <FormControl>
                  <Input {...field} placeholder="請輸入專案年度計畫編號" />
                </FormControl>
                <p className="text-sm text-gray-500 mt-1">
                  前項是計畫年度區間，例:6-8為計畫編制的第2項編號為A大項編制欄位名稱，8年編制計畫名稱，C日期資料，D撰寫日期資料，如:
                  A02，第二種計畫類型名分類編號為5備查名，E所在機關，C經報編號，M替換編號，如：S03，數字：1056A025S01索書為105至106之年度計畫之
                  文物編制欄位工單位產製之費率分額1筆。
                </p>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="subsidyAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>補助款</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      type="number" 
                      placeholder="請輸入金額"
                      onChange={(e) => {
                        field.onChange(e);
                        setTimeout(calculateTotal, 0);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-end justify-center">
              <span className="text-xl mb-3">+</span>
            </div>

            <FormField
              control={form.control}
              name="selfAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>自籌款</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      type="number" 
                      placeholder="請輸入金額"
                      onChange={(e) => {
                        field.onChange(e);
                        setTimeout(calculateTotal, 0);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center">
              <span className="text-xl">=</span>
            </div>

            <FormField
              control={form.control}
              name="totalAmount"
              render={({ field }) => (
                <FormItem className="w-1/4">
                  <FormLabel>總金額</FormLabel>
                  <FormControl>
                    <Input {...field} readOnly />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="manager"
            render={({ field }) => (
              <FormItem>
                <FormLabel>計畫主持人</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="請輸入計畫主持人" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>案號</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="請輸入案號" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="organization"
            render={({ field }) => (
              <FormItem>
                <FormLabel>執行單位</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="請輸入執行單位" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>專案開始日期</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "yyyy/MM/dd")
                        ) : (
                          <span>年/月/日</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="process"
            render={({ field }) => (
              <FormItem>
                <FormLabel>專案期程</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="請輸入專案期程" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>專案開始結束時間</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "yyyy/MM/dd")
                        ) : (
                          <span>年/月/日</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            <FormLabel>文物附件清單</FormLabel>
            <div className="mt-2">
              <Button variant="outline" type="button">選擇檔案</Button>
              <span className="text-sm text-gray-500 ml-2">未選擇任何檔案</span>
            </div>
          </div>

          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>備註</FormLabel>
                <FormControl>
                  <Textarea 
                    {...field} 
                    placeholder="請輸入備註" 
                    className="min-h-[200px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600">
            送出
          </Button>
        </form>
      </Form>
    </div>
  );
}
