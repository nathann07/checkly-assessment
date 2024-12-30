import fs from 'fs';
import { ApiCheck, AssertionBuilder } from 'checkly/constructs';
import { apiCheckGroup } from './api-group.check';

// Define a user
interface User {
  id: number;
  name: string;
  profile_url: string;
}

// Read and parse json file
const data = fs.readFileSync('./src/__checks__/users.json', 'utf-8');
const users: User[] = JSON.parse(data).users;

// Iterate through each user and create an API check
users.forEach((user: User) => {
  new ApiCheck(`api-check-user-${user.id}`, {
    name: `API Check for ${user.name}`,
    group: apiCheckGroup,
    degradedResponseTime: 10000,
    maxResponseTime: 20000,
    request: {
      url: user.profile_url,
      method: 'GET',
      followRedirects: true,
      skipSSL: false,
      headers: [
        {
          key: 'Authorization',
          value: 'Bearer {{ACCESS_TOKEN}}'
        }
      ],
      assertions: [
        AssertionBuilder.statusCode().equals(200),
        AssertionBuilder.jsonBody('id').equals(user.id),
        AssertionBuilder.jsonBody('name').equals(user.name),
      ],
    },
    runParallel: true,
  });
});
