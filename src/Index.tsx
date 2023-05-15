import { type FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { useGameStore, usePlayersStore } from './store';
import { type Player } from './types';

const Index: FC = () => {
  const navigate = useNavigate();

  const playersList = usePlayersStore(store => store.playersList);
  const setPlayersList = usePlayersStore(store => store.setPlayersList);
  const setPlayers = useGameStore(store => store.setPlayers);

  const handleStart = () => {
    const validPlayers = playersList.filter(p => p.trim());
    if (validPlayers.length < 4) {
      return;
    }

    const players: Player[] = validPlayers.map(p => ({ name: p, role: 'common' }));
    players[Math.floor(Math.random() * players.length)].role = 'master';

    const commonPlayers = players.filter(p => p.role === 'common');
    commonPlayers[Math.floor(Math.random() * commonPlayers.length)].role = 'inside';

    setPlayers(players);
    navigate('/links');
  };

  return (
    <div className="bg-white">
      <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Инсайдер</h1>
          <p className="mx-auto mt-6 text-lg leading-8 text-gray-600">
            Отгадайте слово, задавая вопросы Ведущему. Ведущий отвечает "да", "нет", "не знаю".
            <br /> Но будьте внимательны: среди вас есть Инсайдер.
            <br />
            Он знает слово и его задача – помочь вам угадать, не раскрыв себя.
          </p>

          <div className="max-w-[250px] mx-auto mt-10">
            <label htmlFor="players" className="sr-only">
              Игроки
            </label>
            <div className="mt-2">
              <textarea
                rows={10}
                id="players"
                value={playersList.join('\n')}
                onChange={e => {
                  setPlayersList(e.target.value.split(/\n/));
                }}
                placeholder="Введите имена игроков, по одному в ряд (минимум 4)"
                className="block w-full rounded-md text-lg border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
              />
            </div>
          </div>

          <div className="mt-10 flex items-center justify-center gap-x-6">
            <button
              onClick={handleStart}
              disabled={playersList.filter(p => p.trim()).length < 4}
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-base font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-60"
            >
              Начать
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
