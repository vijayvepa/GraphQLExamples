import {Queries} from './sqls';
import PostgresClient from "./PostgresClient";

const PostgresApiWrapper = async () => {
     const {connectionPool} = await PostgresClient();
    const postgresQuery = (text, params = {}) =>
        connectionPool.query(text, Object.values(params));

    return {
        taskMainList: async () => {
            const response = await postgresQuery(Queries.tasksLatest);
            return response.rows;
        },
        userInfo: async (userId) => {
            const pgResp = await postgresQuery(Queries.usersFromIds, {$1: [userId]});
            return pgResp.rows[0];
        },
    };
};

export default PostgresApiWrapper;
