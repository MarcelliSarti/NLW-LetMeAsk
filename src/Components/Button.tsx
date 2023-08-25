//classe do proprio HTML com todos os atributos de botões
import { ButtonHTMLAttributes } from 'react'
import 'C:/NLW/letmeask/src/styles/button.scss'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutLined?: Boolean
}

//qualquer botão que eu declare entrará aqui com as propiedades escolhidas
//criou um componente Button
//tudo que nao for outlined ficará dentro do props
export function Button({ isOutLined = false, ...props }: ButtonProps) {
  return (
    <button className={`button ${isOutLined ? 'outLined' : ''}`} {...props} />
  );
}