"use server";
import { PRODUCT_NAME } from "@/constants";
import { createSupabaseUserServerActionClient } from "@/supabase-clients/user/createSupabaseUserServerActionClient";
import { createSupabaseUserServerComponentClient } from "@/supabase-clients/user/createSupabaseUserServerComponentClient";
import type { SupabaseFileUploadOptions, Table, ValidSAPayload } from "@/types";
import { sendEmail } from "@/utils/api-routes/utils";
import { toSiteURL } from "@/utils/helpers";
import { serverGetLoggedInUser } from "@/utils/server/serverGetLoggedInUser";
import { renderAsync } from "@react-email/render";
import ConfirmAccountDeletionEmail from "emails/account-deletion-request";
import slugify from "slugify";
import urlJoin from "url-join";

export async function getIsAppAdmin(): Promise<boolean> {
  const user = await serverGetLoggedInUser();
  if ("user_role" in user) {
    return user.user_role === "admin";
  }
  return false;
}

export const getUserProfile = async (
  userId: string,
) => {
  const supabase = createSupabaseUserServerComponentClient();
  const { data, error } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    throw error;
  }

  return data;
};
export const getUserFullName = async (userId: string) => {
  const supabase = createSupabaseUserServerComponentClient();
  const { data, error } = await supabase
    .from("user_profiles")
    .select("full_name")
    .eq("id", userId)
    .single();

  if (error) {
    throw error;
  }

  return data.full_name;
};

export const getUserAvatarUrl = async (userId: string) => {
  const supabase = createSupabaseUserServerComponentClient();
  const { data, error } = await supabase
    .from("user_profiles")
    .select("avatar_url")
    .eq("id", userId)
    .single();

  if (error) {
    throw error;
  }

  return data.avatar_url;
};

export const getUserPendingInvitationsByEmail = async (userEmail: string) => {
  const supabaseClient = createSupabaseUserServerComponentClient();
  const { data, error } = await supabaseClient
    .from("organization_join_invitations")
    .select(
      "*, inviter:user_profiles!inviter_user_id(*), invitee:user_profiles!invitee_user_id(*), organization:organizations(*)",
    )
    .ilike("invitee_user_email", `%${userEmail}%`)
    .eq("status", "active");

  if (error) {
    throw error;
  }

  return data || [];
};

export const getUserPendingInvitationsById = async (userId: string) => {
  const supabaseClient = createSupabaseUserServerComponentClient();
  const { data, error } = await supabaseClient
    .from("organization_join_invitations")
    .select(
      "*, inviter:user_profiles!inviter_user_id(*), invitee:user_profiles!invitee_user_id(*), organization:organizations(*)",
    )
    .eq("invitee_user_id", userId)
    .eq("status", "active");

  if (error) {
    throw error;
  }

  return data || [];
};

export const uploadPublicUserAvatar = async (
  formData: FormData,
  fileName: string,
  fileOptions?: SupabaseFileUploadOptions | undefined,
): Promise<ValidSAPayload<string>> => {
  "use server";
  const file = formData.get("file");
  if (!file) {
    throw new Error("File is empty");
  }
  const slugifiedFilename = slugify(fileName, {
    lower: true,
    strict: true,
    replacement: "-",
  });
  const supabaseClient = createSupabaseUserServerActionClient();
  const user = await serverGetLoggedInUser();
  const userId = user.id;
  const userImagesPath = `${userId}/images/${slugifiedFilename}`;

  const { data, error } = await supabaseClient.storage
    .from("public-user-assets")
    .upload(userImagesPath, file, fileOptions);

  if (error) {
    return { status: "error", message: error.message };
  }

  const { path } = data;

  const filePath = path.split(",")[0];
  const supabaseFileUrl = urlJoin(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    "/storage/v1/object/public/public-user-assets",
    filePath,
  );

  return { status: "success", data: supabaseFileUrl };
};

export const updateUserProfileNameAndAvatar = async ({
  fullName,
  avatarUrl,
}: {
  fullName?: string;
  avatarUrl?: string;
}): Promise<ValidSAPayload<Table<"user_profiles">>> => {
  "use server";
  const supabaseClient = createSupabaseUserServerActionClient();
  const user = await serverGetLoggedInUser();
  const { data, error } = await supabaseClient
    .from("user_profiles")
    .update({
      full_name: fullName,
      avatar_url: avatarUrl,
    })
    .eq("id", user.id)
    .select()
    .single();

  if (error) {
    return { status: "error", message: error.message };
  }

  return { status: "success", data };
};

export const acceptTermsOfService = async (
  accepted: boolean,
): Promise<ValidSAPayload<{ accepted_terms: boolean }>> => {
  const supabaseClient = createSupabaseUserServerComponentClient();

  const userId = (await serverGetLoggedInUser()).id;

  const { data, error } = await supabaseClient
    .from("user_onboarding")
    .upsert(
      {
        user_id: userId,
        accepted_terms: accepted,
      },
      { onConflict: "user_id" },
    )
    .select()
    .single();

  if (error) {
    return { status: "error", message: error.message };
  }

  return { status: "success", data: { accepted_terms: data.accepted_terms } };
};

export const getAcceptedTermsOfService = async (userId: string) => {
  const supabaseClient = createSupabaseUserServerActionClient();
  const { data, error } = await supabaseClient
    .from("user_onboarding")
    .select("accepted_terms")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
};

export async function requestAccountDeletion(): Promise<
  ValidSAPayload<Table<"account_delete_tokens">>
> {
  const supabaseClient = createSupabaseUserServerActionClient();
  const user = await serverGetLoggedInUser();
  if (!user.email) {
    return { status: "error", message: "User email not found" };
  }
  const { data, error } = await supabaseClient
    .from("account_delete_tokens")
    .upsert({
      user_id: user.id,
    })
    .select("*")
    .single();

  if (error) {
    return { status: "error", message: error.message };
  }

  const userFullName =
    (await getUserFullName(user.id)) ?? `User ${user.email ?? ""}`;

  const deletionHTML = await renderAsync(
    <ConfirmAccountDeletionEmail
      deletionConfirmationLink={toSiteURL(`/confirm-delete-user/${data.token}`)}
      userName={userFullName}
      appName={PRODUCT_NAME}
    />,
  );

  await sendEmail({
    from: process.env.ADMIN_EMAIL,
    html: deletionHTML,
    subject: `Confirm Account Deletion - ${PRODUCT_NAME}`,
    to: user.email,
  });

  return {
    status: "success",
    data,
  };
}
