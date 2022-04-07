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
        taskMainListWithView: async () => {
            const response = await postgresQuery(Queries.taskMainList);
            return response.rows;
        },
        userInfo: async (userId) => {
            console.log(`Getting usersFromIDs for userId: ${userId}` );
            const pgResp = await postgresQuery(Queries.usersFromIds, {$1: [userId]});
            return pgResp.rows[0];
        },
        approachList: async (taskId) => {
            const pgResp = await postgresQuery(Queries.approachesForTaskIds, {$1: [taskId]});
            return pgResp.rows;
        }
    };
};

export default PostgresApiWrapper;
