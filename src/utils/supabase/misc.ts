import { AppSupabaseClient } from "@/types";

export const getIsAppInMaintenanceMode = async (
  supabaseClient: AppSupabaseClient
): Promise<boolean> => {
  const { data, error } = await supabaseClient.rpc(
    'is_app_in_maintenance_mode'
  );

  if (error) {
    throw error;
  }

  return data;
};
