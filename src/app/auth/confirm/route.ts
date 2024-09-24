import { type EmailOtpType } from "@supabase/supabase-js";
import { type NextRequest } from "next/server";

import { createSupabaseClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = searchParams.get("next") ?? "/onboarding/verify-phone-number";
  if (token_hash && type) {
    const supabase = createSupabaseClient();

    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });
    console.log(error, 'error')
    if (!error) {
      redirect(next);
    }
  }

  redirect("/error");
}
