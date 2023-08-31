import Select from 'react-select';
import { Label } from '@/components/ui/Label';

type Option = {
  value: string;
  label: string;
};

export const OrganizationUsersSelect = ({
  users,
  value,
  onChange,
}: {
  users: Array<Option>;
  value?: Option;
  onChange: (value: Option) => void;
}) => (
  <div>
    <Label className="text-muted-foreground">Select user</Label>
    <Select
      value={value}
      onChange={onChange}
      options={users}
      className="mt-1"
    />
  </div>
);
