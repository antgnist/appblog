import { Input, Form, Button } from 'antd';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import styles from './index.module.scss';

export interface ArticleFormUIProps {
  action: (values: any) => void;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorStatus: [string, unknown][];
  initialArticle?: {
    title: string;
    description: string;
    text: string;
    tags?: {
      value: string;
    }[];
  };
}

export type AddArticleFormData = {
  title: string;
  description: string;
  text: string;
  tags: {
    value: string;
  }[];
};

export default function ArticleFormUI({
  action,
  isLoading,
  isError,
  isSuccess,
  errorStatus,
  initialArticle,
}: ArticleFormUIProps) {
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isValid },
  } = useForm<AddArticleFormData>({
    mode: 'onChange',
    defaultValues: {
      title: initialArticle?.title,
      description: initialArticle?.description,
      text: initialArticle?.text,
      tags: initialArticle?.tags,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tags',
  });

  return (
    <>
      {isError && (
        <div style={{ textAlign: 'center' }}>
          {errorStatus.map((elem) => {
            const elemStr = elem.join(': ');
            return (
              <div key={elemStr} style={{ color: 'var(--color-error)' }}>
                {elemStr}
              </div>
            );
          })}
        </div>
      )}

      <Form
        onFinish={handleSubmit(action)}
        style={{ display: 'flex', flexDirection: 'column', gap: '21px' }}
      >
        <div>
          <label htmlFor="title">Title</label>
          <Controller
            name="title"
            control={control}
            rules={{
              // required: 'This field is required',
              validate: (value) =>
                !!value?.trim().length || 'Title cannot be empty',
            }}
            render={({ field }) => (
              <Form.Item
                validateStatus={errors?.title ? 'error' : ''}
                help={errors?.title?.message}
              >
                <Input id="title" {...field} placeholder="Title" />
              </Form.Item>
            )}
          />
        </div>

        <div>
          <label htmlFor="description">Short description</label>
          <Controller
            name="description"
            control={control}
            rules={{
              // required: 'This field is required',
              validate: (value) =>
                !!value?.trim().length || 'Description cannot be empty',
            }}
            render={({ field }) => (
              <Form.Item
                validateStatus={errors?.description ? 'error' : ''}
                help={errors?.description?.message}
              >
                <Input id="description" {...field} placeholder="Description" />
              </Form.Item>
            )}
          />
        </div>

        <div>
          <label htmlFor="text">Text</label>
          <Controller
            name="text"
            control={control}
            rules={{
              // required: 'This field is required',
              validate: (value) =>
                !!value?.trim().length || 'Text cannot be empty',
            }}
            render={({ field }) => (
              <Form.Item
                validateStatus={errors?.text ? 'error' : ''}
                help={errors?.text?.message}
              >
                <Input.TextArea
                  id="text"
                  {...field}
                  rows={6}
                  maxLength={50000}
                  placeholder="Text"
                />
              </Form.Item>
            )}
          />
        </div>

        <div style={{ display: 'flex', gap: '18px', flexWrap: 'wrap' }}>
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: 5 }}
            className={styles.form__tags}
          >
            {fields.map((field, index) => (
              <div
                key={field.id}
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '18px',
                }}
              >
                <Controller
                  name={`tags.${index}.value`}
                  control={control}
                  rules={{
                    // required: 'Tag is required',
                    validate: (value) =>
                      !!value?.trim().length || 'Tag cannot be empty',
                  }}
                  defaultValue={field.value}
                  render={({ field: { value, onChange, ref } }) => (
                    <Form.Item
                      validateStatus={
                        errors?.tags?.[index]?.value ? 'error' : ''
                      }
                      // help={errors?.tags?.[index]?.value?.message}
                    >
                      <Input
                        value={value}
                        onChange={onChange}
                        ref={ref}
                        style={{ minWidth: '300px' }}
                      />
                    </Form.Item>
                  )}
                />
                <Button
                  onClick={() => remove(index)}
                  style={{
                    width: '136px',
                    color: 'var(--color-highlight)',
                    borderColor: 'var(--color-highlight)',
                  }}
                >
                  Delete
                </Button>
              </div>
            ))}
          </div>
          <Button
            onClick={() => append({ value: '' })}
            style={{
              alignSelf: 'flex-end',
              width: '136px',
              color: 'var(--color-info)',
              borderColor: 'var(--color-info)',
            }}
          >
            Add tag
          </Button>
        </div>
        <Button
          disabled={!isValid || isSubmitting || isSuccess}
          style={{ width: '319px' }}
          type="primary"
          htmlType="submit"
        >
          {isLoading
            ? 'Loading...'
            : (isSuccess && <span>Successfully</span>) || 'Send'}
        </Button>
      </Form>
    </>
  );
}
