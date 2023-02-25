import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Checkbox, FormControlLabel, TextField } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

const FormSchema = z.object({
  username: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
  accept: z.literal(true),
});

type FormSchemaType = z.infer<typeof FormSchema>;

type FormSchemaFields = keyof FormSchemaType;

export default function Home() {
  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  });

  const triggerValidation = (field: FormSchemaFields) => {
    trigger(field);
  };

  const onSubmit: SubmitHandler<FormSchemaType> = (data) => {
    console.log(data);
    alert(JSON.stringify(data));
  };

  return (
    <div className='form-container'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        onChange={() => console.log(errors)}>
        <div className='form-control-group'>
          <h1>Sign up</h1>
        </div>
        <div className='form-control-group'>
          <TextField
            id='outlined-basic'
            label='Username'
            variant='outlined'
            className='input-container'
            {...register('username')}
            onBlur={() => triggerValidation('username')}
            error={errors.username !== undefined}
            helperText={errors?.username?.message}
          />
          <TextField
            id='outlined-basic'
            label='Email'
            variant='outlined'
            className='input-container'
            {...register('email')}
            onBlur={() => triggerValidation('email')}
            error={errors.email !== undefined}
            helperText={errors?.email?.message}
          />
        </div>
        <div className='form-control-group'>
          <TextField
            id='outlined-basic'
            label='Password'
            variant='outlined'
            className='input-container'
            {...register('password')}
            onBlur={() => triggerValidation('password')}
            error={errors.password !== undefined}
            helperText={errors?.password?.message}
          />
          <TextField
            id='outlined-basic'
            label='Confirm Password'
            variant='outlined'
            className='input-container'
            {...register('confirmPassword')}
            onBlur={() => triggerValidation('confirmPassword')}
            error={errors.confirmPassword !== undefined}
            helperText={errors?.confirmPassword?.message}
          />
        </div>
        <div className='form-control-group'>
          <FormControlLabel
            control={<Checkbox />}
            label='I accept the Terms of Service'
            {...register('accept')}
          />
        </div>
        {/* <pre>{JSON.stringify(watch(), null, 2)}</pre> */}
        <div className='form-control-group'>
          <Button
            variant='contained'
            size='large'
            type='submit'>
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}
