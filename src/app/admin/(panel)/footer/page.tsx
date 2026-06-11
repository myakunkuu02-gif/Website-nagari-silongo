"use client";

import { SingleRecordEditor } from "@/components/admin/SingleRecordEditor";

export default function AdminFooterPage() {
  return (
    <SingleRecordEditor
      table="admin_settings"
      title="Kelola Footer"
      description="Atur deskripsi footer dan tautan media sosial resmi nagari."
      uploadFolder="footer"
      defaultValues={{ footer_description: "", facebook: "https://facebook.com", instagram: "https://instagram.com", youtube: "https://youtube.com", tiktok: "https://tiktok.com" }}
      fields={[
        { name: "footer_description", label: "Deskripsi Footer", type: "textarea", rows: 6 },
        { name: "facebook", label: "Facebook", type: "text" },
        { name: "instagram", label: "Instagram", type: "text" },
        { name: "youtube", label: "YouTube", type: "text" },
        { name: "tiktok", label: "TikTok", type: "text" },
      ]}
    />
  );
}
