import TableCell from '@/components/ui/Table/TableCell';
import TableHeader from '@/components/ui/Table/TableHeader';
import { Table } from '@/types';
import React from 'react';

function AuthorsList({
  authors,
}: {
  authors: Array<Table<'internal_blog_author_profiles'>>;
}) {
  return (
    <div className="space-y-4">
      <div className="space-y-2" style={{ overflowX: 'auto' }}>
        <table className="min-w-full shadow rounded-lg overflow-hidden">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="p-0">
                <TableHeader>#</TableHeader>
              </th>

              <th scope="col" className="p-0">
                <TableHeader>Name</TableHeader>
              </th>
              <th scope="col" className="p-0">
                <TableHeader>Bio</TableHeader>
              </th>
            </tr>
          </thead>
          <tbody>
            {authors.map((author, index) => (
              <tr key={author.user_id}>
                <td className="p-0">
                  <TableCell className="px-6 py-4 h-[90px] truncate">
                    {index + 1}
                  </TableCell>
                </td>

                <td className="p-0">
                  <TableCell className="px-6 py-4 h-[90px] truncate">
                    <div className="flex space-x-2 items-center">
                      <img
                        src={author.avatar_url}
                        alt={author.display_name}
                        className="w-10 h-10 rounded-full"
                      />

                      <span>{author.display_name}</span>
                    </div>
                  </TableCell>
                </td>
                <td className="p-0">
                  <TableCell className="px-6 py-4 h-[90px] truncate">
                    {author.bio}
                  </TableCell>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AuthorsList;
