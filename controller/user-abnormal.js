const dotenv = require('dotenv')
dotenv.config();
const {Client} = require('@elastic/elasticsearch');
const client = new Client({node: `http://${process.env.DB_HOST}:9200`});


const getUserAbnormal = async (req, res) => {
    const value = req.body
    const { body } = await client.search({
      index: 'sccd', 
      type: 'user_abnormal',
      body: {
        query: { 
          bool: { 
            must: [ 
              { term: 
                { 
                "bras_id.keyword": value.bras_id
                }
              },
              {
                range: { 
                date_time: 
                  { 
                  "gte": value.startDate,
                  "lte": value.endDate
                  }
                }
              } 
            ]
          }
        },
        size: 50000
      }
    });
    const userAbnormal = body.hits.hits
    const userAbnormalObj = {};
    for (const userAbnormalQuery of userAbnormal) {
      userAbnormalObj[userAbnormalQuery._source.date_time] = userAbnormalQuery
    }

    const bodyUserRecovery = await client.search({
        index: 'sccd',
        type: 'user_recovery',
        body: {
          query: { 
            bool: { 
              must: [ 
                { term: 
                  { 
                  "bras_id.keyword": value.bras_id
                  }
                },
                {
                  range: { 
                  date_time: 
                    { 
                    "gte": value.startDate,
                    "lte": value.endDate
                    }
                  }
                } 
              ]
            }
          },
          size: 50000
        }
    });
    const userRecovery = bodyUserRecovery.body.hits.hits
    for (const userRecoveryQuery of userRecovery) {
        const dateTime = userRecoveryQuery._source.date_time;
        const checkDateTime = userAbnormalObj.hasOwnProperty(dateTime);
        if (checkDateTime) {
          if (userAbnormalObj[dateTime]._source.percentage && userAbnormalObj[dateTime]._source.percentage < userRecoveryQuery._source.percentage) {
            userAbnormalObj[dateTime]._source.percentage = userRecoveryQuery._source.percentage
          } else if (userAbnormalObj[dateTime]._source.percentage && userAbnormalObj[dateTime]._source.percentage > userRecoveryQuery._source.percentage) {
            userAbnormalObj[dateTime]._source.percentage
          } else {
            userAbnormalObj[dateTime]._source.percentage = userRecoveryQuery._source.percentage
          }
        }
    }
    res.json({
      status: 200,
      data: userAbnormalObj
    });
}

module.exports = {
    getUserAbnormal,
}