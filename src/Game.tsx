import { useState, useEffect, type FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { decode } from 'js-base64';

const TOTAL_TIME = +(import.meta.env.VITE_TOTAL_TIME ?? 60);

const Game: FC = () => {
  const { base64 } = useParams();
  const navigate = useNavigate();

  const [status, setStatus] = useState<
    'preparation' | 'guess-word' | 'find-insider' | 'voting' | 'timeout'
  >('preparation');
  const [time, setTime] = useState(TOTAL_TIME);
  const [tid, setTid] = useState<number>();

  useEffect(() => {
    if (!base64) {
      navigate('/');
    }
  }, [base64, navigate]);

  if (!base64) {
    return null;
  }

  const word = decode(base64);

  return (
    <div className="bg-white">
      <div className="flex justify-center items-center h-screen px-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          {status === 'preparation' && (
            <>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Инсайдер – Подготовка 👂
              </h1>
              <p className="mx-auto mt-6 text-lg leading-8 text-gray-600">
                У команды есть {TOTAL_TIME} секунд, чтобы отгадать слово. <br />
                Потом {TOTAL_TIME}-X секунд, чтобы обсудить, кто инсайдер (где X – время, за которое
                отгадали слово).
                <br /> Потом все голосуют за одного из игроков. Выбранный игрок раскрывает себя.
                <br />
                Если он Инсайдер, команда выигрывает! Если нет, выигрывает Инсайдер!
              </p>

              <div className="mt-10 flex items-center justify-center gap-x-6">
                <button
                  onClick={() => {
                    setStatus('guess-word');
                    setTid(
                      setInterval(
                        () =>
                          setTime(t => {
                            if (t === 1) {
                              clearInterval(tid);
                              setStatus('timeout');
                            }

                            return t > 0 ? t - 1 : 0;
                          }),
                        1000
                      )
                    );
                  }}
                  className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-base font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-60"
                >
                  Запустить таймер
                </button>
              </div>
            </>
          )}
          {status === 'guess-word' && (
            <>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Инсайдер – Угадывание слова 👀
              </h1>
              <p className="mx-auto mt-20 text-9xl">{time}</p>

              <div className="mt-20 flex items-center justify-center gap-x-6">
                <button
                  onClick={() => {
                    setStatus('find-insider');
                    clearInterval(tid);
                    setTime(TOTAL_TIME - time);
                    setTid(
                      setInterval(
                        () =>
                          setTime(t => {
                            if (t === 1) {
                              clearInterval(tid);
                              setStatus('voting');
                            }

                            return t > 0 ? t - 1 : 0;
                          }),
                        1000
                      )
                    );
                  }}
                  className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-base font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-60"
                >
                  Слово угадано!
                </button>
              </div>
            </>
          )}
          {status === 'find-insider' && (
            <>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Инсайдер – Поиск инсайдера 🕵️‍♂️
              </h1>
              <p className="mx-auto mt-20 text-9xl">{time}</p>

              <div className="mt-20 flex items-center justify-center gap-x-6">
                <button
                  onClick={() => {
                    setStatus('voting');
                    clearInterval(tid);
                  }}
                  className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-base font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-60"
                >
                  Голосовать
                </button>
              </div>
            </>
          )}
          {status === 'voting' && (
            <>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Инсайдер – Голосование 🙋‍♂️
              </h1>
              <p className="mx-auto mt-6 text-lg leading-8 text-gray-600">
                Проголосуйте за одного из игроков.
                <br />
                Если он Инсайдер, команда выигрывает! Если нет, выигрывает Инсайдер!
              </p>
            </>
          )}
          {status === 'timeout' && (
            <>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Инсайдер – Время вышло 😭
              </h1>
              <p className="mx-auto mt-6 text-lg leading-8 text-gray-600">
                К сожалению, время вышло. Вы не успели угадать слово. Это было слово{' '}
                <span className="uppercase font-bold text-red-600">"{word}"</span>.
                <br />
                Все проиграли.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Game;
