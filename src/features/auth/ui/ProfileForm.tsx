import { FormProvider } from 'react-hook-form';

import { FormField } from './FormField';
import styles from './ProfileForm.module.scss';
import { useProfileForm } from '../form.hook';
import type { FormValues } from '../form.types';
import { formConfig } from '../form.utils';

interface ProfileFormProps {
  onSubmit: (data: FormValues) => void;
}

export const ProfileForm = ({ onSubmit }: ProfileFormProps) => {
  const { method, formStructure } = useProfileForm({ formConfig });

  return (
    <FormProvider {...method}>
      <form
        className={styles.profileForm}
        id='profile-form'
        onSubmit={method.handleSubmit(onSubmit)}
      >
        {formStructure.map(section => (
          <fieldset className={styles.formSection} key={section.title}>
            <legend>{section.title}</legend>
            {section.inputs.map(input => {
              return <FormField {...input} key={input.name} />;
            })}
          </fieldset>
        ))}
      </form>
    </FormProvider>
  );
};
