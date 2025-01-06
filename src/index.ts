import express from "express";
import cors from "cors";
import { config, verifyConfig } from "./utils/config";
import bodyParser from "body-parser";
import { getVehicles, sendLocation } from "./utils/api";
import { transformVehicles } from "./utils/helpers";
import { VehicleUpdate } from "./types";

verifyConfig();

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.get("/vehicles", async (req, res) => {
  const vehicles = await getVehicles();
  res.json(transformVehicles(vehicles));
});

app.post("/sync", async (req, res) => {
  const vehicles: VehicleUpdate[] = req.body;

  await sendLocation(
    vehicles.map((v) => ({
      latitude: v.latitude,
      longitude: v.longitude,
      id: v.id,
      positionReceivedAt: new Date().toISOString(),
      positionOriginRefId: "b13c099c-ab20-11ea-8f69-0673f8c18e22",
    }))
  );

  res.json({ status: "synced" });
});

app.listen(config.port, () => {
  console.log(`Adapter listening on port ${config.port}`);
});
