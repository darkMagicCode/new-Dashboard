import BreadCrumb from '@/components/breadcrumb';
import { ProductForm } from '@/components/forms/product-form';
import React from 'react';

export default function Page() {
  const breadcrumbItems = [
    { title: 'cars', link: '/dashboard/cars' },
    { title: 'Create', link: '/dashboard/cars/create' }
  ];
  return (
    <div className="">
      <BreadCrumb items={breadcrumbItems} />
      <ProductForm
     
        initialData={null}
        key={null}
      />
    </div>
  );
}
