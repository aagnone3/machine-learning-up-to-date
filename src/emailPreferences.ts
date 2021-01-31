var AWS = require('aws-sdk');
var pinpoint = new AWS.Pinpoint({region: process.env.AWS_REGION}); 
var projectId = process.env.PINPOINT_PROJECT_ID;

export function unsubAll(event) {
  
  var params = {
    ApplicationId: projectId,
    EndpointId: event.endpointId,
    EndpointRequest: {
      ChannelType: 'EMAIL',
      OptOut: 'ALL',
      Attributes: {
        SpecialOffersOptStatus: [
          "OptOut"
        ],
        NewProductsOptStatus: [
          "OptOut"
        ],
        ComingSoonOptStatus: [
          "OptOut"
        ], 
        DealOfTheDayOptStatus: [
          "OptOut"
        ], 
        OptStatusLastChanged: [
          event.optTimestamp
        ], 
        OptSource: [
          event.source
        ]
      }
    }
  };
  pinpoint.updateEndpoint(params, function(err,data) {
    if (err) {
      console.log(err, err.stack);
    }
    else {
      console.log(data);
    }
  });
  
  
}

export function updateOpt(event) {
  var endpointId = event.endpointId,
      firstName = event.firstName,
      lastName = event.lastName,
      source = event.source,
      specialOffersOptStatus = event.topic1,
      newProductsOptStatus = event.topic2,
      comingSoonOptStatus = event.topic3,
      dealOfTheDayOptStatus = event.topic4,
      optTimestamp = event.optTimestamp;
  
  var params = {
    ApplicationId: projectId,
    EndpointId: endpointId,
    EndpointRequest: {
      ChannelType: 'EMAIL',
      OptOut: 'NONE',
      Attributes: {
        SpecialOffersOptStatus: [
          specialOffersOptStatus
        ],
        NewProductsOptStatus: [
          newProductsOptStatus
        ],
        ComingSoonOptStatus: [
          comingSoonOptStatus
        ], 
        DealOfTheDayOptStatus: [
          dealOfTheDayOptStatus
        ], 
        OptStatusLastChanged: [
          optTimestamp
        ], 
        OptSource: [
          source
        ]
      },
      User: {
        UserAttributes: {
          FirstName: [
            firstName
          ],
          LastName: [
            lastName
          ]
        }
      }
    }
  };
  pinpoint.updateEndpoint(params, function(err,data) {
    if (err) {
      console.log(err, err.stack);
    }
    else {
      console.log(data);
    }
  });
}