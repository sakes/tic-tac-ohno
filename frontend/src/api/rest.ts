import urls from './urls.ts';

export const fgetHelloWorld = async (): Promise<string> => {
    const res = await fetch(urls.rest);
    const { message } = await res.json();
    return message;
}

export const fpostLogin = async (username: string): Promise<string> => {
    const url = urls.rest + '/login';
    const config = { 
        method: "POST",
        headers: { 'Content-Type': 'application/json' },        
        body: JSON.stringify({ username })
    };
    const res = await fetch(url, config);
    const { message } = await res.json();
    return message;
}