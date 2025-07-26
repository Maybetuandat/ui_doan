// src/components/labs/lab-card.tsx (Updated)
import React from "react";
import { Clock, Settings, Trash2, Power, PowerOff, Info, ExternalLink } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import { useNavigate } from "react-router-dom";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Lab } from "@/types/lab";

interface LabCardProps {
  lab: Lab;
  onEdit: (lab: Lab) => void;
  onDelete: (lab: Lab) => void;
  onToggleStatus: (lab: Lab) => void;
  loading?: boolean;
}

export function LabCard({
  lab,
  onEdit,
  onDelete,
  onToggleStatus,
  loading = false,
}: LabCardProps) {
  const navigate = useNavigate();

  const formatCreatedAt = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return formatDistanceToNow(date, { 
        addSuffix: true, 
        locale: vi 
      });
    } catch {
      return "Không xác định";
    }
  };

  const handleViewDetails = () => {
    navigate(`/labs/${lab.id}`);
  };

  return (
    <TooltipProvider>
      <Card className="group hover:shadow-md transition-all duration-200 border-l-4 border-l-primary/20 hover:border-l-primary cursor-pointer">
        <CardHeader className="pb-3" onClick={handleViewDetails}>
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <CardTitle className="text-lg font-semibold truncate group-hover:text-primary transition-colors">
                {lab.name}
              </CardTitle>
              <CardDescription className="mt-1 flex items-center gap-2">
                <span className="text-xs text-muted-foreground">
                  Tạo {formatCreatedAt(lab.createdAt)}
                </span>
                <Badge 
                  variant={lab.isActive ? "default" : "secondary"}
                  className="text-xs"
                >
                  {lab.isActive ? "Hoạt động" : "Tạm dừng"}
                </Badge>
              </CardDescription>
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  disabled={loading}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Settings className="h-4 w-4" />
                  <span className="sr-only">Tùy chọn</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[160px]">
                <DropdownMenuItem onClick={handleViewDetails}>
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Xem chi tiết
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onEdit(lab)}>
                  <Settings className="mr-2 h-4 w-4" />
                  Chỉnh sửa
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onToggleStatus(lab)}>
                  {lab.isActive ? (
                    <>
                      <PowerOff className="mr-2 h-4 w-4" />
                      Tạm dừng
                    </>
                  ) : (
                    <>
                      <Power className="mr-2 h-4 w-4" />
                      Kích hoạt
                    </>
                  )}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>

        <CardContent className="space-y-3" onClick={handleViewDetails}>
          {lab.description && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {lab.description}
            </p>
          )}
          
          <div className="flex flex-wrap gap-2 text-xs">
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge variant="outline" className="gap-1">
                  <Clock className="h-3 w-3" />
                  {lab.estimatedTime}p
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>Thời gian ước tính: {lab.estimatedTime} phút</p>
              </TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge variant="outline" className="font-mono text-xs">
                  {lab.baseImage}
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>Base Docker Image</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </CardContent>

        <CardFooter className="pt-3 border-t">
          <div className="flex w-full gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1"
              onClick={(e) => {
                e.stopPropagation();
                handleViewDetails();
              }}
              disabled={loading}
            >
              <Info className="mr-2 h-4 w-4" />
              Chi tiết
            </Button>
            <Button 
              variant="default" 
              size="sm" 
              className="flex-1"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(lab);
              }}
              disabled={loading}
            >
              <Settings className="mr-2 h-4 w-4" />
              Chỉnh sửa
            </Button>
          </div>
        </CardFooter>
      </Card>
    </TooltipProvider>
  );
}