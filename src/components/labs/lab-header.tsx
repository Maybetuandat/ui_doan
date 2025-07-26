// src/components/labs/lab-header.tsx
import React from "react";
import { Plus, RefreshCw, Boxes } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface LabHeaderProps {
  onCreateLab: () => void;
  onRefresh: () => void;
  loading?: boolean;
  totalLabs: number;
}

export function LabHeader({ 
  onCreateLab, 
  onRefresh, 
  loading = false,
  totalLabs 
}: LabHeaderProps) {
  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/" className="flex items-center gap-1">
              <Boxes className="h-4 w-4" />
              Trang chủ
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="font-medium">
              Quản lý Labs
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight">
            Quản lý Labs
          </h1>
          <p className="text-muted-foreground">
            Tạo và quản lý các lab templates cho hệ thống. 
            Hiện có <span className="font-medium text-foreground">{totalLabs}</span> lab.
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onRefresh}
            disabled={loading}
            className="gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Làm mới
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
      </div>
    </div>
  );
}