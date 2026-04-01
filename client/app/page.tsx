export default function Home() {
    return (
        <div className="flex flex-col flex-1 items-center justify-center bg-zinc-80 font-sans dark:bg-black">
            <div className="border px-4 py-6 rounded-lg text-center space-y-4 border-zinc-200 dark:border-zinc-700 ">
                <h1 className="text-2xl font-bold ">Регистрация</h1>
                <div>
                    <input
                        placeholder="Имя"
                        className="border rounded-md py-1 px-3"
                        type="text"
                        name="name"
                        id="name"
                    />
                </div>
                <div>
                    <input
                        placeholder="Почта"
                        className="border rounded-md py-1 px-3"
                        type="text"
                        name="email"
                        id="email"
                    />
                </div>
                <div>
                    <input
                        placeholder="Пароль"
                        className="border rounded-md py-1 px-3"
                        type="password"
                        name="password"
                        id="password"
                    />
                </div>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Зарегистрироваться</button>
            </div>
        </div>
    );
}
