const URL = 'https://newsapi.org/v2/';
// const URL = 'http://localhost:3000/api/';

const fetchRequest = async (optionWay, {
  method = 'GET',
  callback,
  body,
  headers,
}) => {
  try {
    const options = {
      method,
    };

    if (body) options.body = JSON.stringify(body);
    if (headers) options.headers = headers;

    console.log(`${URL}${optionWay}`);

    const response = await fetch(`${URL}${optionWay}`, options);

    if (response.ok) {
      const data = await response.json();
      console.log('fetchRequest', data);
      if (callback) return callback(null, data, optionWay);
      return;
    }

    throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
  } catch (err) {
    return callback(err);
  }
};

export default fetchRequest;