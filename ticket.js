const {Client} = require('@elastic/elasticsearch');
// const client = new Client({node: 'http://172.27.228.80:9200'});
// const client = new Client({node: 'http://172.27.131.232:9200'})

const updateTicket = async (req, res) => {
  const TicketId = req.body.TicketCode;
  const axios = require('axios');
  const data = JSON.stringify(
      {'url': 'http://ticketopsapi.fpt.vn/TicketMobile.svc/TicketInfo',
        'data': {
          'TicketID': TicketId,
      }});
  const config = {
    method: 'post',
    url: 'http://172.30.12.167:5680/api-ticket-isc',
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  };
  const newData = await axios(config)
      .then((response) => {
        return response.data.Result.Data;
      })
      .catch((error) => {
        console.log(error);
      });
  console.log(newData[0]);
   const key = Object.keys(newData[0]) 
   let dataUpdate = []
   for(let i = 0; i < key.length; i++){
        dataUpdate.push(`ctx._source.${key[i]} = params.${key[i]};`)
   }
  const dataSource = dataUpdate.join(" ");
  await client.updateByQuery({
    index: 'sccd',
    refresh: true,
    body: {
      script: {
        lang: 'painless',
        source: dataSource,
        params: newData[0]
      }, 
      query: {
        match: {
          TicketCode: TicketId,
        },
      },
    },
  });
  const {body} = await client.search({
    index: 'sccd',
    body: {
      query: {
        match: {
          TicketCode: TicketId
        }
      }
    },
  });
  res.json({
    data: body.hits.hits,
  });
};

const addFieldTicket = async(req, res) => {
  const value = req.body
  const {body} =await client.search({
    index: 'sccd',
    body: {
      sort: [
      {
      "@timestamp": {
         order: "desc"
      }
    }
  ],
  "size": value.size
    },
  });
      const dataTicket = body.hits.hits
      let newData = []
      for(element of dataTicket) {
          const date = element._source['@timestamp']
          const formatDate = new Date(date)
          newData.push(element._source)
          client.update({
            index: "sccd",
            type: "ticket",
            id: element._id,
            body: {
                // put the partial document under the `doc` key
                doc: {
                    StartedAt: formatDate
                }
            }
        })
      }
    res.json({
    data: newData,
    });
}
module.exports = {
  updateTicket,
  addFieldTicket
};
