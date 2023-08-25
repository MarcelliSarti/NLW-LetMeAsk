import { useEffect, useState } from 'react';
import { database } from '../services/firebase';
import { useAuth } from './useAuth';

type QuestionType = {
  id: string;
  author: {
    nome: string;
    avatar: string;
  }
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
  likeCount: number,
  likeId: string | undefined,
}

type FirebaseQuestions = Record<string, {
  author: {
    nome: string;
    avatar: string;
  }
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
  likes: Record<string, {
    authorId: string;
  }>;
}>

export function useRoom(roomId: string) {
  const { user } = useAuth();
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    const RoomRef = database.ref(`rooms/${roomId}`);

    //puxar todos os valores do roomId
    RoomRef.on('value', room => {
      const databaseRoom = room.val();
      const FirebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};

      const parsedQuestions = Object.entries(FirebaseQuestions).map(([key, value]) => {
        return {
          id: key,
          content: value.content,
          author: value.author,
          isHighlighted: value.isHighlighted,
          isAnswered: value.isAnswered,
          likeCount: Object.values(value.likes ?? {}).length,
          //verifica se já foi dado o like
          likeId: Object.entries(value.likes ?? {}).find(([key, like]) => like.authorId === user?.id)?.[0],

        }
      })
      setTitle(databaseRoom.title);
      setQuestions(parsedQuestions)
    })

    return () => {
      RoomRef.off('value');
    }
  }, [roomId, user?.id]); //executará toda vez que o id ou usuario mudar

  return ({ questions, title });
}