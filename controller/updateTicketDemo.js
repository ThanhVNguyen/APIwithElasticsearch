const dotenv = require('dotenv')
dotenv.config();
const {Client} = require('@elastic/elasticsearch');
const client = new Client({node: `http://${process.env.DB_HOST}:9200`});

const demo = async (req, res) => {
  const code = req.body.Code;

  const newData = [
    {
        "year" : 2020,
        "status": 'new, you can buy it',
        "color": "yellow",
        "Buy": '5/1/2021'
    }
  ]
   const key = Object.keys(newData[0]) 
   let data = []
   for(let i = 0; i < key.length; i++){
        data.push(`ctx._source.${key[i]} = params.${key[i]};`)
   }
   const dataSource = data.join(" ");
  await client.updateByQuery({
    index: 'verhicles',
    refresh: true,
    body: {
      script: {
        lang: 'painless',
        source: dataSource,
        params: newData[0]
      }, 
      query: {
        match: {
          Code: code,
        },
      },
    },
  });
    const {body} = await client.search({
    index: 'verhicles',
    body: {
      query: {
        match: {
          Code: code
        }
      }
    },
  });
  res.json({
    data: body.hits.hits,
  });
};
module.exports = {
  demo,
};
