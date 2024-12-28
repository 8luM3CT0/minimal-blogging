import {MeiliSearch} from 'meilisearch'

function getMSClient(){
    const host = 'https://https://ms-f7385f37fa20-3740.sfo.meilisearch.io';
    const  apiKey = '90cfa7394bf3c968b8d66f6868817717c6f6f33a'

    if(!host){
        throw new Error('Host not defined')
    }

    return new MeiliSearch({host, apiKey});
}

export default getMSClient;

