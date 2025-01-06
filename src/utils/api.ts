import { gql } from "graphql-request";
import { GraphQLClient } from "graphql-request";
import { config } from "./config";
import { ApiVehicleModel } from "../types";

const client = new GraphQLClient(config.apiUrl, {
  headers: {
    Authorization: `Bearer ${config.token}`,
  },
});

const SEND_LOCATION_MUTATION = gql`
  mutation SendLocation($input: UpsertVehiclesInput!) {
    upsertVehicles(input: $input) {
      vehicles {
        callsign
        latitude
        longitude
      }
      clientMutationId
    }
  }
`;

interface Update {
  latitude: number;
  longitude: number;
  id: string;
}

export async function sendLocation(updates: Update[]): Promise<void> {
  try {
    const variables = { input: { vehicle: updates } };
    await client.request(SEND_LOCATION_MUTATION, variables);
  } catch (error) {
    console.error("Error sending location:", error);
  }
}

const GET_VEHICLES_QUERY = gql`
  query {
    vehicles {
      nodes {
        id
        callsign
        isOnline
        _currentShift {
          id
        }
        _trackingType
        vehicleTypeRef {
          value
        }
        latitude
        longitude
      }
    }
  }
`;

export async function getVehicles(): Promise<ApiVehicleModel[]> {
  try {
    const response = await client.request<{
      vehicles: { nodes: ApiVehicleModel[] };
    }>(GET_VEHICLES_QUERY);
    return response.vehicles.nodes;
  } catch (error) {
    console.error("Error getting vehicles:", error);
    return [];
  }
}
