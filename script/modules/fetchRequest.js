const URL = 'https://newsapi.org/v2/';
// const URL = 'http://localhost:3000/api/';

const fetchRequest = async (optionWay, {
  method = 'GET',
  callback,
  body,
  headers,
  lang,
}) => {
  console.log('fetchRequest optionWay', optionWay);
  try {
    const options = {
      method,
    };

    if (body) options.body = JSON.stringify(body);
    if (headers) options.headers = headers;

    console.log('URL', `${URL}${optionWay}`);

    const response = await fetch(`${URL}${optionWay}`, optionWay, options);

    // console.log(response);

    if (response.ok) {
      console.log('data', response);
      const data = await response.json();
      console.log('fetchRequest', data);
      if (callback) return callback(null, data, optionWay, lang);
      return;
    }

    throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
  } catch (err) {
    return callback(err);
  }
};

export default fetchRequest;