import { fetch_https } from "./fetch";

const api_url = process.env.NEXT_PUBLIC_API_URL;

const listUsers = async (since = 0, per_page = 10) => await fetch_https('GET', api_url, `/api/users?since=${since}&per_page=${per_page}`);
const userDetails = async username => await fetch_https('GET', api_url, `/api/users/${username}/details`);
const userRepos = async (username, page = 1, per_page = 10) => await fetch_https('GET', api_url, `/api/users/${username}/repos?per_page=${per_page}&page=${page}`);

export { listUsers, userDetails, userRepos };