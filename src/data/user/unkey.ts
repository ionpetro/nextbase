'use server';
import { createSupabaseUserRouteHandlerClient } from '@/supabase-clients/user/createSupabaseUserRouteHandlerClient';
import { createSupabaseUserServerActionClient } from '@/supabase-clients/user/createSupabaseUserServerActionClient';
import { createSupabaseUserServerComponentClient } from '@/supabase-clients/user/createSupabaseUserServerComponentClient';
import { serverGetLoggedInUser } from '@/utils/server/serverGetLoggedInUser';
import axios from 'axios';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const generateKeyResponseSchema = z.object({
  keyId: z.string(),
  key: z.string(),
});

function maskKey(key: string): string {
  const start = key.substr(0, 3);
  const end = key.substr(-3);
  const masked = '*'.repeat(key.length - 6);
  return start + masked + end;
}

export async function generateUnkeyToken() {
  const user = await serverGetLoggedInUser();
  const supabaseClient = createSupabaseUserRouteHandlerClient();
  const response = await axios.post(
    'https://api.unkey.dev/v1/keys',
    {
      apiId: process.env.UNKEY_API_ID,
      ownerId: user.id,
      prefix: 'st_',
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.UNKEY_ROOT_KEY}`,
        'Content-Type': 'application/json',
      },
    },
  );
  const { keyId, key } = generateKeyResponseSchema.parse(response.data);
  const { data: insertKeyResponse, error: insertKeyError } =
    await supabaseClient
      .from('user_api_keys')
      .insert({
        key_id: keyId,
        masked_key: maskKey(key),
        user_id: user.id,
      })
      .select('*')
      .single();

  if (insertKeyError) {
    throw insertKeyError;
  }

  return {
    keyId,
    key,
    createdAt: insertKeyResponse.created_at,
  };
}

export async function revokeUnkeyToken(keyId: string) {
  const response = await axios.delete(
    `https://api.unkey.dev/v1/keys/${keyId}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.UNKEY_ROOT_KEY}`,
      },
    },
  );

  const supabaseClient = createSupabaseUserServerActionClient();

  const { error } = await supabaseClient
    .from('user_api_keys')
    .update({
      is_revoked: true,
    })
    .eq('key_id', keyId)
    .single();

  if (error) {
    throw error;
  }

  revalidatePath('/', 'layout');

  return {
    ok: true,
  };
}

export const getActiveDeveloperKeys = async () => {
  const user = await serverGetLoggedInUser();
  const supabaseClient = createSupabaseUserServerComponentClient();

  const { data, error } = await supabaseClient
    .from('user_api_keys')
    .select('*')
    .eq('user_id', user.id)
    .eq('is_revoked', false);

  if (error) {
    throw error;
  }
  return data;
};

export const getActiveDeveloperKeyCount = async () => {
  const user = await serverGetLoggedInUser();
  const supabaseClient = createSupabaseUserServerComponentClient();

  const { count, error } = await supabaseClient
    .from('user_api_keys')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id)
    .eq('is_revoked', false);

  if (error) {
    console.log(error);
    throw error;
  }
  return count ?? 0;
};

export const getRevokedApiKeyList = async () => {
  const supabaseClient = createSupabaseUserServerComponentClient();
  const user = await serverGetLoggedInUser();

  const { data, error } = await supabaseClient
    .from('user_api_keys')
    .select('*')
    .eq('user_id', user.id)
    .eq('is_revoked', true);

  if (error) {
    throw error;
  }
  return data;
};
