"use client";
import { ProjectStatus } from '@/components/Projects/ProjectsCardList';
import { ProjectBadge } from '@/components/ui/badge-project';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { Tables } from '@/lib/database.types';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
} from '@tanstack/react-table';
import { format } from 'date-fns';
import { ChevronsUpDown } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

type Props = {
  projects: Tables<'projects'>[];
};

export function OrganizationProjectsTable({ projects }: Props) {

  const columns: ColumnDef<(typeof projects)[0]>[] = [
    {
      accessorKey: 'name',
      cell: ({ row }) => (
        <Link href={`/project/${row.getValue('id')}`} className='hover:underline'>
          {row.getValue('name')}
        </Link>
      ),
      header: ({ column }) => (
        <Button
          className="p-0 bg-transparent hover:bg-transparent"
          variant="ghost"
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === 'asc');
          }}
        >
          <div className="capitalize items-center flex gap-2">
            Project Name
            <ChevronsUpDown className="size-4" />
          </div>
        </Button>
      ),
    },
    {
      accessorKey: 'project_status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.getValue('project_status') as ProjectStatus
        return (
          <ProjectBadge variant={row.getValue('project_status')} className='min-w-32 items-center justify-center'>
            {ProjectStatus[status]}
          </ProjectBadge>
        )
      },
    },
    {
      accessorKey: 'created_at',
      cell: info => format(new Date(String(info.getValue())), 'dd MMMM yyyy')
      ,
      header: ({ column }) => (
        <Button
          className="p-0 bg-transparent hover:bg-transparent flex items-center"
          variant="ghost"
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === 'asc');
          }}
        >
          <div className="capitalize flex gap-2 items-center">
            Created On
            <ChevronsUpDown className="size-4" />
          </div>
        </Button>
      ),
      enableSorting: true,
    },
  ];

  const [sorting, setSorting] = useState<SortingState>([]);
  const table = useReactTable({
    data: projects,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
  });

  return (
    <div className="w-full">

      <div className="rounded-md border p-4 bg-background">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <TableHead key={header.id}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map(row => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div >
  );
}
