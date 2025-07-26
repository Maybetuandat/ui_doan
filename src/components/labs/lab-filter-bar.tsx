// src/components/labs/lab-filter-bar.tsx
import React from "react";
import { Search, Filter, X } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

export interface LabFilters {
  search: string;
  status: "all" | "active" | "inactive";
  sortBy: "newest" | "oldest" | "name" | "estimatedTime";
}

interface LabFilterBarProps {
  filters: LabFilters;
  onFiltersChange: (filters: LabFilters) => void;
  totalCount: number;
  loading?: boolean;
}

export function LabFilterBar({
  filters,
  onFiltersChange,
  totalCount,
  loading = false,
}: LabFilterBarProps) {
  const handleSearchChange = (value: string) => {
    onFiltersChange({ ...filters, search: value });
  };

  const handleStatusChange = (value: string) => {
    onFiltersChange({ 
      ...filters, 
      status: value as LabFilters["status"] 
    });
  };

  const handleSortChange = (value: string) => {
    onFiltersChange({ 
      ...filters, 
      sortBy: value as LabFilters["sortBy"] 
    });
  };

  const clearFilters = () => {
    onFiltersChange({
      search: "",
      status: "all",
      sortBy: "newest",
    });
  };

  const hasActiveFilters = filters.search || filters.status !== "all" || filters.sortBy !== "newest";
  const activeFilterCount = [
    filters.search,
    filters.status !== "all",
    filters.sortBy !== "newest",
  ].filter(Boolean).length;

  return (
    <div className="space-y-4">
      {/* Search and main filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm lab theo tên hoặc mô tả..."
            value={filters.search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10"
            disabled={loading}
          />
        </div>

        {/* Filter controls */}
        <div className="flex gap-2">
          <Select 
            value={filters.status} 
            onValueChange={handleStatusChange}
            disabled={loading}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả</SelectItem>
              <SelectItem value="active">Đang hoạt động</SelectItem>
              <SelectItem value="inactive">Tạm dừng</SelectItem>
            </SelectContent>
          </Select>

          <Select 
            value={filters.sortBy} 
            onValueChange={handleSortChange}
            disabled={loading}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Mới nhất</SelectItem>
              <SelectItem value="oldest">Cũ nhất</SelectItem>
              <SelectItem value="name">Tên A-Z</SelectItem>
              <SelectItem value="estimatedTime">Thời gian</SelectItem>
            </SelectContent>
          </Select>

          {hasActiveFilters && (
            <Button
              variant="outline"
              size="icon"
              onClick={clearFilters}
              disabled={loading}
              className="shrink-0"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Xóa bộ lọc</span>
            </Button>
          )}
        </div>
      </div>

      {/* Results summary and active filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Hiển thị {totalCount} lab</span>
          {hasActiveFilters && (
            <Badge variant="secondary" className="ml-2">
              <Filter className="mr-1 h-3 w-3" />
              {activeFilterCount} bộ lọc
            </Badge>
          )}
        </div>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            disabled={loading}
            className="text-xs"
          >
            <X className="mr-1 h-3 w-3" />
            Xóa tất cả bộ lọc
          </Button>
        )}
      </div>

      {/* Active filters display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {filters.search && (
            <Badge variant="outline" className="gap-1">
              Tìm kiếm: "{filters.search}"
              <X 
                className="h-3 w-3 cursor-pointer hover:text-destructive" 
                onClick={() => handleSearchChange("")}
              />
            </Badge>
          )}
          
          {filters.status !== "all" && (
            <Badge variant="outline" className="gap-1">
              Trạng thái: {filters.status === "active" ? "Hoạt động" : "Tạm dừng"}
              <X 
                className="h-3 w-3 cursor-pointer hover:text-destructive" 
                onClick={() => handleStatusChange("all")}
              />
            </Badge>
          )}
          
          {filters.sortBy !== "newest" && (
            <Badge variant="outline" className="gap-1">
              Sắp xếp: {
                filters.sortBy === "oldest" ? "Cũ nhất" :
                filters.sortBy === "name" ? "Tên A-Z" : "Thời gian"
              }
              <X 
                className="h-3 w-3 cursor-pointer hover:text-destructive" 
                onClick={() => handleSortChange("newest")}
              />
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}