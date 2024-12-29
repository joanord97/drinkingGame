"use client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Camera } from "lucide-react";
import { useRef, useState } from "react";
import { supabase } from "@/lib/supabase/client";

type AvatarUploadProps = {
  name: string;
  onImageUploaded: (url: string) => void;
};

export function AvatarUpload({ name, onImageUploaded }: AvatarUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);

      // Create preview
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);

      // Upload to Supabase Storage
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const { data, error } = await supabase.storage
        .from("avatars")
        .upload(fileName, file);

      if (error) throw error;

      // Get public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from("avatars").getPublicUrl(data.path);

      onImageUploaded(publicUrl);
    } catch (error) {
      console.error("Error uploading image:", error);
      setPreviewUrl(undefined);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <Avatar className="w-24 h-24">
        <AvatarImage
          src={
            previewUrl ||
            `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`
          }
          alt={name}
        />
        <AvatarFallback>
          {name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </AvatarFallback>
      </Avatar>

      <input
        type="file"
        accept="image/*"
        capture="user"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileSelect}
      />

      <Button
        variant="outline"
        size="sm"
        className="gap-2"
        onClick={() => fileInputRef.current?.click()}
        disabled={isUploading}
      >
        <Camera className="h-4 w-4" />
        {isUploading ? "Uploading..." : "Take Photo"}
      </Button>
    </div>
  );
}
