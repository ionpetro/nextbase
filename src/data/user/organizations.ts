'use server';
import { supabaseAdminClient } from '@/supabase-clients/admin/supabaseAdminClient';
import { createSupabaseUserServerActionClient } from '@/supabase-clients/user/createSupabaseUserServerActionClient';
import { createSupabaseUserServerComponentClient } from '@/supabase-clients/user/createSupabaseUserServerComponentClient';
import type {
  Enum,
  NormalizedSubscription,
  Table,
  UnwrapPromise,
  ValidSAPayload,
} from '@/types';
import { serverGetLoggedInUser } from '@/utils/server/serverGetLoggedInUser';
import type { AuthUserMetadata } from '@/utils/zod-schemas/authUserMetadata';
import { revalidatePath } from 'next/cache';
import { v4 as uuid } from 'uuid';
import { refreshSessionAction } from './session';

export const createOrganization = async (
  name: string,
  {
    isOnboardingFlow = false,
  }: {
    isOnboardingFlow?: boolean;
  } = {},
): Promise<ValidSAPayload<string>> => {
  const supabaseClient = createSupabaseUserServerActionClient();
  const user = await serverGetLoggedInUser();

  const organizationId = uuid();

  const { error } = await supabaseClient.from('organizations').insert({
    title: name,
    id: organizationId,
  });

  if (error) {
    return { status: 'error', message: error.message };
  }

  const { error: orgMemberErrors } = await supabaseAdminClient
    .from('organization_members')
    .insert([
      {
        member_id: user.id,
        organization_id: organizationId,
        member_role: 'owner',
      },
    ]);

  if (orgMemberErrors) {
    return { status: 'error', message: orgMemberErrors.message };
  }

  if (isOnboardingFlow) {
    const { error: updateError } = await supabaseClient
      .from('user_private_info')
      .update({ default_organization: organizationId })
      .eq('id', user.id);

    if (updateError) {
      return { status: 'error', message: updateError.message };
    }

    const updateUserMetadataPayload: Partial<AuthUserMetadata> = {
      onboardingHasCreatedOrganization: true,
    };

    const updateUserMetadataResponse = await supabaseClient.auth.updateUser({
      data: updateUserMetadataPayload,
    });

    if (updateUserMetadataResponse.error) {
      return {
        status: 'error',
        message: updateUserMetadataResponse.error.message,
      };
    }

    const refreshSessionResponse = await refreshSessionAction();
    if (refreshSessionResponse.status === 'error') {
      return refreshSessionResponse;
    }
  }

  return {
    status: 'success',
    data: organizationId,
  };
};

export async function fetchSlimOrganizations() {
  const currentUser = await serverGetLoggedInUser();
  const supabaseClient = createSupabaseUserServerComponentClient();
  const { data: organizations, error: organizationsError } =
    await supabaseClient
      .from('organization_members')
      .select('organization_id')
      .eq('member_id', currentUser.id);

  if (organizationsError) {
    throw organizationsError;
  }

  const { data, error } = await supabaseClient
    .from('organizations')
    .select('id,title')
    .in(
      'id',
      organizations.map((org) => org.organization_id),
    )
    .order('created_at', {
      ascending: false,
    });
  if (error) {
    throw error;
  }

  return data || [];
}

