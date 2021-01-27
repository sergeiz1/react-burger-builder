import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-ffaac-default-rtdb.europe-west1.firebasedatabase.app/'
});

export default instance;
