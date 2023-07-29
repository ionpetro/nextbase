import { createSupabaseUserServerPagesClient } from "@/supabase-clients/user/createSupabaseUserServerPagesClient";
import { NextApiRequest, NextApiResponse } from "next";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const supabaseClient = await createSupabaseUserServerPagesClient({
    req,
    res
  });

  const { data, error } = await supabaseClient.rpc('remove_app_admin_privilege_for_user', {
    user_id: `05aba565-e447-4d34-8c3f-54dd4a6db069`
  })

  res.json({
    data,
    error
  })

}
