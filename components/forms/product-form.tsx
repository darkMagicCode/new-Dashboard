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
  // const [imgFiles, setImgFiles] = useState<any>([]);
  const isCreate = params.carId === 'new';
  console.log(params.carId);
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
      return { name: '' };
    } else {
      return { name: carData.name };
    }
  }, [isCreate, carData, images]);
  console.log(defaultValues);

  const [currentDefaultValues, setCurrentDefaultValues] =
    useState(defaultValues);

  useEffect(() => {
    if (!isCreate) {
      form.setValue('name', carData.name);
      // setImages(carData.images);
    }
  }, [defaultValues, carData, images]);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: currentDefaultValues
  });
  console.log(form);

  const product = () => {
    setLoading(true);
    fetch(`${apiUrl}/${params.carId}`)
      .then((res) => res.json())
      .then((data) => {
        setcarData(data);
        setImages(data.images);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  useEffect(() => {
    if (!isCreate) {
      product();
    }
  }, []);

  const onSubmit = async (data: ProductFormValues) => {
    // console.log(imgFiles);

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
        router.refresh();
        router.push(`/dashboard/cars`);
      } else {
        await fetch(`${apiUrl}/${params.carId}`, requestOptions1);
        router.refresh();
        router.push(`/dashboard/cars`);
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
      fetch(`${apiUrl}/${params.carId}`, {
        method: 'DELETE'
        // headers: {
        //   'Content-Type': 'application/json'
        // }
      });
      router.refresh();
      router.push(`/dashboard/cars`);
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
        {loading && (
          <div role="status">
            <svg
              aria-hidden="true"
              className="inline h-8 w-8 animate-spin fill-yellow-400 text-gray-200 dark:text-gray-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        )}
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
      <div>
        <div>Images</div>
        <div>
          <ImageUpload
            name="images"
            // imgFiles={imgFiles}
            images={images}
            setImages={setImages}
            // setImgFiles={setImgFiles}
          />
        </div>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >
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
