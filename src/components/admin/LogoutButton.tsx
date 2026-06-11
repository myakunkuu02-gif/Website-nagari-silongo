"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/browser";

export function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  return (
    <button
      type="button"
      onClick={async () => {
        const supabase = createClient();
        if (!supabase) {
          toast.error("Supabase belum dikonfigurasi.");
          return;
        }

        setLoading(true);
        const { error } = await supabase.auth.signOut();
        setLoading(false);

        if (error) {
          toast.error(error.message);
          return;
        }

        router.replace("/admin/login");
        router.refresh();
      }}
      className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-4 py-2 text-sm font-semibold text-white transition hover:border-[#f0c86e]/30"
    >
      <LogOut className="h-4 w-4" />
      {loading ? "Keluar..." : "Logout"}
    </button>
  );
}
