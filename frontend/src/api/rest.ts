import urls from './urls.ts';

export const fgetHelloWorld = async (): Promise<string> => {
    const res = await fetch(urls.rest);
    const { message } = await res.json();
    return message;
}