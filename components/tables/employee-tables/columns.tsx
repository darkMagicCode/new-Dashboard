'use client';
import { Checkbox } from '@/components/ui/checkbox';
import { Employee } from '@/constants/data';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';

export const columns: ColumnDef<any>[] = [
  // {
  //   id: 'select',
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={table.getIsAllPageRowsSelected()}
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false
  // },
  {
    accessorKey: 'images',
    header: 'IMAGE',
    cell: ({ row }: any) => (
      <div className="capitalize">
        <img src={row.getValue('images')[0]} width={50} height={50} />{' '}
      </div>
    )
  },
  {
    accessorKey: 'name',
    header: 'CAR MODAL',
    cell: ({ row }: any) => (
      <div className="capitalize">{row.getValue('name')} </div>
    )
  },
  {
    accessorKey: 'price',
    header: 'PRICEL'
  },
  // {
  //   accessorKey: 'job',
  //   header: 'COMPANY'
  // },
  // {
  //   accessorKey: 'gender',
  //   header: 'GENDER'
  // },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
