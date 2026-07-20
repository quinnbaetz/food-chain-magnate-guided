import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the guided four-player game", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Food Chain Magnate · Guided Tabletop<\/title>/i);
  assert.match(html, /Golden Spoon/);
  assert.match(html, /Burger Baron/);
  assert.match(html, /Pizza Palace/);
  assert.match(html, /Soda Shop/);
  assert.match(html, /Choose your hidden bank reserve card/);
  assert.match(html, /BASE MAP/);
  assert.match(html, /Soft drink/);
  assert.match(html, /Lemonade/);
  assert.match(html, /Beer/);
});

test("keeps the base-game roster, goods, and map data in source", async () => {
  const [game, page, layout] = await Promise.all([
    readFile(new URL("../app/game.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
  ]);

  for (const good of ["burger", "pizza", "soda", "lemonade", "beer"]) assert.match(game, new RegExp(`"${good}"`));
  for (const employee of ["Waitress", "Management Trainee", "Errand Boy", "Marketing Trainee", "Kitchen Trainee", "Zeppelin Pilot"]) assert.match(game, new RegExp(employee));
  assert.match(game, /TILE_TEMPLATES/);
  assert.match(game, /Array\.from\(\{ length: 20 \}/);
  assert.match(page, /ENTRY_EMPLOYEES\.map/);
  assert.match(page, /DRINKS\.map/);
  assert.match(game, /moveStartingRestaurant/);
  assert.match(game, /rotateStartingRestaurant/);
  assert.match(game, /chooseTurnPosition/);
  assert.match(game, /pendingUserPosition/);
  assert.match(game, /validCampaignPlacements/);
  assert.match(game, /campaignCells/);
  assert.match(game, /sourcesOnBuyerRoute/);
  assert.match(page, /Move restaurant/);
  assert.match(page, /Printed entrance/);
  assert.match(page, /TURN ORDER TRACK/);
  assert.match(page, /selection stays changeable/);
  assert.match(page, /Select a highlighted roadside/);
  assert.match(page, /Undo last action/);
  assert.match(page, /collects from every printed source/);
  assert.match(page, /ROAD DISTANCE · TILE BORDERS CROSSED/);
  assert.match(page, /No route needed/);
  assert.match(game, /MILESTONE_BONUSES/);
  assert.match(page, /BONUSES ARE MANDATORY/);
  assert.match(layout, /Food Chain Magnate · Guided Tabletop/);
});
