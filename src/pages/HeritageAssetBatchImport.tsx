
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowLeft, Upload, FileWarning, Info, FileUp } from "lucide-react";
import { toast } from "sonner";

export default function HeritageAssetBatchImport() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (file.size > 30 * 1024 * 1024) { // 30MB limit
        toast.error("檔案大小超過30MB限制");
        return;
      }
      
      // Check file extension
      const fileExt = file.name.split('.').pop()?.toLowerCase();
      if (fileExt !== 'zip') {
        toast.error("請上傳ZIP格式的檔案");
        return;
      }

      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("請先選擇檔案");
      return;
    }

    setIsUploading(true);
    
    try {
      // In a real implementation, this would connect to an API
      // to process the upload and import the data
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
      toast.success("檔案上傳成功，資料已開始處理");
      setSelectedFile(null);
    } catch (error) {
      toast.error("檔案上傳失敗，請稍後再試");
      console.error("Upload error:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">文物批次匯入</h1>
        <Button asChild variant="outline">
          <Link to="/heritage-assets" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            回到文物管理
          </Link>
        </Button>
      </div>

      <div className="max-w-3xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">94年12月19日國立故宮博物院申報院藏古物自行分級清冊 | 備查文物匯入</h2>
        
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-start gap-2">
                <p className="text-sm font-medium">範例檔案：</p>
                <Link to="#" className="text-sm text-blue-600 hover:underline">備查文物匯入範例</Link>
              </div>

              <Alert variant="destructive" className="bg-red-50">
                <FileWarning className="h-4 w-4" />
                <AlertDescription className="text-sm">
                  備查文物匯入範例與專案文物匯入範例不同，不可混用！
                </AlertDescription>
              </Alert>

              <Alert className="bg-yellow-50">
                <Info className="h-4 w-4" />
                <AlertDescription className="text-sm">
                  請下載範例檔案並解壓縮，填寫資料於內的「main.xls」(文物主檔)、「pieces.xls」(一案多件或附屬文物清單)(沒有一案多件或附屬文物者不填)
                </AlertDescription>
              </Alert>

              <Alert className="bg-yellow-50">
                <Info className="h-4 w-4" />
                <AlertDescription className="text-sm">
                  詳細欄位值請參考「main-help.xls」及「pieces-help.xls」
                </AlertDescription>
              </Alert>

              <Alert className="bg-yellow-50">
                <Info className="h-4 w-4" />
                <AlertDescription className="text-sm">
                  文物主檔中的所有圖片(文物代表照片、文物保存現況照片、文物其他角度及相關照片)皆放入「main-images」資料夾，而一案多件或附屬文物清單的圖片(文物照片)放入「piece-images」。
                </AlertDescription>
              </Alert>

              <Alert variant="destructive" className="bg-red-50">
                <FileWarning className="h-4 w-4" />
                <AlertDescription className="text-sm">
                  請不要重新命名或刪除範例檔案內原有的檔案，並確定壓縮時包含所有原有的檔案
                </AlertDescription>
              </Alert>

              <Alert variant="destructive" className="bg-red-50">
                <FileWarning className="h-4 w-4" />
                <AlertDescription className="text-sm">
                  上傳格式：zip，檔案大小請勿超過30MB
                </AlertDescription>
              </Alert>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-10 bg-gray-50">
            <div className="text-center space-y-4">
              <FileUp className="mx-auto h-12 w-12 text-gray-400" />
              <div className="space-y-1">
                <p className="text-sm text-gray-600">點擊選擇檔案或將檔案拖曳至此處</p>
                <p className="text-xs text-gray-500">ZIP檔案 / 最大30MB</p>
              </div>

              <div className="pt-4">
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  accept=".zip"
                  className="sr-only"
                  onChange={handleFileChange}
                />
                <label htmlFor="file-upload">
                  <Button type="button" variant="outline" className="mr-4">
                    選擇檔案
                  </Button>
                </label>
                {selectedFile && (
                  <span className="text-sm text-gray-500">
                    已選擇：{selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)}MB)
                  </span>
                )}
              </div>
            </div>
          </div>

          <Button 
            onClick={handleUpload} 
            disabled={!selectedFile || isUploading}
            className="w-full"
          >
            <Upload className="mr-2 h-4 w-4" />
            {isUploading ? '上傳中...' : '上傳檔案'}
          </Button>
        </div>
      </div>
    </div>
  );
}
