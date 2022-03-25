import * as fs from "fs-extra";



import {buildSchema} from "graphql";

export async function schemaFromFile() {

    const schemaString = await fs.readFile(`${__dirname}/CurrentTime.graphql`, 'utf-8')

    return  buildSchema(schemaString);


}

export const rootValueForFile = {
    currentTime: () => {
        const isoString = new Date().toISOString();
        return isoString.slice(11, 19);
    }
}
