'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export function SearchUsersByEmail() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams ?? undefined);
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="max-w-xs flex-1">
      <label
        htmlFor="email"
        className="block text-sm font-medium text-gray-700 dark:text-gray-400"
      >
        Email
      </label>
      <div className="mt-1">
        <input
          type="email"
          name="email"
          id="email"
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
          defaultValue={searchParams?.get('query')?.toString() ?? ''}
          className="block px-3 py-2 appearance-none w-full rounded-md bg-gray-200/50 dark:bg-gray-700/50 h-10 shadow-sm text-gray-600"
          placeholder="Search users"
        />
      </div>
    </div>
  );
}
