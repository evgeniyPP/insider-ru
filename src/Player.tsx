import { useEffect, type FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { decode } from 'js-base64';

import { type Player } from './types';

const roleLabels = {
  common: 'Задающий',
  inside: 'Инсайдер',
  master: 'Отвечающий',
};

const Player: FC = () => {
  const { base64 } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!base64) {
      navigate('/');
    }
  }, [base64, navigate]);

  if (!base64) {
    return null;
  }

  const { name, role, word } = JSON.parse(decode(base64)) as Player;
  const roleLabel = roleLabels[role];

  return (
    <div className="bg-white">
      <div className="flex justify-center items-center h-screen px-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {name}, ты – {roleLabel}!
          </h1>
          {role === 'common' && (
            <>
              <p className="mx-auto mt-6 text-lg leading-8 text-gray-600">
                Ты не знаешь слово. Твоя задача – его разгадать.
                <br /> Задавай вопросы отвечающему. Он может отвечать только "да", "нет" или "не
                знаю".
                <br />
                Также не забывай следить за другими игроками. Один из них – Инсайдер. Тебе надо
                будет его вычислить!
              </p>
              <p className="mx-auto mt-6 text-lg leading-8 text-gray-600">
                Если слово не отгадают, проиграют все, включая тебя. <br /> Если слово отгадают, но
                Инсайдера не вычислят, то выиграет Инсайдер. <br /> Если слово отгадают и Инсайдера
                вычислять, все выиграют, кроме Инсайдера!
              </p>
            </>
          )}
          {role === 'inside' && (
            <>
              <p className="mx-auto mt-6 text-lg leading-8 text-gray-600">
                Ты знаешь слово. Это слово{' '}
                <span className="uppercase font-bold text-red-600">"{word}"</span>. Твоя задача –
                подсказать его другим, не выдав себя.
                <br /> Задавай вопросы отвечающему. Он может отвечать только "да", "нет" или "не
                знаю".
              </p>
              <p className="mx-auto mt-6 text-lg leading-8 text-gray-600">
                Если слово не отгадают, проиграют все, включая тебя. <br /> Если слово отгадают, но
                тебя вычислят, то выиграют все, кроме тебя. <br /> Если слово отгадают, но тебя не
                вычислить, все проиграют, а ты выиграешь!
              </p>
            </>
          )}
          {role === 'master' && (
            <>
              <p className="mx-auto mt-6 text-lg leading-8 text-gray-600">
                Ты знаешь слово. Это слово{' '}
                <span className="uppercase font-bold text-red-600">"{word}"</span>. Твоя задача –
                подсказать его другим.
                <br /> Раскрой себя другим игрокам. Тебе будут задавать вопросы. Ты можешь отвечать
                только "да", "нет" или "не знаю".
              </p>
              <p className="mx-auto mt-6 text-lg leading-8 text-gray-600">
                Если слово не отгадают, проиграют все, включая тебя. <br /> Если слово отгадают, но
                Инсайдера не вычислят, то выиграет Инсайдер. <br /> Если слово отгадают и Инсайдера
                вычислять, все выиграют, кроме Инсайдера!
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Player;
