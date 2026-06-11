export function AuthNotice() {
  return (
    <div className="rounded-[28px] border border-amber-400/20 bg-amber-300/10 p-5 text-sm leading-7 text-amber-100">
      Supabase belum dikonfigurasi. Isi file <code>.env.local</code> berdasarkan <code>.env.example</code>, lalu hubungkan proyek dengan Supabase untuk mengaktifkan login, CRUD, dan upload media.
    </div>
  );
}
