import { Input } from 'antd';

export type InputFieldUIProps = { placeholder: string };

export default function InputFieldUI({ placeholder }: InputFieldUIProps) {
  return <Input placeholder={placeholder} />;
}
