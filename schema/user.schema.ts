import {object, string, TypeOf } from 'zod'

const createUserSchema = object({
  body: object({
    firstname: string({
      required_error: "first name is required"
    }),
    lastname: string({
      required_error: "last name is required"
    }),
    password: string({
      required_error: "password is required"
    }).min(6, "password > 6 chars"),
    passwordConfirmation: string({
      required_error: "password confirmation is required"
    }),
    email: string({
      required_error: "email is required"
    }).email("not a valid email"),
  }).refine((data) => (data.password === data.passwordConfirmation), { 
    message: "passwords do not match",
    path: ['passwordConfirmation'],
  })
})

type CreateUserInput = TypeOf<typeof createUserSchema>['body'];

export { createUserSchema, CreateUserInput };