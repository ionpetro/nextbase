import { NextResponse, NextRequest } from 'next/server';
import { supabaseAdminRouteHandlerClient } from '@/supabase-clients/admin/supabaseAdminRouteHandlerClient';
import { ensureAppAdmin } from '@/utils/route-handlers/ensureAppAdmin';
import slugify from 'slugify';
import { v4 } from 'uuid';
import { withErrorHandler } from '@/utils/route-handlers/withErrorHandler';
import { supabaseAdminClient } from '@/supabase-clients/admin/supabaseAdminClient';

export async function POST(request: NextRequest) {
  await ensureAppAdmin();
  const data = await request.formData();
  const body = Object.fromEntries(data);
  if ('file' in body && body.file instanceof File) {
    const { file } = body;

    const blogImagePath = `/assets/${file.name}`;

    const { data: uploadData, error } = await supabaseAdminClient.storage
      .from('admin-blog')
      .upload(blogImagePath, file, {
        upsert: false,
      });

    if (error) {
      console.log(error);
      throw new Error(error.message);
    }
    const { data } = supabaseAdminClient.storage
      .from('admin-blog')
      .getPublicUrl(uploadData.path);
    return new Response(JSON.stringify(data), { status: 200 });
  } else {
    throw new Error('No file was provided');
  }
}
