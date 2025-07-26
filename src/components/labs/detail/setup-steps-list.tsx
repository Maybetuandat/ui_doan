// src/components/labs/detail/setup-steps-list.tsx
import React from "react";
import { Plus, ListOrdered, AlertCircle } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SetupStepCard } from "./setup-step-card";
import { SetupStep } from "@/types/setupStep";

interface SetupStepsListProps {
  steps: SetupStep[];
  onCreateStep: () => void;
  onEditStep: (step: SetupStep) => void;
  onDeleteStep: (step: SetupStep) => void;
  onMoveStepUp: (step: SetupStep) => void;
  onMoveStepDown: (step: SetupStep) => void;
  loading?: boolean;
}

export function SetupStepsList({
  steps,
  onCreateStep,
  onEditStep,
  onDeleteStep,
  onMoveStepUp,
  onMoveStepDown,
  loading = false,
}: SetupStepsListProps) {
  const sortedSteps = [...steps].sort((a, b) => a.stepOrder - b.stepOrder);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="flex items-center gap-2">
              <ListOrdered className="h-5 w-5" />
              Setup Steps
              {steps.length > 0 && (
                <span className="text-sm font-normal text-muted-foreground">
                  ({steps.length} bước)
                </span>
              )}
            </CardTitle>
            <CardDescription>
              Các bước thiết lập sẽ được thực hiện theo thứ tự khi khởi tạo lab
            </CardDescription>
          </div>
          
          <Button
            onClick={onCreateStep}
            disabled={loading}
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            Thêm Step
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        {sortedSteps.length === 0 ? (
          <EmptyStepsState onCreateStep={onCreateStep} loading={loading} />
        ) : (
          <div className="space-y-4">
            {sortedSteps.map((step, index) => (
              <SetupStepCard
                key={step.id}
                step={step}
                isFirst={index === 0}
                isLast={index === sortedSteps.length - 1}
                onEdit={onEditStep}
                onDelete={onDeleteStep}
                onMoveUp={onMoveStepUp}
                onMoveDown={onMoveStepDown}
                loading={loading}
              />
            ))}
            
            {/* Add step hint */}
            <div className="flex justify-center pt-4">
              <Button
                variant="outline"
                onClick={onCreateStep}
                disabled={loading}
                className="gap-2 border-dashed"
              >
                <Plus className="h-4 w-4" />
                Thêm step mới
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function EmptyStepsState({ 
  onCreateStep, 
  loading 
}: { 
  onCreateStep: () => void;
  loading: boolean;
}) {
  return (
    <div className="text-center py-12">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted mx-auto mb-4">
        <ListOrdered className="h-8 w-8 text-muted-foreground" />
      </div>
      
      <h3 className="text-lg font-semibold mb-2">
        Chưa có setup steps
      </h3>
      
      <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
        Tạo các bước thiết lập tự động để chuẩn bị môi trường lab. 
        Các steps sẽ được thực hiện theo thứ tự.
      </p>
      
      <Button 
        onClick={onCreateStep}
        disabled={loading}
        className="gap-2"
      >
        <Plus className="h-4 w-4" />
        Tạo setup step đầu tiên
      </Button>
      
      <div className="mt-8 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4 max-w-md mx-auto">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
          <div className="text-sm text-blue-800 dark:text-blue-200">
            <p className="font-medium mb-1">Mẹo:</p>
            <p>
              Setup steps thường bao gồm cài đặt phần mềm, cấu hình hệ thống, 
              hoặc tải về tài nguyên cần thiết cho lab.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}