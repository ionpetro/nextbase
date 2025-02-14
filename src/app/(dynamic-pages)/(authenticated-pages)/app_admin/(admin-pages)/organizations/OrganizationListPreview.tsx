import {
  Table as ShadcnTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { format } from 'date-fns';
import { Mail } from 'lucide-react';
import Link from 'next/link';

export function OrganizationListPreview() {
  // Generate fake data
  const organizations = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    title: `Organization ${i + 1}`,
    created_at: new Date().toISOString(),
    team_members_count: Math.floor(Math.random() * 100),
    owner_full_name: `Owner ${i + 1}`,
    owner_email: `owner${i + 1}@example.com`,
  }));

  return (
    <div className="rounded-lg overflow-hidden border [&_a]:pointer-events-none">
      <ShadcnTable>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Team Member Count</TableHead>

            <TableHead>Owner Name</TableHead>

            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {organizations.map((organization) => (
            <TableRow key={organization.id}>
              <TableCell>{organization.title ?? '-'}</TableCell>
              <TableCell>
                {format(new Date(organization.created_at), 'PPpp')}
              </TableCell>
              <TableCell>{organization.team_members_count ?? '-'}</TableCell>
              <TableCell>{organization.owner_full_name}</TableCell>

              <TableCell>
                <span className="flex items-center space-x-2">
                  <Link
                    title="Send email"
                    href={`mailto:${organization.owner_email}`}
                    target="_blank"
                  >
                    <Mail className="w-5 h-5" />
                  </Link>
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </ShadcnTable>
    </div>
  );
}
