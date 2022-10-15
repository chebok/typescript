type IForm = {
  name: string;
  surname: string;
  password: string;
}

const form: IForm = {
  name: 'Abrams',
  surname: ' Abramov',
  password: '123',
}

type formValidate<T> = {
  [Property in keyof T]: { isValid: true} | { isValid: false, errorMessage: string}
}

const formValidation: formValidate<IForm> = {
  name: { isValid: true },
  surname: { isValid: true },
  password: {isValid: false, errorMessage: 'Должен быть длиннее 5 символов'}
}

