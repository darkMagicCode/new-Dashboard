import BreadCrumb from '@/components/breadcrumb';
import { ProductForm } from '@/components/forms/product-form';
import React from 'react';

export default function Page() {
  const breadcrumbItems = [
    { title: 'cars', link: '/dashboard/cars' },
    { title: 'Create', link: '/dashboard/cars/create' }
  ];
  return (
    <div className="flex-1 space-y-4 p-8">
      <BreadCrumb items={breadcrumbItems} />
      <ProductForm
     
        initialData={null}
        key={null}
      />
    </div>
  );
}
