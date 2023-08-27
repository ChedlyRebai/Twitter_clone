import axios from 'axios';

const fetcher = async (url: string) => {
  const res = await axios.get(url);
    return res;
};

const poster = async (url: string, data: any) => {
  const res = await axios.post(url, data);
    return res;
};

const deleter = async (url: string) => {
  const res = await axios.delete(url);
    return res;
};

const updater = async (url: string, data: any) => {
  const res = await axios.put(url, data);
    return res;
};

export { fetcher, poster, deleter, updater };
