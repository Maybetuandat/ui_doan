// src/components/labs/lab-form-dialog.tsx
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2 } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Lab, CreateLabRequest, UpdateLabRequest } from "@/types/lab";


const labFormSchema = z.object({
  name: z.string().min(1, "Tên lab không được để trống"),
  description: z.string().optional(),
  baseImage: z.string().min(1, "Base image không được để trống"),
  estimatedTime: z.number().min(1, "Thời gian ước tính phải ít nhất 1 phút").max(600, "Thời gian ước tính không được vượt quá 600 phút"),
});

type LabFormData = z.infer<typeof labFormSchema>;

interface LabFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  lab?: Lab | null;
  onSubmit: (data: CreateLabRequest | UpdateLabRequest) => Promise<void>;
  loading?: boolean;
}

const baseImages = [
  { value: "ubuntu:20.04", label: "Ubuntu 20.04" },
  { value: "ubuntu:22.04", label: "Ubuntu 22.04" },
  { value: "centos:7", label: "CentOS 7" },
  { value: "centos:8", label: "CentOS 8" },
  { value: "alpine:latest", label: "Alpine Linux" },
  { value: "debian:11", label: "Debian 11" },
  { value: "fedora:latest", label: "Fedora Latest" },
];

export function LabFormDialog({
  open,
  onOpenChange,
  lab,
  onSubmit,
  loading = false,
}: LabFormDialogProps) {
  const isEditMode = !!lab;

  const form = useForm<LabFormData>({
    resolver: zodResolver(labFormSchema),
    defaultValues: {
      name: "",
      description: "",
      baseImage: "",
      estimatedTime: 60,
    },
  });

  // Reset form when dialog opens/closes or lab changes
  useEffect(() => {
    if (open && lab) {
      form.reset({
        name: lab.name,
        description: lab.description || "",
        baseImage: lab.baseImage,
        estimatedTime: lab.estimatedTime,
      });
    } else if (open && !lab) {
      form.reset({
        name: "",
        description: "",
        baseImage: "",
        estimatedTime: 60,
      });
    }
  }, [open, lab, form]);

  const handleSubmit = async (data: LabFormData) => {
    try {
      await onSubmit(data);
      form.reset();
      onOpenChange(false);
    } catch (error) {
      // Error handling is done in parent component
      console.error("Form submission error:", error);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!loading) {
      onOpenChange(newOpen);
      if (!newOpen) {
        form.reset();
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Chỉnh sửa Lab" : "Tạo Lab mới"}
          </DialogTitle>
          <DialogDescription>
            {isEditMode
              ? "Cập nhật thông tin lab của bạn."
              : "Tạo một lab template mới cho hệ thống."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên Lab *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nhập tên lab..."
                      {...field}
                      disabled={loading}
                    />
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
                  <FormLabel>Mô tả</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Mô tả chi tiết về lab..."
                      rows={3}
                      {...field}
                      disabled={loading}
                    />
                  </FormControl>
                  <FormDescription>
                    Mô tả chi tiết về mục đích và nội dung của lab
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="baseImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Base Image *</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={loading}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn base image..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {baseImages.map((image) => (
                        <SelectItem key={image.value} value={image.value}>
                          {image.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Docker image sẽ được sử dụng làm môi trường base
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="estimatedTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Thời gian ước tính (phút) *</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="60"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      disabled={loading}
                      min={1}
                      max={600}
                    />
                  </FormControl>
                  <FormDescription>
                    Thời gian ước tính để hoàn thành lab (1-600 phút)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => handleOpenChange(false)}
                disabled={loading}
              >
                Hủy
              </Button>
              <Button type="submit" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isEditMode ? "Cập nhật" : "Tạo mới"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}