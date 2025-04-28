
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { toast } from "sonner";

const formSchema = z.object({
  organizationCode: z.string().min(1, "機關代碼為必填"),
  title: z.string().min(1, "主旨為必填"),
  registryNumber: z.string().min(1, "備查編號為必填"),
  fileNumber: z.string(),
  address: z.string().min(1, "地址為必填"),
  contactPerson: z.string().min(1, "填表人為必填"),
  department: z.string(),
  position: z.string(),
  phone: z.string().min(1, "電話為必填"),
  email: z.string().email("請輸入有效的電子郵件"),
  verificationCategories: z.array(z.string()),
  notes: z.string(),
  mainDocument: z.string(),
  attachments: z.string(),
});

type RegistryFormValues = z.infer<typeof formSchema>;

export default function RegistryForm() {
  const form = useForm<RegistryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      organizationCode: "A60000000E",
      title: "11404國立故宮博物院備查分級",
      registryNumber: "A60000000E-114009",
      verificationCategories: [],
    },
  });

  function onSubmit(data: RegistryFormValues) {
    toast.success("備查申請已送出");
    console.log(data);
  }

  const verificationOptions = [
    { id: "age50", label: "本筆位屬「製成年代逾50年之文物」" },
    { id: "age50Culture", label: "本筆位屬「製成年代未達50年但具特殊文化意義之文物」" },
    { id: "important", label: "本筆位屬「重要事件相關文物」" },
    { id: "waterMark", label: "本筆位屬「出土(水)遺物」" },
    { id: "famous", label: "本筆位屬「已故名家(人)之作品」" },
    { id: "famousHandwriting", label: "本筆位屬「已故名家(人)之手稿」" },
  ];

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">建立備查</h1>
        <Button
          variant="outline"
          onClick={() => window.history.back()}
        >
          回到保管單位
        </Button>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="organizationCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>機關代碼</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>主旨</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <p className="text-sm text-muted-foreground">
                  主旨開頭為：「自職掌」、「月份」、「單位名稱」暫行分級，如：10810文化部文資局暫行分級
                </p>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="registryNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>備查編號</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="fileNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>立案文號</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>地址</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contactPerson"
            render={({ field }) => (
              <FormItem>
                <FormLabel>填表人</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="department"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>部門</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="position"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>職稱</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>電話</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
                    <Input {...field} type="email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="verificationCategories"
            render={() => (
              <FormItem>
                <FormLabel>檢視文物條件</FormLabel>
                <div className="space-y-2">
                  {verificationOptions.map((option) => (
                    <FormField
                      key={option.id}
                      control={form.control}
                      name="verificationCategories"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={option.id}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(option.id)}
                                onCheckedChange={(checked) => {
                                  const value = field.value || [];
                                  return checked
                                    ? field.onChange([...value, option.id])
                                    : field.onChange(
                                        value.filter((item) => item !== option.id)
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {option.label}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>備註</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="mainDocument"
            render={({ field }) => (
              <FormItem>
                <FormLabel>單位文物資料總表</FormLabel>
                <FormControl>
                  <div className="flex gap-2">
                    <Input type="file" {...field} value={undefined} />
                    <Button type="button" variant="outline">選擇檔案</Button>
                  </div>
                </FormControl>
                <p className="text-sm text-muted-foreground">
                  備註：議立文物保管機關（構）(例如:博物館或專研究單位)，依文化資產保存法施行細則第29條第三項，得以送保管機構（構）之2處品登錄資料，作為備查資料。
                </p>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="attachments"
            render={({ field }) => (
              <FormItem>
                <FormLabel>附件上傳</FormLabel>
                <FormControl>
                  <div className="flex gap-2">
                    <Input type="file" multiple {...field} value={undefined} />
                    <Button type="button" variant="outline">選擇檔案</Button>
                  </div>
                </FormControl>
                <p className="text-sm text-muted-foreground">
                  備註：議立文物保管機關（構）(例如:博物館或專研究單位)，依文化資產保存法施行細則第29條第三項，得以送保管機構（構）之2處品登錄資料，作為備查資料。
                </p>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">送出</Button>
        </form>
      </Form>
    </div>
  );
}
