import { ReactNode } from 'react';
import cx from 'classnames';
import '../styles/question.scss';

type QuestionProps = {
  content: string,
  author: {
    nome: string,
    avatar: string,
  };
  children?: ReactNode,
  isHighligthed?: boolean,
  isAnswered?: boolean
}

export function Question({
  content, author, isAnswered = false, isHighligthed = false, children
}: QuestionProps) {
  return (
    <div
      className={cx(
        'question',
        { answered: isAnswered }, //so vai atribuir a classe se ela for true
        { highligthed: isHighligthed && !isAnswered },
      )}>
      < p > {content} </p >
      <footer>
        <div className="user-info">
          <img src={author.avatar} alt={author.nome} />
          <span> {author.nome} </span>
        </div>
        <div>
          {children}
        </div>
      </footer>
    </div >
  )
}