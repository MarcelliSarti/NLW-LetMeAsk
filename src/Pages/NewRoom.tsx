import { Link, useHistory } from 'react-router-dom';
import { FormEvent, useState } from 'react';
import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import { Button } from '../Components/Button';
import '../styles/auth.scss';
import { database } from '../services/firebase';
import { useAuth } from '../hooks/useAuth';

export function NewRoom() {
  //para acessar e também para alterar os valores
  const { user } = useAuth();
  const history = useHistory();
  const [newRoom, setNweRoom] = useState('');

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();
    if (newRoom.trim() === '') {
      return;
    }
    //cria uma categoria/sessão dentro do BD
    const roomRef = database.ref('rooms');
    //jogando info pra dentro de roomRef
    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id
    })

    //quando criar uma sala já vai redirecionar para ela e key=id da sala
    history.push(`/rooms/${firebaseRoom.key}`)

  }

  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
        <strong> Crie salas de Q&amp;A ao-vivo </strong>
        <p> Tire as dúvidas de sua audiência em tempo real </p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="LetMeAsk" />
          <h2> Criar uma nova sala </h2>
          <form onSubmit={handleCreateRoom}>
            <input
              type='text'
              placeholder='Nome da sala'
              onChange={event => setNweRoom(event.target.value)}
              value={newRoom}
            />
            <Button type='submit'>
              Criar Sala
            </Button>
          </form>
          <p>
            Quer entrar em uma sala existente?
            <Link to="/"> Clique aqui </Link>
          </p>
        </div>
      </main>
    </div>
  )
}