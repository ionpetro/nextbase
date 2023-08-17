import Select from 'react-select';

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
}) => <Select value={value} onChange={onChange} options={users} />;
