const dotenv = require('dotenv')
dotenv.config();
const {Client} = require('@elastic/elasticsearch');
const client = new Client({node: `http://${process.env.DB_HOST}:9200`});

const getGroupAlert = async (req, res) => {
    const { body } = await client.search({
      index: 'sccd', 
      type: 'group-alert-test',
      body: {
        query: { 
            terms: {
                "ticket_id.keyword": [
                    "SC1702210088",
                    "SC1702210092",
                    "SC1702210151",
                    "SC1702210321",
                    "SC1702210351",
                    "SC1702210380",
                    "SC1702210440",
                    "SC1802210016",
                    "SC1802210018",
                    "SC1802210020",
                    "SC1802210025",
                    "SC1802210095",
                    "SC1802210176",
                    "SC1802210379",
                    "SC1802210495",
                    "SC1802210546",
                    "SC1802210547",
                    "SC1802210588",
                    "SC1802210616",
                    "SC1902210013",
                    "SC1902210014",
                    "SC1902210017",
                    "SC1902210023",
                    "SC1902210044",
                    "SC1902210045",
                    "SC1902210069",
                    "SC1902210115",
                    "SC1902210140",
                    "SC1902210172",
                    "SC1902210313",
                    "SC1902210321",
                    "SC1902210422",
                    "SC1902210475",
                    "SC1902210479",
                    "SC1902210501",
                    "SC1902210578",
                    "SC1902210579",
                    "SC1902210712",
                    "SC2002210008",
                    "SC2002210019",
                    "SC2002210058",
                    "SC2002210157",
                    "SC2002210208",
                    "SC2002210266",
                    "SC2002210321",
                    "SC2002210358",
                    "SC2002210374",
                    "SC2002210405",
                    "SC2002210436",
                    "SC2002210452",
                    "SC2002210470",
                    "SC2102210040",
                    "SC2102210041",
                    "SC2102210042",
                    "SC2102210043",
                    "SC2102210046",
                    "SC2102210207",
                    "SC2102210343",
                    "SC2102210368",
                    "SC2102210369",
                    "SC2102210371",
                    "SC2102210378",
                    "SC2102210437",
                    "SC2102210440",
                    "SC2102210477",
                    "SC2102210478",
                    "SC2102210491",
                    "SC2102210492",
                    "SC2102210500",
                    "SC2102210543",
                    "SC2202210015",
                    "SC2202210044",
                    "SC2202210045",
                    "SC2202210049",
                    "SC2202210051",
                    "SC2202210109",
                    "SC2202210113",
                    "SC2202210128",
                    "SC2202210139",
                    "SC2202210150",
                    "SC2202210192",
                    "SC2202210227",
                    "SC2202210234",
                    "SC2202210385",
                    "SC2202210441",
                    "SC2202210452",
                    "SC2202210492",
                    "SC2202210522",
                    "SC2202210540",
                    "SC2202210673",
                    "SC2202210764",
                    "SC2202210785",
                    "SC2202210786",
                    "SC2302210015",
                    "SC2302210020",
                    "SC2302210022",
                    "SC2302210023",
                    "SC2302210024",
                    "SC2302210025",
                    "SC2302210026",
                    "SC2302210027",
                    "SC2302210029",
                    "SC2302210030",
                    "SC2302210031",
                    "SC2302210039",
                    "SC2302210065",
                    "SC2302210067",
                    "SC2302210071",
                    "SC2302210195",
                    "SC2302210197",
                    "SC2302210223",
                    "SC2302210224",
                    "SC2302210257",
                    "SC2302210258",
                    "SC2302210294",
                    "SC2302210297",
                    "SC2302210298",
                    "SC2302210299",
                    "SC2302210308",
                    "SC2302210349",
                    "SC2302210435",
                    "SC2302210436",
                    "SC2302210471",
                    "SC2302210513",
                    "SC2302210524",
                    "SC2302210525",
                    "SC2302210547",
                    "SC2302210567",
                    "SC2302210576",
                    "SC2302210595",
                    "SC2302210618",
                    "SC2302210635",
                    "SC2302210656",
                    "SC2302210687",
                    "SC2302210728",
                    "SC2302210734",
                    "SC2302210764",
                    "SC2302210783"
                ]
              }
        },
        size: 50000
      }
    });
    const groupAlert = body.hits.hits

    const groupDetail = groupAlert.map(mapGroupAlert => mapGroupAlert._source.alertdata.group_detail );

    const totalGroupAlert = [];
    for ( queryGroupDetail of groupDetail) {
        for (getGroupDetail of queryGroupDetail) {
            totalGroupAlert.push({ 
                "hostname": getGroupDetail.hostname,
                "output": getGroupDetail.output,
                "group_id" : getGroupDetail.group_id,
                "alert_id": getGroupDetail.alert_id,
                "infrastructure": getGroupDetail.infrastructure,
                "servicename": getGroupDetail.servicename,
                "TicketCode": getGroupDetail.assignee,
                "issue_time": getGroupDetail.eventdatetime
            })
        }
    }
    res.json({
        status: 200,
        data: totalGroupAlert
    })

}

module.exports = {
    getGroupAlert
}