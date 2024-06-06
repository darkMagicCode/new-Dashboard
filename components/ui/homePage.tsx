'use client';
import { useEffect, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@radix-ui/react-dropdown-menu';
import { Button } from '@/components/ui/button';
import { CaretSortIcon, DotsHorizontalIcon } from '@radix-ui/react-icons';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Checkbox } from '@radix-ui/react-checkbox';
import { DynamicTable } from '@/components/ui/DynamicTable';
import { toast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import ImageFallback from './ImageFallback';
import { Avatar, Image } from '@radix-ui/react-avatar';

export default function HomePage({ data , loading }: any) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<any>('name');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100);

  const router = useRouter();

  const handleAddToCart = (item: any) => {
    toast({
      variant: 'default',
      title: 'Added to cart',
      description: `${item.name} added to cart`
    });
  };
  const columns = [
    {
      accessorKey: 'name',
      header: ({ column }: any) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Name
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }: any) => (
        <div className="capitalize">{row.getValue('name')}</div>
      )
    },
    {
      accessorKey: 'description',
      header: ({ row, column }: any) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            description
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }: any) => (
        <div className="lowercase">
          {' '}
          <Avatar>
            <Image
              src={row.original.images[0]}
              alt="image"
              width={64}
              height={48}
              // fallback={''}
              className="rounded-md "
            />
          </Avatar>
        </div>
      )
    },

    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }: any) => {
        const payment = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <DotsHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
            style={{ zIndex: 9999 }}
              align="end"
              className="dark:bg-black-400 rounded-md bg-white p-3 text-black"
            >
              <DropdownMenuLabel className="mb-2">Actions</DropdownMenuLabel>
              <div className="flex flex-col gap-1">
                <Button
                  variant={'outline'}
                  className="mb-3"
                  onClick={() =>
                    router.push(`/dashboard/cars/${row.original._id}`)
                  }
                >
                  Edit
                </Button>
                {/* <Button
                  variant={'outline'}
                  className=""
                  onClick={() => handleAddToCart(row.original)}
                >
                  Delete
                </Button> */}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      }
    }
  ];
  const handleAction = (action: string, item: any) => {
    console.log(`Action: ${action}, Item:`, item);
  };

  return (
    <div className="lg:grid-cols-full grid grid-cols-1 gap-4 px-2 md:px-10">
      <div className="sm:col-span-1 lg:col-span-3">
        <DynamicTable data={data} columns={columns} loading={loading} onAction={handleAction} />
      </div>
    </div>
  );
}
