insert into storage.buckets(id, name, public, file_size_limit) values ('changelog-assets', 'changelog-assets', true, 52428800);

create policy "Allow users to read their own assets and insert 1hnkgyk_0"
on "storage"."objects"
as permissive
for select
to public
using ((bucket_id = 'changelog-assets'::text));


create policy "Allow users to read their own assets and insert 1hnkgyk_1"
on "storage"."objects"
as permissive
for insert
to public
with check ((bucket_id = 'changelog-assets'::text));


create policy "Allow users to read their own assets and insert 1hnkgyk_2"
on "storage"."objects"
as permissive
for update
to public
using ((bucket_id = 'changelog-assets'::text));


create policy "allow users to delete their own  1hnkgyk_0"
on "storage"."objects"
as permissive
for delete
to public
using ((bucket_id = 'changelog-assets'::text));
