import { useEffect, type FC, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { encode } from 'js-base64';

import { useGameStore } from './store';
import words from './words.json';

const word = words[Math.floor(Math.random() * words.length)].value;

const Links: FC = () => {
  const navigate = useNavigate();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const players = useGameStore(store => store.players).map(({ name, role }) => ({
    name,
    url: window.location.origin + '/player/' + encode(JSON.stringify({ name, role, word }), true),
  }));

  const handleCopy = () => {
    textareaRef.current?.select();
    document.execCommand('copy');
  };

  const handlePlay = () => {
    navigate('/game/' + encode(word, true));
  };

  useEffect(() => {
    if (players?.length < 4) {
      navigate('/');
    }
  }, [players, navigate]);

  return (
    <div className="bg-white">
      <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Инсайдер</h1>
          <p className="mx-auto mt-6 text-lg leading-8 text-gray-600">
            Скопируйте ссылки и отправьте их игрокам. <br /> Перейдя по ней, каждый из них узнает
            свою роль и цель на игру. <br />
            Когда все будут готовы, нажмите "Играть", чтобы начать игру.
          </p>

          <div className="mx-auto mt-10">
            <label htmlFor="players" className="sr-only">
              Ссылки игроков
            </label>
            <div className="mt-2">
              <textarea
                ref={textareaRef}
                rows={10}
                id="players"
                value={players.map(p => `${p.name} – ${p.url}`).join('\n')}
                readOnly
                className="block w-full rounded-md text-lg border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
              />
            </div>
          </div>

          <div className="mt-10 flex items-center justify-center gap-x-6">
            <button
              onClick={handleCopy}
              className="rounded-md bg-white px-3.5 py-2.5 font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
            >
              Копировать
            </button>
            <button
              onClick={handlePlay}
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-base font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-60"
            >
              Играть
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Links;
