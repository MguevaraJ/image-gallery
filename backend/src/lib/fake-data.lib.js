const faker = require("faker");
const axios = require("axios");

const BASE_URL = "http://localhost:5500/api";

axios({
    method: "post",
    url: `${BASE_URL}/users/register`,
    data: {
        username: faker.name.firstName(),
        email: faker.internet.email(),
        password: "123456789"
    }
})
    .then(response => {
        const token = response.data.data.token;
        console.log(token);

        axios({
            method: "post",
            url: `${BASE_URL}/pictures/create`,
            data: {
                title: faker.lorem.words(2),
                description: faker.lorem.words(8),
                url: faker.image.imageUrl(),
                private: faker.random.boolean()
            },
            headers: {
                Authorization: token
            }
        })
            .then(response => console.log(response.data))
            .catch(error => console.log(error.response.data.message));
    })
    .catch(error => console.log(error));
