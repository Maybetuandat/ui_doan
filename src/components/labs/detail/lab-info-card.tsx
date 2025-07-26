// src/components/labs/detail/lab-info-card.tsx
import React from "react";
import { Dock, Clock, Calendar, Settings } from "lucide-react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Lab } from "@/types/lab";

interface LabInfoCardProps {
  lab: Lab;
}

export function LabInfoCard({ lab }: LabInfoCardProps) {
  const formatDateTime = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, "dd/MM/yyyy 'lúc' HH:mm", { locale: vi });
    } catch {
      return "Không xác định";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Thông tin Lab
        </CardTitle>
        <CardDescription>
          Chi tiết cấu hình và thông số của lab
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Basic Info */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                ID Lab
              </label>
              <p className="font-mono text-sm bg-muted px-2 py-1 rounded">
                {lab.id}
              </p>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                Trạng thái
              </label>
              <Badge variant={lab.isActive ? "default" : "secondary"}>
                {lab.isActive ? "Hoạt động" : "Tạm dừng"}
              </Badge>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">
              Tên Lab
            </label>
            <p className="text-sm">{lab.name}</p>
          </div>

          {lab.description && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                Mô tả
              </label>
              <p className="text-sm leading-relaxed">{lab.description}</p>
            </div>
          )}
        </div>

        <Separator />

        {/* Technical Info */}
        <div className="space-y-4">
          <h4 className="font-medium flex items-center gap-2">
            <Dock className="h-4 w-4" />
            Cấu hình kỹ thuật
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                Base Docker Image
              </label>
              <div className="font-mono text-sm bg-muted px-3 py-2 rounded border-l-4 border-l-blue-500">
                {lab.baseImage}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                Thời gian ước tính
              </label>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">
                  {lab.estimatedTime} phút
                </span>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Metadata */}
        <div className="space-y-4">
          <h4 className="font-medium flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Thông tin khác
          </h4>

          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">
              Ngày tạo
            </label>
            <p className="text-sm">{formatDateTime(lab.createdAt)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}