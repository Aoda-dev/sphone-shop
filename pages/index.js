import Image from 'next/image';
import { Inter } from 'next/font/google';
import { useState } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function Home(props) {
  const [active, setActive] = useState();

  const { data } = props;

  return (
    <main>
      <header className="bg-black text-white space-x-16 p-10 flex items-center justify-center">
        <a>Главная</a>
        <a>Магазин</a>
        <a>Корзина</a>
      </header>
      <main className="mt-14 max-w-5xl grid grid-cols-2 mx-auto">
        {data.map((item) => (
          <div
            onClick={() => setActive(item)}
            key={item._id}
            className="flex hover:scale-[1.1] transition-transform cursor-pointer items-center justify-center flex-col space-y-3"
          >
            <Image src={item.img} width={300} height={200} alt={item.name} />
            <span className="font-semibold">{item.name}</span>
            <span className="font-semibold">{item.price}$</span>
          </div>
        ))}
      </main>

      <div
        onClick={() => {
          setActive(null);
        }}
        className={`fixed top-0 left-0 w-screen h-screen overflow-y-auto ${
          !active && '-z-10'
        }`}
      >
        <div
          className={`fixed flex items-center flex-col ${
            active ? '-translate-x-0' : '-translate-x-full'
          } left-0 top-0 transition-transform w-[70%] min-h-full bg-zinc-200/50 backdrop-blur-md duration-350 text-black`}
        >
          {active && (
            <div className="space-y-6 pt-10 max-w-2xl">
              <Image
                src={active.img}
                alt={active.name}
                width={350}
                height={500}
              />

              <div className="space-y-3 flex flex-col">
                <span className="text-lg inline-block">{active.name}</span>
                <span className="inline-block">{active.text}</span>

                <button className="bg-black text-white p-2">Купить</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export const getServerSideProps = async () => {
  const env =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : 'https://sphone-shop.vercel.app';

  const res = await fetch(`${env}/api/get`, {
    method: 'GET',
  });

  const data = await res.json();

  return {
    props: {
      data,
    },
  };
};
