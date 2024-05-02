'use server';
import { LucideIcon } from '@/components/LucideIcon';
import { PageHeading } from '@/components/PageHeading';
import { T } from '@/components/ui/Typography';
import { getActiveProductsWithPrices } from '@/data/user/organizations';
import type { Enum, NormalizedSubscription, UnwrapPromise } from '@/types';
import { cn } from '@/utils/cn';
import { formatNormalizedSubscription } from '@/utils/formatNormalizedSubscription';
import {
  CreateSubscriptionButton,
  ManageSubscriptionButton,
  StartFreeTrialButton,
} from './ActionButtons';

function getProductsSortedByPrice(
  activeProducts: UnwrapPromise<ReturnType<typeof getActiveProductsWithPrices>>,
) {
  if (!activeProducts) return [];
  const products = activeProducts.flatMap((product) => {
    const prices = Array.isArray(product.prices)
      ? product.prices
      : [product.prices];

    const pricesForProduct = prices.map((price) => {
      const priceString = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: price?.currency ?? undefined,
        minimumFractionDigits: 0,
      }).format((price?.unit_amount || 0) / 100);
      return {
        ...product,
        price,
        priceString,
      };
    });
    return pricesForProduct;
  });

  return products
    .sort((a, b) => (a?.price?.unit_amount ?? 0) - (b?.price?.unit_amount ?? 0))
    .filter(Boolean);
}

async function ChoosePricingTable({
  organizationId,
  isOrganizationAdmin,
}: {
  organizationId: string;
  isOrganizationAdmin: boolean;
}) {
  const activeProducts = await getActiveProductsWithPrices();

  // supabase cannot sort by foreign table, so we do it here
  const productsSortedByPrice = getProductsSortedByPrice(activeProducts);

  return (
    <div className="space-y-4 max-w-7xl">
      {/* <Overline>Pricing table</Overline> */}
      {/* <H3 className='mt-3 mb-0 border-none'>Pricing table</H3> */}
      <div className="space-y-2">
        {/* <PricingModeToggle mode={pricingMode} onChange={setPricingMode} /> */}
        <div className="flex space-x-6 w-full">
          {productsSortedByPrice.map((product) => {
            if (!product.price) {
              return null;
            }
            if (
              product.price.id === null ||
              product.price.id === undefined ||
              product.price.id === undefined ||
              product.price.unit_amount === null ||
              product.price.unit_amount === undefined
            ) {
              return null;
            }
            const priceId = product.price.id;
            return (
              <>
                <div
                  key={product.id + priceId}
                  className={cn(
                    'w-full',
                    'flex flex-col justify-between',
                    'mt-3 order-2 shadow-none overflow-hidden rounded-xl',
                    'hover:shadow-xl transition',
                    'sm:w-96 lg:w-full lg:order-1',
                    'border mb-2',
                  )}
                >
                  <div>
                    <div className="flex items-center mb-6 p-7 pt-6 border-b">
                      <div>
                        <T.H4 className="mt-0 mb-4 dark:text-slate-300">
                          {' '}
                          {product.name}
                        </T.H4>
                        <span>
                          <T.H1 className="dark:text-slate-50" key={priceId}>
                            {' '}
                            {product.priceString}
                            <span className="font-medium text-base text-muted-foreground tracking-normal">
                              {' '}
                              per {product.price.interval}
                            </span>
                          </T.H1>
                        </span>
                      </div>
                    </div>

                    <div className="mb-8 px-5 pt-0 pl-6">
                      <ul className="font-medium text-muted-foreground">
                        <li className="items-start gap-0 grid grid-cols-[24px,1fr] mb-2 text-md">
                          <LucideIcon name="Check" className="w-6 h-6 text-green-600" />
                          <T.P className="ml-3 leading-6">
                            {product.description}
                          </T.P>
                        </li>
                        <li className="items-start gap-0 grid grid-cols-[24px,1fr] mb-2 text-md">
                          <LucideIcon name="Check" className="w-6 h-6 text-green-600" />
                          <T.P className="ml-3 leading-6">A nice feature</T.P>
                        </li>
                        <li className="items-start gap-0 grid grid-cols-[24px,1fr] mb-2 text-md">
                          <LucideIcon name="Check" className="w-6 h-6 text-green-600" />
                          <T.P className="ml-3 leading-6">
                            Another nice feature
                          </T.P>
                        </li>
                        <li className="items-start gap-0 grid grid-cols-[24px,1fr] mb-2 text-md">
                          {product.price.unit_amount > 0 ? (
                            <LucideIcon name="Check" className="w-6 h-6 text-green-600" />
                          ) : (
                            <LucideIcon name="X" className="text-red-500" />
                          )}
                          <T.P className="ml-3 leading-6">
                            A premium feature
                          </T.P>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-2 mx-5 mt-4 mb-5 py-1 rounded-xl text-center text-white text-xl">
                    {isOrganizationAdmin ? (
                      <>
                        <StartFreeTrialButton
                          organizationId={organizationId}
                          priceId={priceId}
                        />
                        <CreateSubscriptionButton
                          organizationId={organizationId}
                          priceId={priceId}
                        />
                      </>
                    ) : (
                      <T.P className="bg-gray-100 dark:bg-slate-400/20 px-4 py-2 rounded-lg text-gray-900 text-sm dark:text-slate-100">
                        Contact your administrator to upgrade plan
                      </T.P>
                    )}
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export async function OrganizationSubscripionDetails({
  organizationId,
  organizationRole,
  normalizedSubscription,
}: {
  normalizedSubscription: NormalizedSubscription;
  organizationId: string;
  organizationRole: Enum<'organization_member_role'>;
}) {
  const isOrganizationAdmin =
    organizationRole === 'admin' || organizationRole === 'owner';

  const subscriptionDetails = formatNormalizedSubscription(
    normalizedSubscription,
  );

  if (
    !subscriptionDetails.title ||
    normalizedSubscription.type === 'no-subscription'
  ) {
    return (
      <>
        <PageHeading
          title="Subscription"
          subTitle="This organization doesn't have any plan at the moment"
        />
        <ChoosePricingTable
          organizationId={organizationId}
          isOrganizationAdmin={isOrganizationAdmin}
        />
      </>
    );
  }

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <T.H3 className="text-gray-900 dark:text-slate-100">Subscription</T.H3>
        <T.P className="text-muted-foreground">
          You are currently on the{' '}
          <span className="text-blue-500 dark:text-blue-400">
            {subscriptionDetails.title}{' '}
            <span>{subscriptionDetails.sidenote}</span>
          </span>
          .{' '}
        </T.P>
        <T.Subtle>{subscriptionDetails.description}</T.Subtle>
      </div>
      {isOrganizationAdmin ? (
        <ManageSubscriptionButton organizationId={organizationId} />
      ) : (
        <T.P className="bg-gray-100 dark:bg-slate-400/20 px-4 py-2 rounded-lg text-gray-900 text-sm dark:text-slate-100">
          Contact your administrator to upgrade plan.
        </T.P>
      )}
    </div>
  );
}
