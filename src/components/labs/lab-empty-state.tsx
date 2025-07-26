// src/components/labs/lab-empty-state.tsx
import React from "react";
import { Plus, Search, Boxes } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface LabEmptyStateProps {
  hasFilters: boolean;
  onCreateLab: () => void;
  onClearFilters: () => void;
  loading?: boolean;
}

export function LabEmptyState({
  hasFilters,
  onCreateLab,
  onClearFilters,
  loading = false,
}: LabEmptyStateProps) {
  if (hasFilters) {
    return (
      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted mb-4">
            <Search className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">
            Không tìm thấy lab nào
          </h3>
          <p className="text-muted-foreground mb-6 max-w-sm">
            Không có lab nào phù hợp với bộ lọc hiện tại. 
            Thử điều chỉnh tiêu chí tìm kiếm hoặc xóa bộ lọc.
          </p>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={onClearFilters}
              disabled={loading}
            >
              Xóa bộ lọc
            </Button>
            <Button 
              onClick={onCreateLab}
              disabled={loading}
              className="gap-2"
            >
              <Plus className="h-4 w-4" />
              Tạo Lab mới
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-dashed">
      <CardContent className="flex flex-col items-center justify-center py-16 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 mb-6">
          <Boxes className="h-10 w-10 text-primary" />
        </div>
        <h3 className="text-xl font-semibold mb-3">
          Chưa có lab nào
        </h3>
        <p className="text-muted-foreground mb-8 max-w-md">
          Bắt đầu tạo lab template đầu tiên của bạn. 
          Labs giúp thiết lập môi trường thực hành với các bước cấu hình tự động.
        </p>
        <Button 
          onClick={onCreateLab}
          disabled={loading}
          size="lg"
          className="gap-2"
        >
          <Plus className="h-5 w-5" />
          Tạo Lab đầu tiên
        </Button>
        
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl text-sm">
          <div className="flex flex-col items-center text-center p-4">
            <div className="h-8 w-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-2">
              <span className="text-blue-600 dark:text-blue-400 font-semibold">1</span>
            </div>
            <h4 className="font-medium mb-1">Tạo Lab Template</h4>
            <p className="text-muted-foreground text-xs">
              Định nghĩa môi trường và thời gian ước tính
            </p>
          </div>
          
          <div className="flex flex-col items-center text-center p-4">
            <div className="h-8 w-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-2">
              <span className="text-green-600 dark:text-green-400 font-semibold">2</span>
            </div>
            <h4 className="font-medium mb-1">Thêm Setup Steps</h4>
            <p className="text-muted-foreground text-xs">
              Cấu hình các bước thiết lập tự động
            </p>
          </div>
          
          <div className="flex flex-col items-center text-center p-4">
            <div className="h-8 w-8 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-2">
              <span className="text-purple-600 dark:text-purple-400 font-semibold">3</span>
            </div>
            <h4 className="font-medium mb-1">Triển khai Lab</h4>
            <p className="text-muted-foreground text-xs">
              Kích hoạt và sử dụng trong hệ thống
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}