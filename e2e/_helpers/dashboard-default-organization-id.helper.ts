import { SLUG_PATTERN } from "@/constants";
import type { Page } from "@playwright/test";

export async function dashboardDefaultOrganizationIdHelper({
	page,
}: {
	page: Page;
}): Promise<string> {
	await page.goto("/dashboard");

	let organizationId: string | undefined;
	await page.waitForURL((url) => {
		const match = url.toString().match(SLUG_PATTERN);
		if (match) {
			organizationId = match[1];
			return true;
		}
		return false;
	});

	if (!organizationId) {
		throw new Error(`Organization slug doesn't exist`);
	}
	return organizationId;
}
