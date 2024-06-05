'use client';

import * as z from 'zod';
import { useEffect, useMemo, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Trash } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { Heading } from '@/components/ui/heading';
import { useToast } from '../ui/use-toast';
import ImageUpload from '../ImageUpload';

const ImgSchema = z.object({
  fileName: z.string(),
  name: z.string(),
  fileSize: z.number(),
  size: z.number(),
  fileKey: z.string(),
  key: z.string(),
  fileUrl: z.string(),
  url: z.string()
});

export const IMG_MAX_LIMIT = 10;

const formSchema = z.object({
  name: z.string().min(3, { message: 'car Name must be at least 3 characters' })
  // images: z
  //   .array(ImgSchema)
  //   .max(IMG_MAX_LIMIT, { message: 'You can only add up to 10 images' })
  //   .min(1, { message: 'At least one image must be added.' })
});

type ProductFormValues = z.infer<typeof formSchema>;

interface ProductFormProps {
  initialData: any | null;
}

export const ProductForm: React.FC<ProductFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<any>([]);
  const [imgFiles, setImgFiles] = useState<any>([]);
  const isCreate = params.employeeId === 'new';
  console.log(params.employeeId);
  const apiUrl: any = process.env.NEXT_PUBLIC_API_URL;
  const [carData, setcarData] = useState<any>({
    name: '',
    images: []
  });

  const title = isCreate ? 'Create car' : 'Edit car';
  const description = isCreate ? 'Add a new car' : 'Edit a car';
  const toastMessage = isCreate ? 'car created.' : 'car updated.';
  const action = isCreate ? 'Create' : 'Save changes';

  const defaultValues = useMemo(() => {
    if (isCreate) {
      return { name: '', images: [] };
    } else {
      return { name: carData.name, images: carData.images };
    }
  }, [isCreate, carData]);
  console.log(defaultValues);

  const [currentDefaultValues, setCurrentDefaultValues] =
    useState(defaultValues);

  useEffect(() => {
    if (!isCreate) {
      form.setValue('name', defaultValues.name);
      setImages(defaultValues.images);
    }
  }, [defaultValues]);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: currentDefaultValues
  });
  console.log(form);

  const product = () => {
    fetch(`${apiUrl}/${params.employeeId}`)
      .then((res) => res.json())
      .then((data) => {
        setcarData(data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    if (!isCreate) {
      product();
    }
  }, []);

  const onSubmit = async (data: ProductFormValues) => {
    console.log(imgFiles);

    try {
      setLoading(true);

      // Append each file to the form data
      // imgFiles.forEach((file, index) => {
      //   formData.append(`images[${index}]`, file);
      // });

      // Create the request body as JSON
      const requestBody = {
        name: data.name,
        images: images // This should already be in base64 format
      };

      const requestOptions = {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
          'Content-Type': 'application/json'
        }
      };
      const requestOptions1 = {
        method: 'PUT',
        body: JSON.stringify(requestBody),
        headers: {
          'Content-Type': 'application/json'
        }
      };

      if (isCreate) {
        await fetch(apiUrl, requestOptions);
      } else {
        await fetch(`${apiUrl}/${params.employeeId}`, requestOptions1);
      }
      // router.refresh();
      // router.push(`/dashboard/products`);
      toast({ title: toastMessage });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with your request.'
      });
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      fetch(`${apiUrl}/${params.employeeId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      // router.refresh();
      router.push(`/employee`);
    } catch (error) {
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      {/* <AlertModal isOpen={open} onClose={() => setOpen(false)} onConfirm={onDelete} loading={loading} /> */}
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {!isCreate && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => onDelete()}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >
          <FormItem>
            <FormLabel>Images</FormLabel>
            <FormControl>
              <ImageUpload
                name="images"
                imgFiles={imgFiles}
                images={images}
                setImages={setImages}
                setImgFiles={setImgFiles}
              />
            </FormControl>
            <FormMessage />
          </FormItem>

          <div className="gap-8 md:grid md:grid-cols-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Product name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