export const getSlimOrganizationById = async (organizationId: string) => {
  const supabaseClient = createSupabaseUserServerComponentClient();
  const { data, error } = await supabaseClient
    .from('organizations')
    .select('id,title')
    .eq('id', organizationId)
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const getAllOrganizationsForUser = async (userId: string) => {
  const supabase = createSupabaseUserServerComponentClient();
  const { data: organizations, error: organizationsError } = await supabase.rpc(
    'get_organizations_for_user',
    {
      user_id: userId,
    },
  );
  if (!organizations) {
    throw new Error(organizationsError.message);
  }

  const { data, error } = await supabase
    .from('organizations')
    .select(
      '*, organization_members(id,member_id,member_role, user_profiles(*)), subscriptions(id, prices(id,products(id,name)))',
    )
    .in(
      'id',
      organizations.map((org) => org.organization_id),
    )
    .order('created_at', {
      ascending: false,
    });
  if (error) {
    throw error;
  }

  return data || [];
};

export type InitialOrganizationListType = UnwrapPromise<
  ReturnType<typeof getAllOrganizationsForUser>
>;

export const getOrganizationById = async (organizationId: string) => {
  const supabaseClient = createSupabaseUserServerComponentClient();

  const { data, error } = await supabaseClient
    .from('organizations')
    // query team_members and team_invitations in one go
    .select('*')
    .eq('id', organizationId)
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const getOrganizationTitle = async (organizationId: string) => {
  const supabaseClient = createSupabaseUserServerComponentClient();

  const { data, error } = await supabaseClient
    .from('organizations')
    // query team_members and team_invitations in one go
    .select('id,title')
    .eq('id', organizationId)
    .single();

  if (error) {
    throw error;
  }

  return data.title;
};

export const getLoggedInUserOrganizationRole = async (
  organizationId: string,
): Promise<Enum<'organization_member_role'>> => {
  const { id: userId } = await serverGetLoggedInUser();
  const supabase = createSupabaseUserServerComponentClient();
  const { data, error } = await supabase
    .from('organization_members')
    .select('*')
    .eq('member_id', userId)
    .eq('organization_id', organizationId)
    .single();

  if (error) {
    throw error;
  } else if (!data) {
    throw new Error('User is not a member of this organization');
  }

  return data.member_role;
};

export const updateOrganizationTitle = async (
  organizationId: string,
  title: string,
): Promise<ValidSAPayload<Table<'organizations'>>> => {
  'use server';
  const supabase = createSupabaseUserServerActionClient();
  const { data, error } = await supabase
    .from('organizations')
    .update({
      title,
    })
    .eq('id', organizationId)
    .select('*')
    .single();

  if (error) {
    return { status: 'error', message: error.message };
  }

  revalidatePath(`/organization/${organizationId}`, 'layout');
  return { status: 'success', data };
};

export const getNormalizedOrganizationSubscription = async (
  organizationId: string,
): Promise<NormalizedSubscription> => {
  const supabase = createSupabaseUserServerComponentClient();
  const { data: subscriptions, error } = await supabase
    .from('subscriptions')
    .select('*, prices(*, products(*))')
    .eq('organization_id', organizationId)
    .in('status', ['trialing', 'active']);

  if (error) {
    throw error;
  }

  if (!subscriptions || subscriptions.length === 0) {
    return {
      type: 'no-subscription',
    };
  }

  try {
    const subscription = subscriptions[0];
    console.log(subscription);

    const price = Array.isArray(subscription.prices)
      ? subscription.prices[0]
      : subscription.prices;
    if (!price) {
      throw new Error('No price found');
    }

    const product = Array.isArray(price.products)
      ? price.products[0]
      : price.products;
    if (!product) {
      throw new Error('No product found');
    }

    if (subscription.status === 'trialing') {
      if (!subscription.trial_start || !subscription.trial_end) {
        throw new Error('No trial start or end found');
      }
      return {
        type: 'trialing',
        trialStart: subscription.trial_start,
        trialEnd: subscription.trial_end,
        product: product,
        price: price,
        subscription,
      };
    } else if (subscription.status) {
      return {
        type: subscription.status,
        product: product,
        price: price,
        subscription,
      };
    } else {
      return {
        type: 'no-subscription',
      };
    }
  } catch (err) {
    return {
      type: 'no-subscription',
    };
  }
};

export const getActiveProductsWithPrices = async () => {
  const supabase = createSupabaseUserServerComponentClient();
  const { data, error } = await supabase
    .from('products')
    .select('*, prices(*)')
    .eq('active', true)
    .eq('prices.active', true)
    .order('unit_amount', { foreignTable: 'prices' });

  if (error) {
    throw error;
  }

  return data || [];
};

export const getPendingInvitationsInOrganization = async (
  organizationId: string,
) => {
  const supabase = createSupabaseUserServerComponentClient();
  const { data, error } = await supabase
    .from('organization_join_invitations')
    .select(
      '*, inviter:user_profiles!inviter_user_id(*), invitee:user_profiles!invitee_user_id(*)',
    )
    .eq('organization_id', organizationId)
    .eq('status', 'active');

  if (error) {
    throw error;
  }

  return data || [];
};
export const getTeamMembersInOrganization = async (organizationId: string) => {
  const supabase = createSupabaseUserServerComponentClient();
  const { data, error } = await supabase
    .from('organization_members')
    .select('*, user_profiles(*)')
    .eq('organization_id', organizationId);

  if (error) {
    throw error;
  }

  return data.map((member) => {
    const { user_profiles, ...rest } = member;
    if (!user_profiles) {
      throw new Error('No user profile found for member');
    }
    return {
      ...rest,
      user_profiles: user_profiles,
    };
  });
};

export const getOrganizationAdmins = async (organizationId: string) => {
  const supabase = createSupabaseUserServerComponentClient();
  const { data, error } = await supabase
    .from('organization_members')
    .select('*, user_profiles(*)')
    .eq('organization_id', organizationId)
    .or('member_role.eq.admin,member_role.eq.owner');

  if (error) {
    throw error;
  }

  return data.map((member) => {
    const { user_profiles, ...rest } = member;
    if (!user_profiles) {
      throw new Error('No user profile found for member');
    }
    return {
      ...rest,
      user_profiles: user_profiles,
    };
  });
};

export const getDefaultOrganization = async () => {
  const supabaseClient = createSupabaseUserServerComponentClient();
  const user = await serverGetLoggedInUser();
  const { data, error } = await supabaseClient
    .from('user_private_info')
    .select('id, default_organization')
    .eq('id', user.id)
    .single();

  if (error) {
    throw error;
  }

  return data.default_organization;
};

export const getDefaultOrganizationId = async () => {
  const supabaseClient = createSupabaseUserServerComponentClient();
  const { data, error } = await supabaseClient
    .from('user_private_info')
    .select('default_organization')
    .single();

  if (error) {
    throw error;
  }

  if (!data.default_organization) {
    return null;
  }

  return data.default_organization;
};

export async function setDefaultOrganization(
  organizationId: string,
): Promise<ValidSAPayload> {
  const supabaseClient = createSupabaseUserServerComponentClient();
  const user = await serverGetLoggedInUser();

  const { error: updateError } = await supabaseClient
    .from('user_private_info')
    .update({ default_organization: organizationId })
    .eq('id', user.id);

  if (updateError) {
    return { status: 'error', message: updateError.message };
  }

  revalidatePath(`/organization/${organizationId}`, 'layout');
  return { status: 'success' };
}

export async function deleteOrganization(
  organizationId: string,
): Promise<ValidSAPayload<string>> {
  const supabaseClient = createSupabaseUserServerActionClient();
  const { error } = await supabaseClient
    .from('organizations')
    .delete()
    .eq('id', organizationId);

  if (error) {
    return { status: 'error', message: error.message };
  }

  revalidatePath(`/organization/${organizationId}`, 'layout');
  return {
    status: 'success',
    data: `Organization ${organizationId} deleted successfully`,
  };
}
