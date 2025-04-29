
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileUp, Plus } from "lucide-react";

export default function HeritageAssetsPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">文物管理</h1>
        <div className="flex gap-2">
          <Button asChild variant="outline">
            <Link to="/heritage-assets/batch-import" className="flex items-center gap-2">
              <FileUp className="h-4 w-4" />
              批次匯入
            </Link>
          </Button>
          <Button asChild>
            <Link to="#" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              新增文物
            </Link>
          </Button>
        </div>
      </div>
      
      <div className="text-center py-12">
        <p className="text-lg text-gray-500">尚無文物資料</p>
        <p className="text-sm text-gray-400 mt-2">您可以透過點擊「批次匯入」或「新增文物」來新增文物資料</p>
      </div>
    </div>
  );
}
