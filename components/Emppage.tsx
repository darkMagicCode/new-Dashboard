'use client';
import BreadCrumb from '@/components/breadcrumb';
import { columns } from '@/components/tables/employee-tables/columns';
import { EmployeeTable } from '@/components/tables/employee-tables/employee-table';
import { buttonVariants } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Employee } from '@/constants/data';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import HomePage from './ui/homePage';

const breadcrumbItems = [{ title: 'cars', link: '/dashboard/cars' }];

type paramsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

export default function Emppage() {
  // const page = Number(searchParams.page) || 1;
  // const pageLimit = Number(searchParams.limit) || 10;
  // const country = searchParams.search || null;
  // const offset = (page - 1) * pageLimit;

  const [data, setData] = useState([]);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    async function fetchData() {
      setloading(true)
      const res = await fetch(apiUrl || '');
      const result = await res.json();
      setData(result);
      setloading(false)
    }

    fetchData();
  }, []);

  // const employeeRes = await res.json();
  // const totalUsers = employeeRes.total_users; //1000
  // const pageCount = Math.ceil(totalUsers / pageLimit);
  // const employee: Employee[] = employeeRes.users;
  return (
    <>
      <div className="flex-1 space-y-4  p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />

        <div className="flex items-start justify-between">
          <Heading
            title={`Cars (${data?.length})`}
            description="Manage Cars"
          />

          <Link
            href={'/dashboard/cars/new'}
            className={cn(buttonVariants({ variant: 'default' }))}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Link>
        </div>
        <Separator />

        <HomePage data={data} loading={loading} />
      </div>
    </>
  );
}
