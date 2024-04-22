'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

type inputs = {
  subdomain: string;
  type: string;
  value: string;
  TTL: string;
  priority: string;
};

const domainsSchema = z.object({
  subdomain: z.string(),
  type: z.string(),
  value: z.string(),
  TTL: z.string(),
  priority: z.string(),
});

export const ConfigureDomainsForm = () => {
  const { register, handleSubmit, control, watch } = useForm<inputs>({
    resolver: zodResolver(domainsSchema),
  });

  return (
    <Card className="p-8 grid grid-cols-4">
      <form action="" className="col-span-3 grid grid-cols-3 gap-6">
        <div className="">
          <Label htmlFor="subdomain">Name</Label>
          <Input
            id="subdomain"
            type="text"
            placeholder="subdomain"
            {...register('subdomain')}
          />
        </div>

        <div>
          <Label htmlFor="type">Type</Label>
          <Controller
            control={control}
            name="type"
            render={({ field }) => {
              return (
                <Select onValueChange={field.onChange} {...field}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a label" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="Label 1">Label 1</SelectItem>
                      <SelectItem value="Label 2">Label 2</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              );
            }}
          />
        </div>

        <div>
          <Label htmlFor="value">Value</Label>
          <Input
            id="value"
            type="text"
            placeholder="76.76.21.21"
            {...register('value')}
          />
        </div>

        <div>
          <Label htmlFor="TTL">TTL</Label>
          <Input id="TTL" type="text" placeholder="60" {...register('TTL')} />
        </div>

        <div>
          <Label htmlFor="priority">Priority</Label>
          <Input id="priority" type="text" {...register('priority')} />
        </div>
      </form>
    </Card>
  );
};
